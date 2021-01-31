import React, { useRef, useEffect, useState } from 'react';
import { StyledBoard,StyledTile } from './styles';
import { BOARD_SIZE, BOARD_BOARDER } from '../const/boardConfig';

const BoardDisplay = ({ board, selectedCard }) => {
  const canvasRef = useRef();
  const boardRef = useRef();
  const [boardWidth, setBoardWidth] = useState(0);
  const [tiles, setTiles] = useState([]);
  const [focusTile, setFocusTile] = useState(null);
  const [highlight, setHighlight] = useState([]);
  const [validPlacement, setValidPlacement] = useState(true);

  useEffect(() => {
    console.log(board);
    console.log(selectedCard);
  }, [board, selectedCard]);

  useEffect(() => {
    if (focusTile && selectedCard && board) {
      const result = board.pseudoPlace(focusTile, selectedCard);
      setValidPlacement(result.valid);
      setHighlight(result.tiles.map(t => t.index));
    } else {
      setHighlight([focusTile]);
    }
  }, [focusTile, board, selectedCard]);

  useEffect(() => {
    if (board) {
      setTiles(board.tiles);
    }
  }, [board]);

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
      {
        tiles.map( t => {
          const x = t.x * boardWidth / BOARD_SIZE;
          const y = t.y * boardWidth / BOARD_SIZE;

          return (
            <StyledTile
              x={x}
              y={y}
              size={boardWidth / BOARD_SIZE}
              key={`${t.index}`}
              onPointerEnter={() => setFocusTile(t.index)}
              onPointerLeave={() => setFocusTile(null)}
              highlight={highlight.includes(t.index)}
              valid={validPlacement}
            />
          );
        })
      }
    </StyledBoard>
  )
}

export default BoardDisplay;
