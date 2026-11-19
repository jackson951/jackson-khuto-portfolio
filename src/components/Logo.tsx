import { site } from '../data/site';

/** "first.last" wordmark built from `site.name`, e.g. jackson.khuto */
export const Logo = () => {
  const [first, ...rest] = site.name.toLowerCase().split(/\s+/);
  return (
    <>
      {first}
      {rest.length > 0 && (
        <>
          <span className="text-copper">.</span>
          {rest.join('')}
        </>
      )}
    </>
  );
};
