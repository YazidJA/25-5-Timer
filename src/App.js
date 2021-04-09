import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

class App extends React.Component {
  state = {
    breakLength: 5,
    sessionLength: 25,
    label: "SESSION",
    running: false,
    startStop: "Start",
    duration: [25, 0], // mins, secs
    formatted: "25:00",
    timeout: 0,
    onBreak: false,
  };

  breakHandler(e) {
    let breakLength = this.state.breakLength;
    let value = e.target.innerHTML;
    if (value === "+" && breakLength < 60) {
      breakLength++;
    }
    if (value === "-" && breakLength > 1) {
      breakLength--;
    }
    this.setState({ breakLength });
  }

  sessionHandler(e) {
    let sessionLength = this.state.sessionLength;
    let value = e.target.innerHTML;
    let duration = this.state.duration;
    if (value === "+" && sessionLength < 60) {
      sessionLength++;
    }
    if (value === "-" && sessionLength > 1) {
      sessionLength--;
    }
    duration[0] = sessionLength;
    this.setState({ sessionLength, duration });
    this.setPadding();
  }

  durationHandler = () => {
    let duration = [...this.state.duration];
    let label = this.state.label;
    let breakLength = this.state.breakLength;
    let sessionLength = this.state.sessionLength;
    let onBreak = this.state.onBreak;
    if (duration[0] + duration[1] === 0) {
      if (!onBreak) {
        onBreak = true;
        label = "ON BREAK";
        duration[0] = breakLength;
      } else {
        onBreak = false;
        label = "ON SESSION";
        duration[0] = sessionLength;
      }
      document.getElementById("beep").play();
    } else {
      if (duration[1] === 0) {
        duration[1] = 59;
        duration[0] -= 1;
      } else {
        duration[1] -= 1;
      }
    }
    this.setState({ duration, label, onBreak });
    this.setPadding();
  };

  setPadding = () => {
    let duration = [...this.state.duration];
    let minutes,
      seconds = 0;
    // minutes padding
    if (duration[0] < 10) {
      minutes = "0" + duration[0];
    } else {
      minutes = duration[0];
    }
    // seconds padding
    if (duration[1] < 10) {
      seconds = "0" + duration[1];
    } else {
      seconds = duration[1];
    }
    let formatted = `${minutes}:${seconds}`;
    this.setState({ formatted });
  };

  startHandler = () => {
    let running = true;
    let startStop = "STOP";
    let onBreak = this.state.onBreak;
    let label = this.state.label;
    if (!onBreak) {
      label = "ON SESSION";
    } else {
      label = "ON BREAK";
    }
    let timeout = setInterval(this.durationHandler.bind(this), 1000);
    this.setState({ label, running, startStop, timeout });
  };

  stopHandler = () => {
    clearInterval(this.state.timeout);
    let label = "PAUSED";
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
    let duration = [25, 0];
    let formatted = "25:00";
    this.setState({
      label,
      running,
      startStop,
      breakLength,
      sessionLength,
      duration,
      formatted,
    });
    clearInterval(this.state.timeout);
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
  };

  render() {
    return (
      <div>
        <audio
          id="beep"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
        <table>
          <tbody>
            <tr>
              <td id="break-label" colSpan="3">
                Break Length
              </td>
            </tr>
            <tr>
              <td
                id="break-increment"
                onClick={this.breakHandler.bind(this)}
                className="interactive">
                +
              </td>
              <td id="break-length">{this.state.breakLength}</td>
              <td
                id="break-decrement"
                onClick={this.breakHandler.bind(this)}
                className="interactive">
                -
              </td>
            </tr>
            <tr>
              <td id="session-label" colSpan="3">
                Session Length
              </td>
            </tr>
            <tr>
              <td
                id="session-increment"
                onClick={this.sessionHandler.bind(this)}
                className="interactive">
                +
              </td>
              <td id="session-length">{this.state.sessionLength}</td>
              <td
                id="session-decrement"
                onClick={this.sessionHandler.bind(this)}
                className="interactive">
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
                {this.state.formatted}
              </td>
            </tr>
            <tr>
              <td id="reset" onClick={this.reset} className="interactive">
                Reset
              </td>
              <td
                id="start_stop"
                colSpan="2"
                onClick={this.startStop}
                className="interactive">
                {this.state.startStop}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
