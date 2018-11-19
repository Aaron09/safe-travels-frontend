import React, { Component } from "react";
import "../styles/ImageList.css"
import { CardPanel } from "react-materialize"

class ImageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <CardPanel className="teal lighten-4 black-text">
            <div className="image-list-container">
                {this.props.imageUrls.map(url => (
                    <div className="image-container" key={url}>
                        <img className="county-image" src={url} alt={"Unavailable."}></img>
                    </div>
                ))}
            </div>
        </CardPanel>
    );
  }
}

export default ImageList;
