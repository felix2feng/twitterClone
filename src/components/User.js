import React, { Component, PropTypes } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default class User extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;
    return (
      <ListGroup>
        <ListGroupItem bsStyle="info">User Info</ListGroupItem>
        <ListGroupItem>Twitter Name: {user.userName}</ListGroupItem>
        <ListGroupItem>Twitter Handle: {user.handle}</ListGroupItem>
        <ListGroupItem>Number of Tweets: {user.tweets}</ListGroupItem>
      </ListGroup>
    );
  }
}


User.propTypes = {
  user: PropTypes.object.isRequired,
};