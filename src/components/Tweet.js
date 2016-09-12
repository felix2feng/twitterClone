import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';

export default class Tweet extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { userName, handle, content, likes} = this.props.tweet
    return (
      <Grid>
        <Row>
          {userName} {handle}
        </Row>
        <Row>
          {content}
        </Row>
        <Row>
          <Button>Like</Button> {likes}
        </Row>                
      </Grid>
    );
  }
}