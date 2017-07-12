/**
 * Created by yaoyirui on 2017/4/12.
 */
import {getDealers} from '../../services/report/balanceChange';
import {getPartnerStaffs} from '../../services/report/activationSubscriber';
import {resendMessage, queryBalanceSale} from '../../services/report/balanceSale';
import {exportData} from '../../services/export';
export default {

    namespace: 'balanceSale',

    state: {
        queryParams: {},
        partners: [],
        balanceSaleRecords: [],
        staffs: [],
        exportType: '',
        exportSuccess: false,
        resendMessage: false,
        selectedBalanceSaleRecord: {}
    },

    subscriptions: {
        setup({dispatch, history}) {  // eslint-disable-line
            history.listen((location) => {
                if (location.pathname == '/balanceSale') {
                    dispatch({
                        type: 'getPartnerStaffs'
                    });
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
            if (data && data.success) {
                yield put({
                    type: 'getDealersSuccess',
                    payload: {
                        partners: data.data,
                    }
                })
            }
        },
        *getPartnerStaffs({payload}, {call, put}) {  // eslint-disable-line
            const {data} = yield call(getPartnerStaffs, {});
            if (data && data.success) {
                yield put({
                    type: 'getPartnerStaffsSuccess',
                    payload: {
                        staffs: data.data
                    }
                })
            }
        },

        *queryBalanceSale({payload}, {call, put}){
            yield put({
                type: 'updateQueryParams',
                queryParams: payload
            });
            const {data} = yield call(queryBalanceSale, payload);
            if (data && data.success) {
                yield put({
                    type: 'queryBalanceSaleSuccess',
                    payload: {
                        balanceSaleRecords: data.data
                    }
                });
            }
        },
        *doExport({payload}, {call, put, select}){
            const queryParams = yield select(({activationSubscriber}) => activationSubscriber.queryParams);
            const {data} = yield call(exportData, {
                url: '/api/activation-subscriber/doExportSale',
                queryParams
            });
            if (data && data.success) {
                yield put({
                    type: 'exportSuccess'
                });
            }
        },
        *resendMessage({payload}, {call, put}){

            const {data} = yield call(resendMessage, payload);
            if (data && data.success) {
                yield put({
                    type: 'resendMessageSuccess'
                });
            }
        }
    },

    reducers: {
        updateQueryParams(state, action){
            return {...state, queryParams: action.queryParams};
        },
        queryBalanceSaleSuccess(state, action){
            return {...state, ...action.payload};
        },
        exportSuccess(state, action){
            return {...state, exportSuccess: true};
        },
        hideExportSuccessModal(state, action){
            return {...state, exportSuccess: false};
        },
        getPartnerStaffsSuccess(state, action) {
            return {...state, ...action.payload};
        },
        selectBalanceSaleRecord(state, action){
            return {...state, ...action.payload};
        },
        changeResendMessageButtonState(state, action){
            return {...state, ...action.payload};
        },
        resendMessageSuccess(state, action){
            return {...state, ...action.payload};
        },
        getDealersSuccess(state, action) {
            return {...state, ...action.payload};
        }
    },

};

