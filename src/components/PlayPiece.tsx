import React, { CSSProperties, useContext, useEffect, useRef } from 'react';
import { PushContext } from '../context/PushContext';
import { BorderRadius } from '../SharedConstants';

export interface Props {
  id: number;
  edgeLength: number;
  translateX: number;
  translateY: number;
  coordinates: { x: number; y: number };
  emptyCoordinates: { x: number; y: number };
  onCoordinatesChange: (newCoordinates: { x: number; y: number }, replacesEmpty: boolean) => any;
}

const borderWidth = 5;

/**
 * The dragable entity which has a global understanding of
 * the game state in respect to it's own.
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
  const { onPush, subscribers } = useContext(PushContext);

  const shareXAxis = coordinates.y === emptyCoordinates.y;
  const shareYAxis = coordinates.x === emptyCoordinates.x;
  const draggableXPos = coordinates.x < emptyCoordinates.x && shareXAxis;
  const draggableXNeg = coordinates.x > emptyCoordinates.x && shareXAxis;
  const draggableYPos = coordinates.y < emptyCoordinates.y && shareYAxis;
  const draggableYNeg = coordinates.y > emptyCoordinates.y && shareYAxis;

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
      const onMouseDown = pieceEl.onmousedown = (mouseDownEvent: MouseEvent) => {
        const theMainEvent = mouseDownEvent.currentTarget === pieceEl;
        if (theMainEvent) {
          onPush(mouseDownEvent, coordinates);
        }
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
            const change = offsetX > 0 ? 1 : -1;
            onCoordinatesChange({ x: coordinates.x + change, y: coordinates.y }, theMainEvent);
          }

          if ((draggableYPos && offsetY > 0) || (draggableYNeg && offsetY < 0)) {
            const change = offsetY > 0 ? 1 : -1;
            onCoordinatesChange({ x: coordinates.x, y: coordinates.y + change }, theMainEvent);
          }
          // Cleanup
          pieceEl.style.transition = "transform .2s, left .2s, top .2s";
          setTimeout(() => pieceEl.style.transition = "transform .2s", 500);
          pieceEl.style.top = "0";
          pieceEl.style.left = "0";
        }, { once: true });
      };

      subscribers[id] = (event: MouseEvent, { x, y }: { x: number, y: number }) => {
        if (!(coordinates.x === x && coordinates.y === y)) {
          const shareYAxisWithPusher = x === coordinates.x;
          const shareXAxisWithPusher = y === coordinates.y;
          if (
               (shareYAxisWithPusher && shareYAxis && (emptyCoordinates.y > coordinates.y && y < coordinates.y))
            || (shareYAxisWithPusher && shareYAxis && (emptyCoordinates.y < coordinates.y && y > coordinates.y))
            || (shareXAxisWithPusher && shareXAxis && (emptyCoordinates.x > coordinates.x && x < coordinates.x))
            || (shareXAxisWithPusher && shareXAxis && (emptyCoordinates.x < coordinates.x && x > coordinates.x))
          ) {
            onMouseDown(event);
          }
        }
      }
    }
  });

  return <div ref={piece} style={pieceStyle}>
    <strong style={textStyle}>
      {id}
    </strong>
  </div>;
}
