import React from 'react';
import { createRoot } from 'react-dom/client';

import Pages from './pages';
import Wrapper from 'lib/store';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Wrapper>
      <Pages />
    </Wrapper>
  </React.StrictMode>
);
