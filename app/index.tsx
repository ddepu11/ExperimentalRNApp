import { FC, useRef, useState } from "react";
import { Button, useWindowDimensions, View } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";

const videoSource =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const App: FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  const ref = useRef(null);

  const { width } = useWindowDimensions();
  const params = useLocalSearchParams();

  console.log("PARAMS", params);

  const player = useVideoPlayer(
    params?.uri ? (params.uri as string) : videoSource,
    (player) => {}
  );

  return (
    <View>
      <VideoView
        ref={ref}
        style={{ width: width, height: 275 }}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />

      <Button
        title={isPlaying ? "Pause" : "Play"}
        onPress={() => {
          if (isPlaying) {
            player.pause();
          } else {
            player.play();
          }
          setIsPlaying(!isPlaying);
        }}
      />

      <Link style={{ marginTop: 20 }} href="/videos">
        Go to videso
      </Link>
    </View>
  );
};

export default App;
