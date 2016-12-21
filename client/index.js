
import React from "react";
import { render } from "react-dom";

class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

render(<Welcome />, document.getElementById('root'));