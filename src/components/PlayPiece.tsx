import React, { CSSProperties, useEffect, useRef } from 'react';
import { BorderRadius } from '../SharedConstants';

export interface Props {
  id: number;
  edgeLength: number;
  translateX: number;
  translateY: number;
  coordinates: { x: number; y: number };
  emptyCoordinates: { x: number; y: number };
  onCoordinatesChange: () => any;
}

const borderWidth = 5;

/**
 * Really just the simple display logic for a play piece.
 * All the movement and game state is handled by the PlaceSpace component.
 */
export const PlayPiece: React.FC<Props> = ({
  id,
  edgeLength,
  translateX,
  translateY,
  coordinates,
  emptyCoordinates,
  onCoordinatesChange
}) => {
  const shareYAxis = coordinates.y === emptyCoordinates.y;
  const shareXAxis = coordinates.x === emptyCoordinates.x;
  const draggableXPos = coordinates.x + 1 === emptyCoordinates.x && shareYAxis;
  const draggableXNeg = coordinates.x - 1 === emptyCoordinates.x && shareYAxis;
  const draggableYPos = coordinates.y + 1 === emptyCoordinates.y && shareXAxis;
  const draggableYNeg = coordinates.y - 1 === emptyCoordinates.y && shareXAxis;

  const pieceStyle: CSSProperties = {
    position: "absolute",
    border: `solid ${borderWidth}px silver`,
    transform: `translate(${translateX}px, ${translateY}px)`,
    height: edgeLength - (borderWidth * 2),
    width: edgeLength - (borderWidth * 2),
    backgroundColor: id % 2 === 0 ? "beige" : "firebrick",
    borderRadius: BorderRadius
  };

  const textStyle: CSSProperties = {
    display: "block",
    userSelect: "none",
    textAlign: "center",
    lineHeight: `${edgeLength}px`, // default is not px here
    color: "silver",
    fontSize: edgeLength / 2
  };

  const piece = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pieceEl: HTMLDivElement | null = piece.current;
    if (pieceEl !== null) {
      pieceEl.onmousedown = (mouseDownEvent: MouseEvent) => {
        const onMouseMove = (mouseMoveEvent: MouseEvent) => {

          const offsetX = mouseMoveEvent.clientX - mouseDownEvent.clientX;
          const offsetY = mouseMoveEvent.clientY - mouseDownEvent.clientY;
          if (
            ((draggableXPos && offsetX > 0) || (draggableXNeg && offsetX < 0)) 
            && Math.abs(offsetX) <= edgeLength
          ) {
            pieceEl.style.left = `${offsetX}px`;
          }

          if (
            ((draggableYPos && offsetY > 0) || (draggableYNeg && offsetY < 0))
            && Math.abs(offsetY) <= edgeLength
          ) {
            pieceEl.style.top = `${offsetY}px` 
          }
        }
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", mouseUpEvent => {
          document.removeEventListener("mousemove", onMouseMove);
          const offsetX = mouseUpEvent.clientX - mouseDownEvent.clientX;
          const offsetY = mouseUpEvent.clientY - mouseDownEvent.clientY;
          if ((draggableXPos && offsetX > 0) || (draggableXNeg && offsetX < 0))  {
            onCoordinatesChange();
          }

          if ((draggableYPos && offsetY > 0) || (draggableYNeg && offsetY < 0)) {
            onCoordinatesChange();
          }
          // Cleanup
          pieceEl.style.transition = "transform .2s, left .2s, top .2s";
          setTimeout(() => pieceEl.style.transition = "transform .2s", 500);
          pieceEl.style.top = "0";
          pieceEl.style.left = "0";
        }, { once: true });
      }
    }
  });

  return <div ref={piece} style={pieceStyle}>
    <strong style={textStyle}>
      {id}
    </strong>
  </div>;
}
