import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import { css } from '@emotion/react';
import styled from 'styled-components';

export const loadingCss = css`
  display: block;
  margin-top: 20px;
  margin-bottom: 20px;
  border-color: white;
  padding: 0;
`;
export const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Loading = () => (
  <LoadingContainer>
    <PulseLoader color="#1E2941" loading css={loadingCss} size={20} />
  </LoadingContainer>
);

export default Loading;
