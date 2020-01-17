import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import PlayArrowOutlinedIcon from "@material-ui/icons/PlayArrowOutlined";
import StopOutlinedIcon from "@material-ui/icons/StopOutlined";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 10px 0 20px 0;
`;

const GenerateButton = styled(Button)`
  height: 100%;
`;

const SessionButton = styled(Button)`
  height: 100%;
`;

const LoginUI = props => {
  const {
    currentKey,
    onSessionStart,
    onSessionEnd,
    started,
    onGenerateClick
  } = props;

  return (
    <LoginContainer>
      <TextField
        label="API Key"
        InputProps={{
          readOnly: true
        }}
        variant="outlined"
        value={currentKey}
      />
      <GenerateButton
        onClick={onGenerateClick}
        variant="outlined"
        color="secondary"
        startIcon={<LockOpenOutlinedIcon />}
      >
        Generate an API key for Amplitude SDK
      </GenerateButton>
      {started && currentKey ? (
        <SessionButton
          onClick={onSessionEnd}
          variant="contained"
          color="secondary"
          startIcon={<StopOutlinedIcon />}
        >
          Click here to end the session
        </SessionButton>
      ) : null}
      {!started && currentKey ? (
        <SessionButton
          onClick={onSessionStart}
          variant="outlined"
          color="primary"
          startIcon={<PlayArrowOutlinedIcon />}
        >
          Click here to start the session
        </SessionButton>
      ) : null}
    </LoginContainer>
  );
};

export default LoginUI;
