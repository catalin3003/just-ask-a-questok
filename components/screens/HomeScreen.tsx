import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import VideoPlayer from '../VideoPlayer';

type Video = {
  id: string;
  uri: string;
  likes: number;
};

const HomeScreen: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/videos')
      .then(response => response.json())
      .then((data: Video[]) => setVideos(data))
      .catch(console.error);
  }, []);

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