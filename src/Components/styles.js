import styled from 'styled-components';
import { Row } from 'antd';
import { BOARD_BOARDER } from '../const/boardConfig';

export const AppContainer = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;

export const StyledBoard = styled.div`
  border: ${BOARD_BOARDER}px solid white;
  width: 70vmin;
  height: 70vmin;
  position: relative;
  box-sizing: content-box;

  & canvas {
    width: 100%;
    height: 100%;
  }
`;

export const GameInfoDiv = styled(Row)`
  width: 70vmin;

  & .ant-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const StyledTile = styled.div`
  position: absolute;
  top: ${(props) => props.x || 0}px;
  left: ${(props) => props.y || 0}px;
  width: ${(props) => props.size || 0}px;
  height: ${(props) => props.size || 0}px;

  &:hover {
    background: #fff5;
  }
`;
