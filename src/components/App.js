import React, { Component } from "react";
import CountyInfo from "./CountyInfo";
import CreateReview from "./CreateReview";
import ReviewList from "./ReviewList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <CountyInfo id={this.props.match.params.id} />
          <hr />
          <CreateReview id={this.props.match.params.id} />
          <hr />
          <ReviewList id={this.props.match.params.id} />
        </header>
      </div>
    );
  }
}

export default App;
