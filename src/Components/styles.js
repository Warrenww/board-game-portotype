import styled from 'styled-components';

export const AppContainer = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

export const StyledBoard = styled.div`
  border: 1px solid white;
  width: 70vmin;
  height: 70vmin;

  & canvas {
    width: 100%;
    height: 100%;
  }
`;
