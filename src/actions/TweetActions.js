import { COMPOSE_TWEET } from '../constants/ActionTypes';

export function compose(tweet) {
  return {
    type: COMPOSE_TWEET,
    tweet,
  };
}
