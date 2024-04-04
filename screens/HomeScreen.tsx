import React, { useEffect, useRef, useState } from 'react';
import { FlatList, type ViewToken, type ViewabilityConfig } from 'react-native';

import VideoPlayer from '../components/VideoPlayer';

type Video = {
  id: string;
  uri: string;
  likes: number;
};

/**
 * HomeScreen displays a list of videos fetched from a backend service.
 * Users can swipe through videos and like them by double-tapping.
 */
const HomeScreen: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [viewableItems, setViewableItems] = useState<string[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/videos')
      .then(response => response.json())
      .then((data: Video[]) => setVideos(data))
      .catch(error => console.error("Failed to fetch videos:", error));
  }, []);

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 50
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    setViewableItems(viewableItems.map(item => item.item.id));
  });

  const handleLike = (id: string) => {
    fetch(`http://localhost:3000/videos/${id}/like`, { method: 'POST' })
      .then(() => {
        setVideos((prevVideos: Video[]) =>
          prevVideos.map((video: Video) =>
            video.id === id ? { ...video, likes: video.likes + 1 } : video
          )
        );
      })
      .catch(console.error);
  };

  return (
    <FlatList
      data={videos}
      renderItem={({ item }) => (
        <VideoPlayer
          videoURI={item.uri}
          initialLikes={item.likes}
          onLike={() => handleLike(item.id)}
          isViewable={viewableItems.includes(item.id)}
        />
      )}
      keyExtractor={item => item.id}
      pagingEnabled
      horizontal={false}
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig}
    />
  );
};

export default HomeScreen;