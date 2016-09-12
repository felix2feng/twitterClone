import { UPDATE_USER } from '../constants/ActionTypes';

const defaultState = {
    userName: 'Felix Feng',
    handle: '@felixfeng',
    tweets: 100,
}

export default function tweets(state = defaultState, action) {
  switch (action.type) {
  case UPDATE_USER:
    return Object.assign({}, state, action.user);
  default:
    return state;
  }
}
