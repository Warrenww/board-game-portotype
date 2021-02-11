import styled from 'styled-components';
import {
  Row,
  Drawer,
  Button,
  Card,
  Col,
} from 'antd';
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
  top: ${(props) => props.y || 0}px;
  left: ${(props) => props.x || 0}px;
  width: ${(props) => props.size || 0}px;
  height: ${(props) => props.size || 0}px;

  background: ${ (props) => props.occupied === 'none' ?
    'transparent' :
    (props.occupied === 'me' ?
      '#85aa72aa' :
      '#d49c5faa'
    )
  };

  &::after {
    content: ${(props) => props.highlight ? '""' : ''};
    background: ${(props) => props.highlight ? (props.valid ? '#fff3' : '#d9686833') : 'transparent'};
    display: block;
    width: 100%;
    height: 100%;
  }
`;

export const StyledCardsDisplay = styled(Drawer)`
  & .ant-card {
    margin: 1em;
  }
`;

export const FunctionButton = styled(Button)`
  &.ant-btn {
    position: fixed;
    bottom: ${props => props.bottom ?? 0}em;
    right: 2em;
    width: 3em;
    height: 3em;
    background-color: ${props => props.backgroundColor ?? ''} !important;
  }
  & svg {
    height: 60%;
    width: 60%;
  }
`;

export const StyledCardDisplay = styled(Card)`
  box-shadow: ${(props) => props.active ? '0 0 10px 5px' : ''};

  &:hover {
    box-shadow: 0 0 10px 5px;
  }
  & canvas {
    width: 50px;
    margin: 0 auto;
    margin-top: 1em;
  }
`;

export const StyledPlayerInfo = styled(Col)`
  border: 0.1em dashed ${props => props.current ? '#fff' : 'transparent'};
  border-radius: 1em;
  margin-bottom: 1em;
`;
