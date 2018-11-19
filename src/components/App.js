import React, { Component } from "react";
import CountyInfo from "./CountyInfo";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <CountyInfo id={this.props.match.params.id} />
        </header>
      </div>
    );
  }
}

export default App;
