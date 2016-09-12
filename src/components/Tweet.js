import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';

export default class Tweet extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { userName, handle, content} = this.props.tweet
    return (
      <Grid>
        <Row>
          {userName} {handle}
        </Row>
        <Row>
          {content}
        </Row>
        <Row>
          <Button>Retweet</Button>
          <Button>Like</Button>
        </Row>                
      </Grid>
    );
  }
}