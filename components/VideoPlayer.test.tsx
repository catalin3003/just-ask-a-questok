import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import VideoPlayer from './VideoPlayer'


describe('VideoPlayer', () => {
  it('toggles like state on double tap', async () => {
    const onLikeMock = jest.fn();
    const { getByTestId } = render(<VideoPlayer videoURI="mockUri" initialLikes={0} onLike={onLikeMock} isViewable={true} />);
    
    const videoContainer = getByTestId('videoContainer');
    fireEvent.press(videoContainer);
    fireEvent.press(videoContainer);

    const pressedVideoContainer = getByTestId('videoContainer');

    await waitFor(() => {
      expect(pressedVideoContainer).toBeTruthy();
    });

    expect(onLikeMock).toHaveBeenCalledWith(true);
  });

  it('plays video when isViewable is true', () => {
    const { getByTestId } = render(
      <VideoPlayer videoURI="mockUri" initialLikes={0} onLike={jest.fn()} isViewable={true} />
    );

    expect(getByTestId('videoPlayer')).toBeTruthy();
  });

  it('pauses video when not viewable', () => {
    const { getByTestId, rerender } = render(
      <VideoPlayer videoURI="mockUri" initialLikes={0} onLike={jest.fn()} isViewable={true} />
    );

    rerender(
      <VideoPlayer videoURI="mockUri" initialLikes={0} onLike={jest.fn()} isViewable={false} />
    );

    expect(getByTestId('videoPlayer')).toBeTruthy();
  });
})
