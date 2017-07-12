import {queryAddress, getCustomerConfig, queryProducts, active} from '../../services/customer/newSubscriberActive';
import { Modal } from 'antd';

export default {

    namespace: 'newSubscriberActive',

    state: {
        saleAddressId: '',
        saleAddressName: '北京地址',
        addresses:[],
        products: [],
        activeSuccess: false,
        errorLevel:'',
        errorCode: '',
        customerName: 1
    },

    subscriptions: {
        setup({dispatch, history}) {  // eslint-disable-line
            history.listen( location =>{
                if(location.pathname == '/newSubscriberActive'){
                    dispatch({
                        type: 'queryAddress'
                    });
                    dispatch({
                        type: 'getCustomerConfig'
                    });
                }
            });
        },
    },

    effects: {
        *queryAddress({payload}, {call, put}) {  // eslint-disable-line
            const {data} = yield call(queryAddress);
            if(data && data.success){
                yield put({
                    type:'queryAddressSuccess',
                    payload: data.data
                });
            }
        },
        *getCustomerConfig({payload}, {call, put}) {  // eslint-disable-line
            const {data} = yield call(getCustomerConfig);
            if(data && data.success){
                yield put({
                    type:'getCustomerConfigSuccess',
                    payload: {
                        customerName: data.data.customer_name
                    }
                });
            }
        },
        *queryProducts({payload}, {call, put}) {  // eslint-disable-line
            const {data} = yield call(queryProducts, payload);
            if(data && data.success){
                yield put({
                    type:'queryProductsSuccess',
                    payload: data.data
                });
            }else {
                /*yield put({
                    type: 'queryProductsFailed',
                    payload: {
                        errorLevel: data.errorLevel,
                        errorCode: data.errorCode
                    }
                });*/
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
        queryAddressSuccess(state, action) {
            return {...state, ...action.payload};
        },
        getCustomerConfigSuccess(state, action){
            return {...state, ...action.payload};
        },
        queryProductsSuccess(state, action) {
            return {...state, products: action.payload};
        },
        queryProductsFailed(state, action){
            return {...state, ...action.payload, products:[]};
        },
        resetErrorCode(state, action){
            return {...state, errorLevel:'', errorCode: ''};
        },
        resetProducts(state, action){
            return {...state, products:[]};
        },
        activeSuccess(state){
            return {...state, activeSuccess: true};
        },
        resetActiveSuccess(state){
            return {...state, activeSuccess: false, products:[]};
        }
    },

};
