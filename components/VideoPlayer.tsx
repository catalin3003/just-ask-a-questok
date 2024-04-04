import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

interface VideoPlayerProps {
  videoURI: string;
  initialLikes: number;
  onLike: (liked: boolean) => void;
  isViewable: boolean;
}

const { width, height } = Dimensions.get('window');

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoURI, initialLikes, onLike, isViewable }) => {
  const videoRef = useRef<Video>(null);
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const tapCountRef = useRef(0);
  const tapTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isViewable) {
      videoRef.current?.playAsync();
      setIsPlaying(true);
    } else {
      videoRef.current?.pauseAsync();
      setIsPlaying(false);
    }
  }, [isViewable]);

  const handleTap = () => {
    tapCountRef.current += 1;

    if (tapCountRef.current === 1) {
      // Single tap - wait to see if it's followed by another tap
      tapTimerRef.current = setTimeout(() => {
        if (tapCountRef.current === 1) {
          // It's a single tap, toggle play/pause
          if (isPlaying) {
            videoRef.current?.pauseAsync();
          } else {
            videoRef.current?.playAsync();
          }
          setIsPlaying(!isPlaying);
        }
        tapCountRef.current = 0; // Reset tap count
      }, 300); // 300ms window to wait for a second tap
    } else if (tapCountRef.current === 2) {
      // Double tap - like/unlike the video
      clearTimeout(tapTimerRef.current!); // Clear the single tap timer
      tapCountRef.current = 0; // Reset tap count

      if (liked) {
        setLikes((prev) => prev - 1);
        setLiked(false);
        onLike(false);
      } else {
        setLikes((prev) => prev + 1);
        setLiked(true);
        onLike(true);
      }
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
          shouldPlay={isPlaying}
        />
        <View style={styles.likesContainer}>
        <Text style={[styles.likesText, liked ? styles.liked : styles.notLiked]}>
            ❤️ {likes}
          </Text>
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
    fontSize: 24,
  },
  liked: {
    color: 'red',
  },
  notLiked: {
    color: 'white',
  },
});

export default VideoPlayer;