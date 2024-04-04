import React, { useState } from 'react';
import { FlatList } from 'react-native';

import VideoPlayer from '../components/VideoPlayer';
import { videos as mockVideos } from '../services/videos';

const HomeScreen: React.FC = () => {
  const [videos, setVideos] = useState(mockVideos);

  const handleLike = (id: string) => {
    setVideos(videos =>
      videos.map(video =>
        video.id === id ? { ...video, likes: video.likes + 1 } : video
      )
    );
  };

  return (
    <FlatList
      data={videos}
      renderItem={({ item }) => (
        <VideoPlayer
          videoURI={item.uri}
          initialLikes={item.likes}
          onLike={() => handleLike(item.id)}
        />
      )}
      keyExtractor={item => item.id}
      pagingEnabled
      horizontal={false}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default HomeScreen;