import { useRef, useEffect } from 'react';
import { StyledBoard } from './styles';

export const Board = () => {
  const canvasRef = useRef();
  const boardRef = useRef();
  const config = {
    grid: 6,
    unit: 100,
  };

  useEffect(() => {
    if(canvasRef && boardRef) {
      const boardWidth = boardRef.current.getBoundingClientRect().width;
      const canvas = canvasRef.current;
      canvas.width = boardWidth;
      canvas.height = boardWidth;
      const ctx = canvas.getContext("2d");
      ctx.strokeStyle = "#fff";
      ctx.beginPath();
      for(let i = 0; i < 6; i ++) {
        ctx.moveTo(0, i * boardWidth / config.grid);
        ctx.lineTo(boardWidth, i * boardWidth / config.grid);
        ctx.moveTo(i * boardWidth / config.grid, 0);
        ctx.lineTo(i * boardWidth / config.grid, boardWidth);
      }
      ctx.stroke();
    };
  });

  return (
    <StyledBoard ref={boardRef}>
      <canvas ref={canvasRef}/>
    </StyledBoard>
  )
}
