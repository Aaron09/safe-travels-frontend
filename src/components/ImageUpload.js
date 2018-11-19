import React, { Component } from "react";
import axios from "axios";

class ImageUpload extends Component {
  constructor(props) {
    super(props);
  }

  uploadPhoto = e => {
    e.preventDefault();

    var input = this.refs["county-file-upload"]
    if (!input.files) {
      return;
    }

    var image = input.files[0];

    var formData = new FormData();
    formData.append("image", image);

    axios
      .post(
        process.env.REACT_APP_API_URL + "picture/new/" + this.props.id + "/",
        formData,
        { headers: {'Content-Type': 'multipart/form-data'}},
      )
      .then(() => {
        console.log("Success");
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <div>
        <form>
            <input type="file" ref="county-file-upload" accept="image/png, image/jpeg"></input>
            <button onClick={this.uploadPhoto}>Upload</button>
        </form>
      </div>
    );
  }
}

export default ImageUpload;