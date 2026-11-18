import { createContext, useContext } from 'react';

export const NavigateContext = createContext<(path: string) => void>((path) => {
  window.location.href = path;
});

export const useNavigate = () => useContext(NavigateContext);
