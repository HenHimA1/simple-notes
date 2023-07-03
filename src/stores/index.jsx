import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
const StoreProvider = ({ children }) => {
  useEffect(() => {}, []);

  return <>{children}</>;
};

export default StoreProvider;
