import React, { useCallback, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Video, AVPlaybackStatus, ResizeMode } from 'expo-av';

interface VideoPlayerProps {
  videoURI: string;
  initialLikes: number;
  onLike: () => void;
}

const { width, height } = Dimensions.get('window');

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoURI, initialLikes, onLike }) => {
  const videoRef = useRef<Video>(null);
  const [likes, setLikes] = useState(initialLikes);
  const [isPlaying, setIsPlaying] = useState(false);

  const now = Date.now();

  let lastTap: number = 0;

  const handleTap = useCallback(() => {
    if (lastTap && (now - lastTap) < 300) {
      // Double tap - like the video
      setLikes(prev => prev + 1);
      onLike();
    } else {
      // Single tap - toggle play/pause
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
  }, [isPlaying, onLike]);

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