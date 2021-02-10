import React, { useRef, useEffect, useState, memo, useCallback } from 'react';
import { StyledBoard,StyledTile } from './styles';
import { BOARD_SIZE, BOARD_BOARDER } from '../const/boardConfig';
import EventName from '../const/socketEvent';

const {
  PLACE_TILE,
} = EventName;

const Tile = memo((props) => <StyledTile {...props} />)

const BoardDisplay = ({ board, selectedCard, socket }) => {
  const canvasRef = useRef();
  const boardRef = useRef();
  const [boardWidth, setBoardWidth] = useState(0);
  const [tiles, setTiles] = useState([]);
  const [focusTile, setFocusTile] = useState(null);
  const [highlight, setHighlight] = useState([]);
  const [validPlacement, setValidPlacement] = useState(true);


  const handlePlace = useCallback((tile) => {
    if (selectedCard) {
      socket.emit(PLACE_TILE, { tile, selectedCard });
    }
  }, [selectedCard, socket]);

  useEffect(() => {
    if (focusTile && selectedCard && board) {
      const result = board.pseudoPlace(focusTile, selectedCard);
      setValidPlacement(selectedCard === null ? true : result.valid);
      setHighlight(result.tiles.map(t => t.index));
    } else {
      setHighlight([focusTile]);
    }
  }, [focusTile, board, selectedCard]);

  useEffect(() => {
    if (board && socket) {
      const displayTiles = board.tiles.map( t => {
        const x = t.x * boardWidth / BOARD_SIZE;
        const y = t.y * boardWidth / BOARD_SIZE;

        return (
          <Tile
            x={x}
            y={y}
            size={boardWidth / BOARD_SIZE}
            key={`${t.index}`}
            onPointerEnter={() => setFocusTile(t.index)}
            onPointerLeave={() => setFocusTile(null)}
            onClick={() => handlePlace(t)}
            highlight={highlight.includes(t.index)}
            valid={validPlacement}
            occupied={t.occupied ? (t.occupied === socket.id ? 'me' : 'other') : 'none'}
          />
        );
      });
      setTiles(displayTiles);
    }
  }, [board, boardWidth, handlePlace, setFocusTile, highlight, socket, validPlacement]);

  useEffect(() => {
    const handleResize = () => {
      const boardWidth = boardRef.current.getBoundingClientRect().width - 2 * BOARD_BOARDER;
      setBoardWidth(boardWidth);
    };

    if (boardRef) {
      handleResize();
      window.addEventListener("resize", handleResize);
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
      { tiles }
    </StyledBoard>
  )
}

export default BoardDisplay;
