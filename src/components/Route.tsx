import React from "react";
import { useNavigation } from "../hooks";

interface RouteProps {
  path: string;
  children: React.ReactNode;
}

function Route({ path, children }: RouteProps) {
  const navigation = useNavigation();
  if (path === navigation?.currentPath) {
    return <>{children}</>;
  }

  return null;
}

export default Route;
