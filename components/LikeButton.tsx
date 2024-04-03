import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';

const LikeButton: React.FC = () => {
  const [likes, setLikes] = useState(0);
  let lastTap: number = 0;

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
      setLikes(likes + 1);
    } else {
      lastTap = now;
    }
  };

  return (
    <TouchableOpacity onPress={handleDoubleTap}>
      <Text>{`Likes: ${likes}`}</Text>
    </TouchableOpacity>
  );
};

export default LikeButton;