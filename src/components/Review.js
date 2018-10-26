import React, { Component } from "react";

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

  render() {
    return (
      <div className="review">
        <div>Description: {this.props.review.description}</div>
        <div>Rating: {this.props.review.rating}</div>
        <div>Timestamp: {this.props.review.timestamp}</div>
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
