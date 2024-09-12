import React, { FC, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import * as MediaLibrary from "expo-media-library";
import VideoComponent from "../../components/Video";
import { FlashList } from "@shopify/flash-list";

const Videos: FC = () => {
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>();

  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const ref = useRef<MediaLibrary.PagedInfo<MediaLibrary.Asset>>();

  async function getAlbums() {
    if (
      (permissionResponse || !permissionResponse) &&
      permissionResponse?.status !== "granted"
    ) {
      await requestPermission();
    }

    let after = ref.current?.hasNextPage ? ref.current.endCursor : undefined;

    const {
      endCursor,
      assets: newAssets,
      hasNextPage,
      totalCount,
    } = await MediaLibrary.getAssetsAsync({
      mediaType: "video",
      after,
    });

    setAssets((prev) => {
      let asset = prev;
      if (prev) {
        asset = prev.concat(newAssets);
      } else {
        asset = newAssets;
      }

      ref.current = { endCursor, hasNextPage, totalCount, assets: asset };

      return asset;
    });

    console.log("_____MORE?", { hasNextPage, endCursor, totalCount });
    if (hasNextPage) {
      getAlbums();
    }

    if (!hasNextPage && ref.current?.assets) {
      // console.log("FINAL");
    }
  }

  useEffect(() => {
    getAlbums();

    MediaLibrary.addListener((e) => {
      console.log("SASAS", e);
    });

    return () => {
      MediaLibrary.removeAllListeners();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlashList
        data={assets}
        estimatedItemSize={100}
        renderItem={({ index, item }) => (
          <VideoComponent index={index + 1} item={item} />
        )}
      />
    </View>
  );
};

export default Videos;
