import React, { Component } from 'react';
import { Navbar, Jumbotron }  from 'react-bootstrap';

export default class Header extends Component {
  render() {
    return (
      <Jumbotron>
        <h1 className="text-center">Tweeter</h1>
      </Jumbotron>
    );
  }
}
