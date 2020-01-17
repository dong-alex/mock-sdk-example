import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withAmplitudeContext } from "mock-amplitude-sdk";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    maxWidth: 1000
  },
  card: {
    width: 500,
    height: 300
  }
});

const EventTable = props => {
  const { events, handleLogEvent, flushEvents } = props.context;
  const { started } = props;

  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [username, setUsername] = useState("");
  const [property, setProperty] = useState("");

  useEffect(() => {
    const eventRows = [];

    if (events) {
      events.forEach(event => {
        eventRows.push(generateData(event));
      });
    }

    setRows(eventRows);
  }, [events]);

  const handleNameChange = event => {
    setUsername(event.target.value);
  };

  const handlePropertyChange = event => {
    setProperty(event.target.value);
  }

  const handleEventClick = () => {
    handleLogEvent(username || "testUser", property);
  };

  const handleFlushClick = () => {
    flushEvents();
  };

  const generateData = event => {
    const properties = event.getEventProperties();

    return {
      eventID: event.getEventID(),
      eventName: event.getEventName(),
      hasProperties: properties ? 'True' : 'False'
    };
  };

  return started ? (
    <>
      <TextField
        label="Total Events"
        InputProps={{
          readOnly: true
        }}
        variant="outlined"
        value={events.length}
      />
      <TextField
        label="Username"
        value={username}
        onChange={handleNameChange}
        variant="outlined"
      />
      <TextField
        label="Property Detail"
        value={property}
        onChange={handlePropertyChange}
        variant="outlined"
      />
      <Button onClick={handleEventClick} variant="outlined" color="primary">
        Click here to log an event with your user information
      </Button>
      <Button onClick={handleFlushClick} variant="contained" color="secondary">
        Click here to flush the events
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Event ID</TableCell>
              <TableCell align="right">Event Name</TableCell>
              <TableCell align="right">Has Properties</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.eventID}>
                <TableCell component="th" scope="row">
                  {row.eventID}
                </TableCell>
                <TableCell align="right">{row.eventName}</TableCell>
                <TableCell align="right">{row.hasProperties}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  ) : (
    <Paper elevation={10} className={classes.card}>
      Obtain an API key and start the test session
    </Paper>
  );
};

export default withAmplitudeContext(EventTable);
