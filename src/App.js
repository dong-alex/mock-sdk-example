import React, { useState } from "react";
import { withAmplitudeContext } from "mock-amplitude-sdk";
import LoginUI from "./components/LoginUI";
import AppBar from "./components/AppBar";
import EventTable from "./components/EventTable";

const App = props => {
  const {
    sessionStarted,
    handleAPIKeyCreate,
    handleEndSession,
    generateAPIKey
  } = props.context;

  const [key, setKey] = useState("");

  const handleGenerateClick = () => {
    const newKey = generateAPIKey();

    setKey(newKey);
  };

  const handleSessionClose = () => {
    handleEndSession();
    setKey("");
  };

  const handleSessionStart = () => {
    handleAPIKeyCreate(key);
  };

  return (
    <>
      <AppBar />
      <LoginUI
        onSessionStart={handleSessionStart}
        onSessionEnd={handleSessionClose}
        onGenerateClick={handleGenerateClick}
        started={sessionStarted}
        currentKey={key}
      />
      <EventTable started={sessionStarted} />
    </>
  );
};

export default withAmplitudeContext(App);
