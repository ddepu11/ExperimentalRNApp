import React, { FC, memo } from "react";
import { Text, useWindowDimensions } from "react-native";
import { Link } from "expo-router";
import { Asset } from "expo-media-library";
import { Image } from "expo-image";

type Props = {
  item: Asset;
  index: number;
};

const VideoComponent: FC<Props> = ({ index, item }) => {
  const { width } = useWindowDimensions();

  return (
    <Link
      href={{ pathname: "/", params: { uri: item.uri } }}
      style={{
        marginBottom: 5,
        borderWidth: 1,
      }}
    >
      <Text style={{ marginRight: 5, fontSize: 20 }}>{index} </Text>
      <Text style={{ marginRight: 5, fontSize: 20 }}>{item.filename} </Text>

      <Image
        recyclingKey={item.id}
        source={{ uri: item.uri }}
        contentFit="cover"
        transition={300}
        style={{
          width,
          height: 300,
        }}
      />
    </Link>
  );
};

export default memo(VideoComponent);
