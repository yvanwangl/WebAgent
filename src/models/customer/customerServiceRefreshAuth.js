import {doRefreshAuth} from '../../services/customer/customerServiceRefreshAuth';

export default {

    namespace: 'customerServiceRefreshAuth',

    state: {
        editorVisible: false,
        subscriberId: null,
        refreshAuthSuccess: false
    },

    subscriptions: {
        setup({dispatch, history}) {  // eslint-disable-line
        },
    },

    effects: {
        *showModal({payload}, {call, put, select}) {  // eslint-disable-line
            const subscriberId = yield select(({customerService})=> customerService.subscriberId);
            yield put({
                type: 'doShowModal',
                payload: {
                    subscriberId,
                }
            })
        },
        *doRefreshAuth({ payload }, { call, put, select }) {  // eslint-disable-line
            const {data} = yield call(doRefreshAuth, payload);
            if(data && data.success){
                yield put({
                    type: 'refreshAuthSuccess'
                });
            }
        },
    },

    reducers: {
        doShowModal(state, action) {
            return {...state, ...action.payload, editorVisible:true };
        },
        hideModal(state, action){
            return {...state, editorVisible:false, subscriberId: null};
        },
        refreshAuthSuccess(state, action){
            return {...state, refreshAuthSuccess:true };
        },
        hideRefreshAuthSuccessModal(state, action){
            return {...state, subscriberId: null, editorVisible:false, refreshAuthSuccess: false};
        }
    },

};
