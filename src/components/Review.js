import React, { Component } from "react";
import "../styles/Review.css"
import { CardPanel } from "react-materialize"

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {showEdit: false, newDesc: "", newRating: ""};
  }

  editReview = () => {
    this.setState({showEdit: true});
  }

  editFormStyle = () => {
    if (this.state.showEdit) {
      return {}
    } else {
      return {"display": "none"}
    }
  }

  cancelEdit = e => {
    e.preventDefault();
    this.setState({showEdit: false, newDesc: "", newRating: ""});
  }

  updateReview = e => {
    e.preventDefault();

    if (isNaN(this.state.newRating) || this.state.newDesc.length === 0) {
      this.cancelEdit(e);
    } else {
      this.props.update(
        this.props.review.id,
        this.state.newDesc,
        parseInt(this.state.newRating)
      );

      this.setState({showEdit: false, newDesc: "", newRating: ""});
    }
  }

  date = (timestamp) => {
    return timestamp.substring(0, timestamp.indexOf("T"))
  }

  render() {
    return (
      <div className="review">

        <CardPanel>
          <div className="review-container">
            <h5 className="review-rating">Score: {this.props.review.rating}</h5>
            <h6 className="review-description">{this.props.review.description}</h6>
            <h6 className="review-date">{this.date(this.props.review.timestamp)}</h6>
          </div>
        </CardPanel>

        <div>
            <button onClick={this.editReview}>Edit</button>
            <button onClick={() => this.props.delete(this.props.review.id)}>Delete</button>
        </div>
        <form style={this.editFormStyle()}>
          New Description:
          <input
            value={this.state.newDesc}
            onChange={e => this.setState({ newDesc: e.target.value })}
          />
          <br />
          New Rating:
          <input
            value={this.state.newRating}
            onChange={e => this.setState({ newRating: e.target.value })}
          />
          <br />
          <button onClick={this.cancelEdit}>Cancel</button>
          <button onClick={this.updateReview}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Review;
