/* oxlint-disable react/only-export-components -- build-time entry, never hot-reloaded */
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { renderHead, resolveRoute, staticPaths, SITE_URL } from './seo';

/** Used only at build time by scripts/prerender.mjs. */
export const render = (path: string) => {
  const route = resolveRoute(path);
  const html = renderToString(
    <StrictMode>
      <App initialPath={path} />
    </StrictMode>,
  );
  return { html, head: renderHead(route.key, route.path) };
};

export { staticPaths, SITE_URL };
