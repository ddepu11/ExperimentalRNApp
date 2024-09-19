import React, { FC, memo, useEffect } from "react";
import { useWindowDimensions } from "react-native";
import { Link } from "expo-router";
import { Asset } from "expo-media-library";
import { Image } from "expo-image";

type Props = {
  item: Asset;
  index: number;
};

const VideoComponent: FC<Props> = ({ index, item }) => {
  const { width } = useWindowDimensions();

  useEffect(() => {
    return () => {
      Image.clearDiskCache();
      Image.clearMemoryCache();
    };
  }, []);

  return (
    <Link
      href={{ pathname: "/", params: { uri: item.uri } }}
      style={{
        marginBottom: 5,
        borderWidth: 1,
      }}
    >
      {/* <Text style={{ marginRight: 5, fontSize: 20 }}>{index} </Text> */}

      <Image
        // source={{ uri: item.uri }}
        source={item.uri}
        contentFit="cover"
        blurRadius={1}
        style={{
          flex: 1,
          width,
          height: 300,
          // backgroundColor: "#0553",
        }}
      />
    </Link>
  );
};

export default memo(VideoComponent);
