import React, { FC, useCallback, useEffect, useState } from "react";
import { View, ListRenderItem, FlatList } from "react-native";
import * as MediaLibrary from "expo-media-library";
import VideoComponent from "../../components/Video";
import { FlashList } from "@shopify/flash-list";

const BATCH_SIZE = 20;

const Videos: FC = () => {
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  const [hasNextPage, setHasNextPage] = useState<{
    hasNect: boolean;
    endCursor?: string;
  }>({
    hasNect: true,
    endCursor: undefined,
  });
  const [isLoading, setIsLoading] = useState(false);

  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const getAssets = useCallback(async () => {
    if (isLoading || !hasNextPage) return;

    setIsLoading(true);

    try {
      if (permissionResponse?.status !== "granted") {
        const { status } = await requestPermission();
        if (status !== "granted") {
          // console.log("Permission to access media library was denied");
          return;
        }
      }

      const res = await MediaLibrary.getAlbumsAsync({
        includeSmartAlbums: true,
      });

      res.forEach((item) => {
        console.log("RESULT::::", item.title);
      });

      const {
        assets: newAssets,
        hasNextPage: more,
        endCursor,
      } = await MediaLibrary.getAssetsAsync({
        mediaType: "video",
        first: BATCH_SIZE,
        after: hasNextPage.endCursor ? hasNextPage.endCursor : undefined,
      });

      setAssets((prev) => [...prev, ...newAssets]);
      setHasNextPage({ hasNect: more, endCursor });
    } catch (error) {
      console.error("Error fetching assets:", error);
    } finally {
      setIsLoading(false);
    }
  }, [assets, hasNextPage, isLoading, permissionResponse, requestPermission]);

  useEffect(() => {
    getAssets();
  }, []);

  const renderItem: ListRenderItem<MediaLibrary.Asset> = useCallback(
    ({ item, index }) => <VideoComponent index={index + 1} item={item} />,
    []
  );

  const keyExtractor = useCallback((item: MediaLibrary.Asset) => item.id, []);

  return (
    <View style={{ flex: 1 }}>
      <FlashList
        data={assets}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={300}
        onEndReached={() => {
          if (assets.length !== 0) {
            // console.log("FETCH MORE!!!");

            getAssets();
          } else {
          }
        }}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default Videos;
