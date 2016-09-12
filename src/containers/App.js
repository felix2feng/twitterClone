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

function mapStateToProps(state) {
  return {
    tweets: state.tweets,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    compose: bindActionCreators(TweetActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
