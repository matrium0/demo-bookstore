import React from 'react';

interface GlobalMessage {
  message: string;
  severity: "info" | "warning" | "danger" | "success";
  messageDetail?: string;
}

interface GlobalMessageContextType extends GlobalMessage {
  setMessage: (message: GlobalMessage | null) => void;
}

const GlobalMessageContext = React.createContext<GlobalMessageContextType>({
    message: "irrelevant default",
    severity: "info",
    setMessage: (a) => {
    }
  }
);

export {GlobalMessageContext};
export type {GlobalMessage};

