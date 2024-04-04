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
  const [isPlaying, setIsPlaying] = useState(false);

  let lastTap: number = 0;

  const handleTap = () => {
    const now = Date.now();
    if (lastTap && (now - lastTap) < 300) {
      setLikes(likes + 1);
    } else {
      lastTap = now;
      setTimeout(() => {
        if (now === lastTap) {
          if (isPlaying) {
            videoRef.current?.pauseAsync();
          } else {
            videoRef.current?.playAsync();
          }
          setIsPlaying(!isPlaying);
        }
      }, 300);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleTap}>
      <View style={styles.container}>
        <Video
          ref={videoRef}
          style={{ width, height }}
          source={{ uri: videoURI }}
          useNativeControls={false}
          resizeMode={ResizeMode.COVER}
          isLooping
          shouldPlay={isPlaying}
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        />
        <View style={styles.likesContainer}>
          <Text style={styles.likesText}>❤️ {likes}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  likesContainer: {
    position: 'absolute',
    bottom: 60,
    right: 20,
  },
  likesText: {
    color: 'white',
    fontSize: 24,
  },
});

export default VideoPlayer;