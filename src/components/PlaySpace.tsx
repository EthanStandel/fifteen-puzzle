import React, { useState } from 'react';
import { BorderRadius } from '../SharedConstants';
import { PlayPiece } from './PlayPiece';

export interface Props {
    edgeLength: number;
}

export const PlaySpace: React.FC<Props> = ({ edgeLength }) => {
  const playPieceEdgeLength = edgeLength / 4;


  const [ gameState ] = useState(
    Array.from({ length: 15 })
      .map((_val, index) => index + 1)
      .sort(() => Math.random() > .5 ? -1 : 1) // randomize pieces
  );

  return (
    <div style={{
        height: "100%",
        width: "100%",
        backgroundColor: "aliceblue",
        borderRadius: BorderRadius
    }}>
      {gameState.map((id, index) => {
        return <PlayPiece edgeLength={playPieceEdgeLength} 
                   translateX={(index % 4) * playPieceEdgeLength}
                   translateY={Math.floor(index / 4) * playPieceEdgeLength}
                   id={id} 
                   key={id} />
      })}
    </div>
  );
}
