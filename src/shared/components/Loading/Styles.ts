import styled from 'styled-components';

export const StyledPlaceholderLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  z-index: 100;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
`;
