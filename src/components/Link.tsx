import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { useNavigate } from './navigation';

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };

/**
 * A real anchor (so middle-click, "open in new tab", and crawlers work)
 * that performs client-side navigation on a plain left click.
 */
export const Link = ({ to, onClick, children, ...rest }: LinkProps) => {
  const navigate = useNavigate();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};
