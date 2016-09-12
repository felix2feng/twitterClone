import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, Row, Col, FormControl, Button, Panel } from 'react-bootstrap';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetContent: '',
      remainingChars: 140,
    }
    this.getValidationState = this.getValidationState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getValidationState() {
    const length = this.state.remainingChars;
    if (length >= 0 && length < 140) return 'success';
    else if (length < 0) return 'error';
  }

  handleChange(e) {
    this.setState({
      tweetContent: e.target.value,
      remainingChars: 140 - e.target.value.length,
    });
  }

  handleSubmit(e) {
    const { user } = this.props;
    e.preventDefault();
    const tweet = {
      userName: user.userName ,
      handle: user.handle,
      content: React.findDOMNode(this.refs.tweetInput).value,
      createDate: new Date(),
    };
    fetch('/tweet', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tweet: tweet,
      })      
    })
      .then((response) => {
        return response.json();
      })
      .then(data => {
        const { compose } = this.props;
        compose.compose(data.reverse());
      });
    this.setState({
      tweetContent: '',
      remainingChars: 140,      
    });
    React.findDOMNode(this.refs.tweetInput).value = '';
  }

  render() {
    return (
      <Panel header="Compose a Tweet">
        <Form className="createTweetForm" onSubmit={this.handleSubmit}> 
          <FormGroup controlId="formBasicText" validationState={this.getValidationState()}>
            <Row>
              <FormControl
                type="text"
                value={this.state.value}
                ref="tweetInput"
                onChange={this.handleChange}
                placeholder="What is happening?" />
              <FormControl.Feedback />
            </Row>
            <Row className="utilityRow pull-right">
                  <span className="tweet-counter">{this.state.remainingChars}</span>
                  <Button type="submit" bsStyle="info"><span>Tweet</span></Button>
            </Row>
          </FormGroup>
        </Form>
      </Panel>
    );
  }
}

Create.propTypes = {
  user: PropTypes.object.isRequired,
  compose: PropTypes.object.isRequired,
}