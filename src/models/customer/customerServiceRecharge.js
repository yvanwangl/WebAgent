import {doRecharge, queryProducts} from '../../services/customer/customerServiceRecharge';

export default {

    namespace: 'customerServiceRecharge',

    state: {
        editorVisible: false,
        subscriberId: null,
        currentBouquet: '',
        allProducts: [],
        products: [],
        rechargeSuccess: false
    },

    subscriptions: {
        setup({dispatch, history}) {  // eslint-disable-line
        },
    },

    effects: {
        *showModal({payload}, {call, put, select}) {  // eslint-disable-line
            const subscriberId = yield select(({customerService})=> customerService.subscriberId);
            const {data} = yield call(queryProducts, {subscriberId});
            if(data && data.success){
                yield put({
                    type: 'doShowModal',
                    payload: {
                        subscriberId,
                        allProducts: data.data.bouquets,
                        currentBouquet: data.data.currentBouquet
                    }
                });
            }
        },
        *doRecharge({ payload }, { call, put, select }) {  // eslint-disable-line
            const {data} = yield call(doRecharge, payload);
            if(data && data.success){
                yield put({
                    type: 'rechargeSuccess'
                });
            }
        },
    },

    reducers: {
        doShowModal(state, action) {
            return {...state, ...action.payload, editorVisible:true };
        },
        hideModal(state, action){
            return {...state, editorVisible:false, subscriberId: null, currentBouquet:'', products:[]};
        },
        filterProducts(state, action){
            const businessClass = action.payload.businessClass;
            const products = state.allProducts.filter(product=> product.businessClass==businessClass);
            return {...state, products};
        },
        resetProducts(state, action){
            return {...state, products:[]};
        },
        rechargeSuccess(state, action){
            return {...state, rechargeSuccess:true };
        },
        hideRechargeSuccessModal(state, action){
            return {...state, subscriberId: null, editorVisible:false, rechargeSuccess: false,  currentBouquet:'', products:[]};
        }
    },

};
