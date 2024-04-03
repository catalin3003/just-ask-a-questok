import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import VideoPlayer from '../components/VideoPlayer';

const videos = [
  {id: '1', uri: 'https://media.publit.io/file/h_720/Production/84/VideoAnswers/AaXXPDyt/JAAQ-RM-AX-001.mp4.mp4'},
  {id: '2', uri: 'https://media.publit.io/file/h_720/Production/84/VideoAnswers/jeZ26hu9/JAAQ-RM-AX-002.mp4.mp4'},
  {id: '3', uri: 'https://media.publit.io/file/h_720/Production/84/VideoAnswers/tBmQgLTl/JAAQ-RM-AX-003.mp4.mp4'},
  {id: '4', uri: 'https://media.publit.io/file/h_720/Production/84/VideoAnswers/qg1d94dG/JAAQ-RM-AX-004.mp4.mp4'},
  {id: '5', uri: 'https://media.publit.io/file/h_720/Production/84/VideoAnswers/qg1d94dG/JAAQ-RM-AX-004.mp4.mp4'},
];

const HomeScreen: React.FC = () => {
  return (
    <FlatList
      data={videos}
      renderItem={({ item }) => <VideoPlayer videoURI={item.uri} />}
      keyExtractor={item => item.id}
      pagingEnabled
      horizontal={false}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default HomeScreen;