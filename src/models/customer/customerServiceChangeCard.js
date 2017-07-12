import {queryResourceStatus, doChangeCard} from '../../services/customer/customerServiceChangeCard'

export default {

    namespace: 'customerServiceChangeCard',

    state: {
        editorVisible: false,
        subscriberId: null,
        resourceStatus: [],
        changeCardSuccess: false
    },

    subscriptions: {
        setup({dispatch, history}) {  // eslint-disable-line
        },
    },

    effects: {
        *showModal({payload}, {call, put, select}) {  // eslint-disable-line
            const subscriberId = yield select(({customerService})=> customerService.subscriberId);
           /* const {data} = yield call(queryResourceStatus);*/
            yield put({
                type: 'queryResourceStatusSuccess',
                payload: {
                    subscriberId,
                    resourceStatus: [
                        {id: '2', name: 'Scrapped'},
                        {id: '5', name: 'Damage'},
                    ]
                }
            });
            /*if(data && data.success){

            }*/
        },
        *doChangeCard({ payload }, { call, put, select }) {  // eslint-disable-line
            const {data} = yield call(doChangeCard, payload);
            if(data && data.success){
                yield put({
                    type: 'changeCardSuccess'
                });
            }
        },
    },

    reducers: {
        queryResourceStatusSuccess(state, action) {
            return {...state, ...action.payload, editorVisible:true };
        },
        hideModal(state, action){
            return {...state, editorVisible:false, subscriberId: null, currentBouquet: '', products: []};
        },
        changeCardSuccess(state, action){
            return {...state, changeCardSuccess:true };
        },
        hideChangeCardSuccessModal(state, action){
            return {...state, editorVisible:false, changeCardSuccess: false};
        }
    },

};
