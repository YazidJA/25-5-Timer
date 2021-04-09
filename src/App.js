import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

class App extends React.Component {
  state = {
    breakLength: 5,
    sessionLength: 25,
    label: "SESSION",
    timeLeft: "25:00",
    running: false,
    startStop: "Start",
    minutes: 25,
    seconds: 0,
  };

  breakHandler(e) {
    let breakLength = this.state.breakLength;
    let value = e.target.innerHTML;
    if (value === "+" && breakLength < 60) {
      breakLength++;
    }
    if (value === "-" && breakLength > 0) {
      breakLength--;
    }
    this.setState({ breakLength });
  }

  sessionHandler(e) {
    let sessionLength = this.state.sessionLength;
    let value = e.target.innerHTML;
    if (value === "+" && sessionLength < 60) {
      sessionLength++;
    }
    if (value === "-" && sessionLength > 0) {
      sessionLength--;
    }
    this.setState({ sessionLength });
  }

  startHandler = () => {
    let label = "RUNNING";
    let running = true;
    let startStop = "STOP";
    this.setState({ label, running, startStop });
    // stopwatch = setInterval(timerHandler, 10);
  };

  stopHandler = () => {
    // clearInterval(stopwatch);
    let label = "STOPPED";
    let running = false;
    let startStop = "START";
    this.setState({ label, running, startStop });
  };

  startStop = () => {
    if (!this.state.running) {
      this.startHandler();
    } else {
      this.stopHandler();
    }
  };

  reset = () => {
    let label = "SESSION";
    let running = false;
    let startStop = "START";
    let breakLength = 5;
    let sessionLength = 25;
    this.setState({ label, running, startStop, breakLength, sessionLength });
    // clearInterval(stopwatch);
    // setText();
  };

  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td id="break-label" colSpan="3">
              Break Length
            </td>
          </tr>
          <tr>
            <td id="break-decrement" onClick={this.breakHandler.bind(this)}>
              +
            </td>
            <td id="break-length">{this.state.breakLength}</td>
            <td id="break-increment" onClick={this.breakHandler.bind(this)}>
              -
            </td>
          </tr>
          <tr>
            <td id="session-label" colSpan="3">
              Session Length
            </td>
          </tr>
          <tr>
            <td id="session-decrement" onClick={this.sessionHandler.bind(this)}>
              +
            </td>
            <td id="session-length">{this.state.sessionLength}</td>
            <td id="session-increment" onClick={this.sessionHandler.bind(this)}>
              -
            </td>
          </tr>
          <tr>
            <td id="timer-label" colSpan="3">
              {this.state.label}
            </td>
          </tr>
          <tr>
            <td id="time-left" colSpan="3">
              {this.state.timeLeft}
            </td>
          </tr>
          <tr>
            <td id="reset" onClick={this.reset}>
              Reset
            </td>
            <td id="start_stop" colSpan="2" onClick={this.startStop}>
              {this.state.startStop}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default App;
