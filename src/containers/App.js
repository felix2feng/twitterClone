import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TweetActions from '../actions/TweetActions';
import Header from '../components/Header';
import Create from '../components/Create';
import User from '../components/User';
import Timeline from '../components/Timeline';
import Counter from '../components/Counter';
import Footer from '../components/Footer';
import { Grid, Row, Col } from 'react-bootstrap';

/**
 * It is common practice to have a 'Root' container/component require our main App (this one).
 * Again, this is because it serves to wrap the rest of our application with the Provider
 * component to make the Redux store available to the rest of the app.
 */
export class App extends Component {
  componentDidMount() {
    fetch('/tweets')
      .then((response) => {
        return response.json();
      }).then((data) => {
        const { compose } = this.props;
        compose.compose(data.reverse());
      })

      .catch(error => {
        console.error(error);
      })
  }

  render() {
    // we can use ES6's object destructuring to effectively 'unpack' our props
    const { tweets, user, compose } = this.props;
    return (
      <div className="main-app-container">
        <Header />
        <Create compose={compose} user={user} />
        <Grid>
          <Row>
            <Col xs={6} md={4}>
              <User user={user} />
            </Col>
            <Col xs={12} md={8}>
              <Timeline tweets={tweets} />
            </Col>
          </Row>
        </Grid>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  tweets: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  compose: PropTypes.object.isRequired
};

/**
 * Keep in mind that 'state' isn't the state of local object, but your single
 * state in this Redux application. 'counter' is a property within our store/state
 * object. By mapping it to props, we can pass it to the child component Counter.
 */
function mapStateToProps(state) {
  return {
    tweets: state.tweets,
    user: state.user,
  };
}

/**
 * Turns an object whose values are 'action creators' into an object with the same
 * keys but with every action creator wrapped into a 'dispatch' call that we can invoke
 * directly later on. Here we imported the actions specified in 'CounterActions.js' and
 * used the bindActionCreators function Redux provides us.
 *
 * More info: http://redux.js.org/docs/api/bindActionCreators.html
 */
function mapDispatchToProps(dispatch) {
  return {
    compose: bindActionCreators(TweetActions, dispatch)
  };
}

/**
 * 'connect' is provided to us by the bindings offered by 'react-redux'. It simply
 * connects a React component to a Redux store. It never modifies the component class
 * that is passed into it, it actually returns a new connected componet class for use.
 *
 * More info: https://github.com/rackt/react-redux
 */

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
