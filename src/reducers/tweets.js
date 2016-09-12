import { COMPOSE_TWEET } from '../constants/ActionTypes';

const defaultState = [];

export default function tweets(state = defaultState, action) {
  switch (action.type) {
  case COMPOSE_TWEET:
    return Object.assign([], state, action.tweet);
  default:
    return state;
  }
}
