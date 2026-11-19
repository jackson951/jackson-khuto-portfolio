import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App initialPath={window.location.pathname} />
  </StrictMode>
);

// Production pages are prerendered to HTML at build time, so attach to that markup.
// In `npm run dev` the root is empty and we render from scratch.
if (container.firstElementChild) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
