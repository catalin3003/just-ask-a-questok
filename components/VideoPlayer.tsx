import React, { useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Video, AVPlaybackStatus, ResizeMode } from 'expo-av';

interface VideoPlayerProps {
  videoURI: string;
  onPlaybackStatusUpdate?: (status: AVPlaybackStatus) => void;
}

const { width, height } = Dimensions.get('window');

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoURI, onPlaybackStatusUpdate }) => {
  const videoRef = useRef<Video>(null);
  const [likes, setLikes] = useState(0);
  
  let lastTap: number = Date.now();

  const handleDoubleTap = () => {
    const now = Date.now();
    if (lastTap && (now - lastTap) < 300) {
      setLikes(likes + 1);
    } else {
      lastTap = now;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleDoubleTap}>
      <View style={styles.container}>
        <Video
          ref={videoRef}
          style={{ width, height }}
          source={{ uri: videoURI }}
          useNativeControls={false}
          resizeMode={ResizeMode.COVER}
          isLooping
          shouldPlay={false}
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        />
        <Text style={styles.likesText}>
          {likes > 0 && `Likes: ${likes}`}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  likesText: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    color: 'white',
  },
});

export default VideoPlayer;
