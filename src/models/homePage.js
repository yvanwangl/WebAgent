import {queryIsAdmin} from '../services/homePage';

export default {

  namespace: 'homePage',

  state: {
    isAdmin: false
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *queryIsAdmin({ payload }, { call, put }) {  // eslint-disable-line
      yield call({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
