import React, { Component } from "react";
import axios from "axios";
import Review from "./Review";

class ReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    this.getReviews();
  }

  getReviews = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "review/all/" + this.props.id)
      .then(response => {
        this.setState({
          data: response.data.reviews
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteReview = (review_id) => {
    axios
      .delete(process.env.REACT_APP_API_URL + "review/delete/" + review_id + "/")
      .then(response => {
        this.getReviews();
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateReview = (review_id, newDesc, newRating) => {
    axios
      .post(process.env.REACT_APP_API_URL + "review/edit/" + review_id + "/", {
        "description": newDesc,
        "rating": newRating,
      })
      .then(response => {
        this.getReviews();
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <div className="review-list">
        {this.state.data.map(review => (
          <div key={review.id}>
            <Review review={review} delete={this.deleteReview} update ={this.updateReview} />
            <hr></hr>
          </div>
        ))}
      </div>
    );
  }
}

export default ReviewList;
