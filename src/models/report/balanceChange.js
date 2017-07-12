import { getDealers, getAccountTreeNodes, queryBalanceChange } from '../../services/report/balanceChange';
import {exportData} from '../../services/export';

export default {

    namespace: 'balanceChange',

    state: {
        queryParams: {},
        partners: [],
        organizationStaffTreeNodes: [],
        balanceChangeRecords: [],
        balanceSaleRecords: [],
        exportType: '',
        exportSuccess: false
    },

    subscriptions: {
        setup({dispatch, history}) {  // eslint-disable-line
            history.listen((location)=> {
                if(location.pathname == '/balanceChange'){
                    dispatch({
                        type: 'getDealers'
                    });
                }
            })
        },
    },

    effects: {
        *getDealers({payload}, {call, put}) {  // eslint-disable-line
            const {data} = yield call(getDealers, {});
            if(data && data.success){
                yield put({
                    type: 'getDealersSuccess',
                    payload: {
                        partners: data.data,
                    }
                })
            }
        },
        *getAccountTreeNodes({payload}, {call, put}){
            const {data} = yield call(getAccountTreeNodes, {partnerId: payload.partnerId});
            if(data && data.success){
                yield put({
                    type: 'getAccountTreeNodesSuccess',
                    payload: {
                        organizationStaffTreeNodes: data.data,
                    }
                })
            }
        },
        *queryBalanceChange({payload}, {call, put}){
            yield put({
                type: 'updateQueryParams',
                queryParams: payload
            });
            const {data} = yield call(queryBalanceChange, payload);
            if(data && data.success){
                yield put({
                    type: 'queryBalanceChangeSuccess',
                    payload: {
                        balanceChangeRecords: data.data.inOutResult,
                        balanceSaleRecords: data.data.salesResult
                    }
                });
            }
        },
        *doExport({payload}, {call, put, select}){
            const queryParams = yield select(({activationSubscriber})=> activationSubscriber.queryParams);
            const {data} = yield call(exportData, {
                url: payload.exportType=='balanceChangeExport'?'/api/activation-subscriber/doExportChange':'/api/activation-subscriber/doExportSale',
                queryParams
            });
            if(data && data.success){
                yield put({
                    type: 'exportSuccess'
                });
            }
        }
    },

    reducers: {
        updateQueryParams(state, action){
            return {...state, queryParams: action.queryParams};
        },
        getDealersSuccess(state, action) {
            return {...state, ...action.payload};
        },
        getAccountTreeNodesSuccess(state, action){
            return {...state, ...action.payload};
        },
        queryBalanceChangeSuccess(state, action){
            return {...state, ...action.payload};
        },
        exportSuccess(state, action){
            return {...state, exportSuccess: true};
        },
        hideExportSuccessModal(state, action){
            return {...state, exportSuccess: false};
        }
    },

};
