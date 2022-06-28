import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import { css } from '@emotion/react';

export const loadingCss = css`
  display: block;
  margin: 0;
  border-color: white;
  padding: 0;
`;

const Loading = () => (
  <div className="loadingContainer">
    <PulseLoader color="#fff" loading css={loadingCss} size={20} />
  </div>
);

export default Loading;
