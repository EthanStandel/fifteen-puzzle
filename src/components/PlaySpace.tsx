import React, { useState } from 'react';
import { BufferSpace } from '../shared/BufferSpace';
import { PlayPiece } from './PlayPiece';

export interface Props {
    edgeLength: number;
}

export const PlaySpace: React.FC<Props> = ({ edgeLength }) => {
  const playPieceEdgeLength = edgeLength / 4;

  const [ playPieceIds ] = useState(
    Array.from({ length: 15 })
      .map((_val, index) => index + 1)
      .sort(() => Math.random() > .5 ? -1 : 1) // randomize pieces
  );

  return (
    <div style={{
        height: "100%",
        width: "100%",
        backgroundColor: "aliceblue",
        borderRadius: BufferSpace
    }}>
      {playPieceIds.map(id =>
        <PlayPiece edgeLength={playPieceEdgeLength} id={id} key={id} />
      )}
    </div>
  );
}
