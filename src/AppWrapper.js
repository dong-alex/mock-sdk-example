import React from "react";
import { AmplitudeProvider } from "mock-amplitude-sdk";
import App from "./App";

const AppWrapper = () => {
  return (
    <AmplitudeProvider>
      <App />
    </AmplitudeProvider>
  );
};

export default AppWrapper;
