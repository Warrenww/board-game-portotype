import React, { useRef, useEffect, useState } from 'react';
import { StyledBoard,StyledTile } from './styles';
import { BOARD_SIZE, BOARD_BOARDER } from '../const/boardConfig';

const Board = () => {
  const canvasRef = useRef();
  const boardRef = useRef();
  const [boardWidth, setBoardWidth] = useState(0);
  const tiles = [];

  for (let i = 0; i < BOARD_SIZE; i ++) {
    for (let j = 0; j < BOARD_SIZE; j ++) {
      const x = i * boardWidth / BOARD_SIZE;
      const y = j * boardWidth / BOARD_SIZE;

      tiles.push(<StyledTile x={x} y={y} size={boardWidth / BOARD_SIZE} key={`${i}-${j}`}/>);
    }
  }

  useEffect(() => {
    if (boardRef) {
      const boardWidth = boardRef.current.getBoundingClientRect().width - 2 * BOARD_BOARDER;
      setBoardWidth(boardWidth);
    }
  }, [boardRef]);


  useEffect(() => {
    if(canvasRef) {
      const canvas = canvasRef.current;
      canvas.width = boardWidth;
      canvas.height = boardWidth;
      const ctx = canvas.getContext("2d");
      ctx.strokeStyle = "#fff";
      ctx.beginPath();
      for(let i = 0; i < 6; i ++) {
        ctx.moveTo(0, i * boardWidth / BOARD_SIZE);
        ctx.lineTo(boardWidth, i * boardWidth / BOARD_SIZE);
        ctx.moveTo(i * boardWidth / BOARD_SIZE, 0);
        ctx.lineTo(i * boardWidth / BOARD_SIZE, boardWidth);
      }
      ctx.stroke();
    };
  }, [boardWidth]);

  return (
    <StyledBoard ref={boardRef}>
      <canvas ref={canvasRef}/>
      {tiles}
    </StyledBoard>
  )
}

export default Board;
