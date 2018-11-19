import React, { Component } from "react";
import { Collection, CollectionItem, CardPanel } from "react-materialize"
import "../styles/CrimeDisplay.css"

class CrimeDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <CardPanel className="teal lighten-4 black-text">
            <h5 className="crime-stats-title">Crime Statistics</h5>
            <br></br>
            <h6>Population: {this.props.population}</h6>
            <Collection>
                {this.props.crimes.map(crime => (
                    <CollectionItem key={crime["type"]}>
                        <span>{crime["type"]}: {crime["count"]}</span>
                    </CollectionItem>
                ))}
            </Collection>
        </CardPanel>
    );
  }
}

export default CrimeDisplay;