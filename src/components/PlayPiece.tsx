import React from 'react';
import { BufferSpace } from '../shared/BufferSpace';

export interface Props {
  id: number;
  edgeLength: number;
  translateX: number;
  translateY: number;
}

/**
 * Really just the simple display logic for a play piece.
 * All the movement and game state is handled by the PlaceSpace component.
 */
export const PlayPiece: React.FC<Props> = ({
  id,
  edgeLength,
  translateX,
  translateY
}) => {
  return <div style={{
    position: "absolute",
    border: "solid 5px silver",
    transform: `translate(${translateX}px, ${translateY}px)`,
    height: edgeLength - 10,
    width: edgeLength - 10,
    backgroundColor: id % 2 === 0 ? "beige" : "firebrick",
    borderRadius: BufferSpace
  }}>
    <strong style={{
      display: "block",
      userSelect: "none",
      textAlign: "center",
      lineHeight: `${edgeLength}px`, // default is not px here
      color: "silver",
      fontSize: edgeLength / 2
    }}>
      {id}
    </strong>
  </div>;
}
