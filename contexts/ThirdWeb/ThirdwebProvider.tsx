import { FC, ReactNode } from "react";
import { ThirdwebProvider } from "thirdweb/react";

const AppWithProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThirdwebProvider>
      {children}
    </ThirdwebProvider>
  );
}

export { AppWithProvider };
