import {querySubscriberBouquet, queryProducts, doChangeBouquet} from '../../services/customer/customerServiceChangeBouquet';

export default {

    namespace: 'customerServiceChangeBouquet',

    state: {
        editorVisible: false,
        subscriberId: null,
        currentBouquet: '',
        allProducts: [],
        products: [],
        changeBouquetSuccess: false
    },

    subscriptions: {
        setup({dispatch, history}) {  // eslint-disable-line
        },
    },

    effects: {
        *showModal({payload}, {call, put, select}) {  // eslint-disable-line
            const subscriberId = yield select(({customerService})=> customerService.subscriberId);
            const {data} = yield call(querySubscriberBouquet, {subscriberId});
            if(data && data.success){
                yield put({
                    type: 'querySubscriberBouquetSuccess',
                    payload: {
                        subscriberId,
                        allProducts: data.data.bouquets,
                        currentBouquet: data.data.currentBouquet
                    }
                })
            }
        },
        *queryProducts({ payload }, { call, put, select }) {  // eslint-disable-line
            const subscriberId = yield select(({customerService})=> customerService.subscriberId);
            const {data} = yield call(queryProducts, {subscriberId, businessClass: payload.businessClass});
            if(data && data.success){
                yield put({
                    type: 'queryProductsSuccess',
                    products: data.data
                });
            }
        },
        *doChangeBouquet({ payload }, { call, put, select }) {  // eslint-disable-line
            const {data} = yield call(doChangeBouquet, payload);
            if(data && data.success){
                yield put({
                    type: 'changeBouquetSuccess'
                });
            }
        },
    },

    reducers: {
        querySubscriberBouquetSuccess(state, action) {
            return {...state, ...action.payload, editorVisible:true };
        },
        queryProductsSuccess(state, action){
            return {...state, products: action.products};
        },
        filterProducts(state, action){
            const businessClass = action.payload.businessClass;
            const products = state.allProducts.filter(product=> product.businessClass==businessClass);
            return {...state, products};
        },
        hideModal(state, action){
            return {...state, editorVisible:false, subscriberId: null, currentBouquet: '', products: []};
        },
        changeBouquetSuccess(state, action){
            return {...state, changeBouquetSuccess:true };
        },
        hideChangeBouquetSuccessModal(state, action){
            return {...state, subscriberId: null, currentBouquet: '', products: [], editorVisible:false, changeBouquetSuccess: false};
        }
    },

};
