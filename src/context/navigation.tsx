import React, { createContext, useState, useEffect, ReactNode } from "react";
// NOTE: Originally I had the idea to use a simple navigation route context as you navigated to
// pokemon, but thought it looked better to navigate as a flat app. I left this here as an example
// of how you could use a context to navigate around your app.
interface NavigationContextProps {
  currentPath: string;
  navigate: (to: string) => void;
}

const NavigationContext = createContext<NavigationContextProps | null>(null);

interface NavigationProviderProps {
  children: ReactNode;
}

function NavigationProvider({ children }: NavigationProviderProps) {
  const [currentPath, setCurrentPath] = useState<string>(
    window.location.pathname
  );

  useEffect(() => {
    const handler = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handler);

    return () => {
      window.removeEventListener("popstate", handler);
    };
  }, []);

  const navigate = (to: string) => {
    window.history.pushState({}, "", to);
    setCurrentPath(to);
  };

  const contextValue: NavigationContextProps = {
    currentPath,
    navigate,
  };

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
}

export { NavigationProvider };
export default NavigationContext;
