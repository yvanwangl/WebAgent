import { getPartnerStaffs, getBouquets, queryActivationSubscribers } from '../../services/report/activationSubscriber';
import {exportData} from '../../services/export';

export default {

    namespace: 'activationSubscriber',

    state: {
        queryParams: {},
        staffs: [],
        bouquets: [],
        activationSubscribers: [],
        exportSuccess: false
    },

    subscriptions: {
        setup({dispatch, history}) {  // eslint-disable-line
            history.listen((location)=> {
                if(location.pathname == '/activationSubscriber'){
                    dispatch({
                        type: 'getPartnerStaffs'
                    });
                    dispatch({
                        type: 'getBouquets'
                    });
                }
            })
        },
    },

    effects: {
        *getPartnerStaffs({payload}, {call, put}) {  // eslint-disable-line
            const {data} = yield call(getPartnerStaffs, {});
            if(data && data.success){
                yield put({
                    type: 'getPartnerStaffsSuccess',
                    staffs: data.data
                })
            }
        },
        *getBouquets({payload}, {call, put}) {  // eslint-disable-line
            const {data} = yield call(getBouquets, {});
            if(data && data.success){
                yield put({
                    type: 'getBouquetsSuccess',
                    bouquets: data.data
                })
            }
        },
        *queryActivationSubscribers({payload}, {call, put}){
            yield put({
                type: 'updateQueryParams',
                queryParams: payload
            });
            const {data} = yield call(queryActivationSubscribers, payload);
            if(data && data.success){
                yield put({
                    type: 'queryActivationSubscribersSuccess',
                    activationSubscribers: data.data
                });
            }
        },
        *doExport({payload}, {call, put, select}){
            const queryParams = yield select(({activationSubscriber})=> activationSubscriber.queryParams);
            const {data} = yield call(exportData, {
                url: '/api/activation-subscriber/doExport',
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
        getPartnerStaffsSuccess(state, action) {
            return {...state, staffs: action.staffs};
        },
        getBouquetsSuccess(state, action){
            return {...state, bouquets: action.bouquets};
        },
        queryActivationSubscribersSuccess(state, action){
            return {...state, activationSubscribers: action.activationSubscribers};
        },
        exportSuccess(state, action){
            return {...state, exportSuccess: true};
        },
        hideExportSuccessModal(state, action){
            return {...state, exportSuccess: false};
        }
    },

};
