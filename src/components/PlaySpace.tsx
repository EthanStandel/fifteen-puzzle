import React, { useState } from 'react';
import { BorderRadius } from '../SharedConstants';
import { PlayPiece } from './PlayPiece';

export interface Props {
    edgeLength: number;
}

export const PlaySpace: React.FC<Props> = ({ edgeLength }) => {
  const playPieceEdgeLength = edgeLength / 4;


  const [ pieces, setPieces ] = useState(
    Array.from({ length: 15 })
      .map((_val, index) => index + 1)
      .sort(() => Math.random() > .5 ? -1 : 1) // randomize pieces
      .map((id, index) => ({
        id,
        x: index % 4,
        y: Math.floor(index / 4)
      }))
  );

  const [ emptyCoordinates, setEmptyCoordinates ] = useState({ x: 3, y: 3 });

  return (
    <div style={{
        height: "100%",
        width: "100%",
        backgroundColor: "aliceblue",
        borderRadius: BorderRadius
    }}>
      {pieces.map(({ id, x, y }, index) => {
        return <PlayPiece edgeLength={playPieceEdgeLength} 
                   translateX={x * playPieceEdgeLength}
                   translateY={y * playPieceEdgeLength}
                   coordinates={{ x, y }}
                   emptyCoordinates={emptyCoordinates}
                   onCoordinatesChange={({ x: newX, y: newY }) => {
                      if (newX === emptyCoordinates.x && newY === emptyCoordinates.y) {
                        setEmptyCoordinates({ x, y });
                      }
                      pieces[index].x = newX;
                      pieces[index].y = newY;
                      setPieces([...pieces]);
                   }}
                   id={id}
                   key={id} />
      })}
    </div>
  );
}
