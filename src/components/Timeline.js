import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Tweet from './Tweet';

export default class Timeline extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { tweets } = this.props;
    const mappedTweets = tweets.map(tweet => {
      return (
        <ListGroupItem>
          <Tweet tweet={tweet} />
        </ListGroupItem>
      )
    })

    return (
      <ListGroup>
        <ListGroupItem bsStyle="info">Timeline</ListGroupItem>
        {mappedTweets}
      </ListGroup>
    );
  }
}