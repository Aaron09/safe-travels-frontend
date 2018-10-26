import React, { Component } from "react";
import axios from "axios";

const backend_url = "http://127.0.0.1:8000/";

class CreateReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      rating: ""
    };
  }

  onPost = e => {
    e.preventDefault();
    const { description, rating } = this.state;
    if (isNaN(rating)) {
      this.setState({
        description: "",
        rating: ""
      });
      return;
    }

    axios
      .post(backend_url + "review/create/" + this.props.id + "/", {
        "description": description,
        "rating": parseInt(rating),
      })
      .then(() => {
        console.log("Success");
        this.setState({
          description: "",
          rating: ""
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    return (
      <div className="App">
        <form>
          Description:
          <input
            value={this.state.description}
            onChange={e => this.setState({ description: e.target.value })}
          />
          <br />
          Rating:
          <input
            value={this.state.rating}
            onChange={e => this.setState({ rating: e.target.value })}
          />
          <br />
          <button onClick={this.onPost}>Submit</button>
        </form>
      </div>
    );
  }
}

export default CreateReview;
