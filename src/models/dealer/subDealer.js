import {getSubDealers, getStockListByPartnerId} from '../../services/dealer/subDealer';

export default {

    namespace: 'subDealer',

    state: {
        disabled: true,
        subDealers:[],
        stockList: [],
        currentPartner: {}
    },

    subscriptions: {
        setup({dispatch, history}) {  // eslint-disable-line
            history.listen(location=> {
                if(location.pathname == '/subDealer') {
                    dispatch({
                        type:'getSubDealers'
                    });
                }
            });
        },
    },

    effects: {
        *getSubDealers({payload}, {call, put}) {  // eslint-disable-line
            const {data} = yield call(getSubDealers);
            if(data && data.success){
                yield put({
                    type: 'getSubDealersSuccess',
                    subDealers: data.data
                });
            }
        },
        *onSubDealerSelect({payload}, {call, put}){
            const {data} = yield call(getStockListByPartnerId, {partnerId: payload.subDealerRecord.partnerId});
            if(data && data.success){
                yield put({
                    type:'getStockListSuccess',
                    payload: {
                        currentPartner: payload.subDealerRecord,
                        stockList: data.data
                    }
                });
            }
        },
    },

    reducers: {
        getSubDealersSuccess(state, action){
            return {...state, subDealers: action.subDealers};
        },
        getStockListSuccess(state, action){
            return {...state, ...action.payload, disabled:false};
        },
        rechargeSuccess(state, action){
            const rechargeData = action.rechargeData;
            const currentPartner = state.currentPartner;
            const subDealers = state.subDealers;
            const newCurrentPartner = {...currentPartner, balance: rechargeData.rechargeInBalance};
            const newSubDealers = subDealers.map(subDealer=> subDealer.partnerId==newCurrentPartner.partnerId? newCurrentPartner:subDealer);
            return {...state, currentPartner: newCurrentPartner, subDealers: newSubDealers};
        }
    },

};
