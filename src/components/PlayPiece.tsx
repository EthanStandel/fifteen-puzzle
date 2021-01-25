import React from 'react';
import { BufferSpace } from '../shared/BufferSpace';

export interface Props {
  id: number;
  edgeLength: number;
}

/**
 * Really just the simple display logic for a play piece.
 * All the movement and game state is handled by the PlaceSpace component.
 */
export const PlayPiece: React.FC<Props> = ({ id, edgeLength }) => {
  return <div style={{
    position: "absolute",
    height: edgeLength,
    width: edgeLength,
    backgroundColor: id % 2 === 0 ? "beige" : "firebrick",
    borderRadius: BufferSpace
  }}>
    <strong style={{
      display: "block",
      textAlign: "center",
      lineHeight: `${edgeLength}px`, // default is not px here
      color: "silver",
      fontSize: edgeLength / 2
    }}>
      {id}
    </strong>
  </div>;
}
