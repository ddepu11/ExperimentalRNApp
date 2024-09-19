import { Button, Image, Text, useWindowDimensions, View } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { FC, useRef, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";

const App: FC = () => {
  const video = useRef<Video>(null);
  const [status, setStatus] = useState({});
  const [image, setImage] = useState<string | null>(null);

  const { width } = useWindowDimensions();
  const params = useLocalSearchParams();

  return (
    <View>
      <Video
        ref={video}
        style={{ width: width, height: width / 1.43 }}
        source={{
          uri: params.uri
            ? params.uri
            : "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />

      <Button
        title={status.isPlaying ? "Pause" : "Play"}
        onPress={() => {
          status.isPlaying
            ? video.current?.pauseAsync()
            : video.current?.playAsync();
        }}
      />

      <Link style={{ marginTop: 20 }} href="/videos">
        Go to videso
      </Link>
    </View>
  );
};

export default App;
