import {querySubscribers, querySubscriberInfo, active} from '../../services/customer/customerService';

export default {

    namespace: 'customerService',

    state: {
        subscribers: [],
        subscriberId: null,
        nullSubscribersModalShow: false,
        editorVisible: false,
        disabledButton: true,
        errorLevel:'',
        errorCode: '',
        serviceInfo: {
            serviceCode: '',
            subscriberStatus: '',
            balance: 0,
            estimatedStopDate: '',
            stbType: '',
            stbCode: '',
            displayName: '',
            subsidiaryOfferDisplayName: ''
        },
        customerInfo: {
            id: '',
            version: null,
            firstName: '',
            lastName: '',
            mobile: '',
            email: '',
            saleAreaId: '',
            saleAreaName: '',
            addressId: '',
            addressName: '',
            detailAddress: '',
            fullAddress: ''
        }
    },

    subscriptions: {
        setup({dispatch, history}) {  // eslint-disable-line
            history.listen( location =>{
                if(location.pathname == '/newSubscriberActive'){
                    dispatch({
                        type: 'queryAddress'
                    });
                }
            });
        },
    },

    effects: {
        *querySubscribers({payload}, {call, put}) {  // eslint-disable-line
            const {data} = yield call(querySubscribers, payload);
            if(data && data.success){
                let subscribers = data.data;
                subscribers = subscribers==null?[]:subscribers;
                if(subscribers.length==1){
                    yield put({
                        type:'querySubscriberInfo',
                        payload: {
                            subscriberId: subscribers[0].id
                        }
                    });
                }else {
                    yield put({
                        type:'querySubscribersSuccess',
                        subscribers: subscribers
                    });
                }
            }else {
                yield put({
                    type: 'querySubscribersFailed',
                    payload: {
                        errorLevel: data.errorLevel,
                        errorCode: data.errorCode
                    }
                });
            }
        },
        *querySubscriberInfo({payload}, {call, put}) {  // eslint-disable-line
            const {data} = yield call(querySubscriberInfo, {subscriberId: payload.subscriberId});
            if(data && data.success){
                yield put({
                    type:'querySubscriberInfoSuccess',
                    payload: {
                        subscriberId: payload.subscriberId,
                        serviceInfo: data.data.serviceInfo,
                        customerInfo: data.data.customerInfo
                    }
                });
            }
        },
        *submitActiveInfo({payload}, {call, put}){
            const {data} = yield call(active, payload);
            if(data && data.success){
                yield put({
                    type:'activeSuccess'
                });
            }
        },
    },

    reducers: {
        querySubscribersSuccess(state, action){
            const subscribers = action.subscribers;
            const editorVisible = subscribers.length>1;
            const nullSubscribersModalShow = subscribers.length==0;
            return {...state, subscribers: action.subscribers, editorVisible, nullSubscribersModalShow};
        },
        querySubscribersFailed(state, action){
            return {...state, ...action.payload, products:[]};
        },
        querySubscriberInfoSuccess(state, action){
            return {...state, ...action.payload, disabledButton: false, editorVisible: false};
        },
        hideNullSubscribersModal(state, action){
            return {...state, nullSubscribersModalShow: false};
        },
        resetErrorCode(state, action){
            return {...state, errorLevel:'', errorCode: ''};
        },
        hideModal(state, action) {
            return {...state, editorVisible: false};
        },
        updateCustomerInfo(state, action){
            return {...state, customerInfo: action.customerInfo};
        }
    },

};
