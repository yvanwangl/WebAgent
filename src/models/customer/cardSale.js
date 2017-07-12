import {getCurrentUser, queryVoucherCards, cardSale} from '../../services/customer/cardSale';
import { Modal } from 'antd';

export default {

    namespace: 'cardSale',

    state: {
        balance: 0,
        voucherCards: [],
        cardSaleSuccess: false
    },

    subscriptions: {
        setup({dispatch, history}) {  // eslint-disable-line
            history.listen( location =>{
                if(location.pathname == '/cardSale'){
                    dispatch({
                        type: 'getBalance'
                    });
                    dispatch({
                        type: 'getVoucherCards'
                    });
                }
            });
        },
    },

    effects: {
        *getBalance({payload}, {call, put}) {  // eslint-disable-line
            const {data} = yield call(getCurrentUser, {});
            if(data && data.success){
                yield put({
                    type: 'getCurrentUserSuccess',
                    payload: data.data
                });
            }
        },
        *getVoucherCards({payload}, {call, put}) {  // eslint-disable-line
            const {data} = yield call(queryVoucherCards, payload);
            if(data && data.success){
                yield put({
                    type:'queryVoucherCardsSuccess',
                    payload: data.data
                });
            }
        },
        *submitCardSaleInfo({payload}, {call, put}){
            const {data} = yield call(cardSale, payload);
            if(data && data.success){
                yield put({
                    type:'cardSaleSuccess'
                });
            }
        },
    },

    reducers: {
        getCurrentUserSuccess(state, action) {
            return {...state, balance: action.payload.balance};
        },
        queryVoucherCardsSuccess(state, action){
            return {...state, voucherCards: action.payload};
        },
        cardSaleSuccess(state){
            return {...state, cardSaleSuccess: true};
        },
        resetCardSaleSuccess(state){
            return {...state, cardSaleSuccess: false, voucherCards:[]};
        }
    },

};
