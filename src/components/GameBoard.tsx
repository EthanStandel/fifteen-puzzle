import React, { useState, CSSProperties } from 'react';
import { BorderRadius, BorderWidth } from '../SharedConstants';
import { PlaySpace } from './PlaySpace';

export interface Props {
  rootedElement: HTMLElement;
}

/**
 * Gameboard component is the UI element that manages the overall location of the
 * the game as a whole.  It doesn't manage any game state.
 */
export const GameBoard: React.FC<Props> = ({ rootedElement }) => {
  const appHeight = rootedElement.clientHeight;
  const appWidth = rootedElement.clientWidth;
  const largestSquareSide = Math.min(appHeight, appWidth) - BorderWidth * 2;

  const gameBoardStyles: CSSProperties = {
    // Define board dimensions, based on current window size
    position: "absolute",
    height: largestSquareSide,
    width: largestSquareSide,
    backgroundColor: "silver",
    borderRadius: BorderRadius,
    // Center the board in the window
    top: appHeight > appWidth ?
      (rootedElement.clientHeight - largestSquareSide) / 2 : BorderWidth,
    left: appHeight <= appWidth ?
      (rootedElement.clientWidth - largestSquareSide) / 2 : BorderWidth
  }

  const playSpaceEdgeLength = largestSquareSide - BorderWidth * 2;

  const playSpaceContainerStyles: CSSProperties = {
    position: "absolute",
    width: playSpaceEdgeLength,
    height: playSpaceEdgeLength,
    top: BorderWidth,
    left: BorderWidth
  }

  // Update the board size when the window resizes
  useRerenderOnWindowResize();

  return (
    <div style={gameBoardStyles}>
      <div style={playSpaceContainerStyles}>
        <PlaySpace edgeLength={playSpaceEdgeLength}  />
      </div>
    </div>
  );
}

const useRerenderOnWindowResize = () => {
  const [forceRerender, setForceRerender] = useState(true);

  const onResize = () => {
    setForceRerender(!forceRerender);
    window.removeEventListener("resize", onResize);
  }

  window.addEventListener("resize", onResize);
}
