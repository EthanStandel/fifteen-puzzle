import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { BorderRadius } from '../SharedConstants';

export interface Props {
  id: number;
  edgeLength: number;
  translateX: number;
  translateY: number;
  draggableX?: boolean;
  draggableY?: boolean;
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
  draggableX = true,
  draggableY = true
}) => {
  const [ translateXMod, setTranslateXMod ] = useState(0);
  const [ translateYMod, setTranslateYMod ] = useState(0);

  const pieceStyle: CSSProperties = {
    position: "absolute",
    border: `solid ${borderWidth}px silver`,
    transform: `translate(${translateX + translateXMod * edgeLength}px, ${translateY + translateYMod * edgeLength}px)`,
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
      const onMouseDown = (mouseDownEvent: MouseEvent) => {
        const onMouseMove = (mouseMoveEvent: MouseEvent) => {

          const offsetX = mouseMoveEvent.clientX - mouseDownEvent.clientX;
          const offsetY = mouseMoveEvent.clientY - mouseDownEvent.clientY;
          if (draggableX && Math.abs(offsetX) <= edgeLength) {
            pieceEl.style.left = `${offsetX}px`;
          }

          if (draggableY && Math.abs(offsetY) <= edgeLength) {
            pieceEl.style.top = `${offsetY}px` 
          }
        }
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", mouseUpEvent => {
          document.removeEventListener("mousemove", onMouseMove);
          const offsetX = mouseUpEvent.clientX - mouseDownEvent.clientX;
          const offsetY = mouseUpEvent.clientY - mouseDownEvent.clientY;
          if (draggableX) {
            const stepsTaken = Math.round(offsetX / edgeLength);
            const newXMod = stepsTaken === 0 ? 0 : stepsTaken <= -1 ? -1 : 1;
            setTranslateXMod(newXMod + translateXMod);
          }

          if (draggableY) {
            const stepsTaken = Math.round(offsetY / edgeLength);
            const newYMod = stepsTaken >= 1 ? 1 : stepsTaken <= -1 ? -1 : 0;
            setTranslateYMod(newYMod + translateYMod);
          }
          // Cleanup
          pieceEl.style.transition = "transform .2s, left .2s, top .2s";

          setTimeout(() => pieceEl.style.transition = "transform .2s", 500);
          pieceEl.style.top = "0";
          pieceEl.style.left = "0";
        }, { once: true });
      }
      
      pieceEl.onmousedown = onMouseDown;
    }
  });

  return <div ref={piece} style={pieceStyle}>
    <strong style={textStyle}>
      {id}
    </strong>
  </div>;
}
