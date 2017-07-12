import { getOrganizationStaffTree, doRecharge } from '../../services/dealer/recharge';

const defaultRecharge = {
    editorVisible: false,
    editorType: 'organization',
    titleType: 'organization',
    organizationStaffTreeNodes: [],
    rechargeOutType: null,
    rechargeOutId: null,
    rechargeOutBalance: 0,
    rechargeInType:null,
    rechargeInId: null,
    rechargeInName: null,
    rechargeInBalance: 0,
    staffId: null,
    money: 0,
    pin: '',
    rechargeSuccess: false,
    rechargeData: {}
};

export default {

    namespace: 'recharge',

    state: {
        ...defaultRecharge
    },

    subscriptions: {
        setup({dispatch, history}) {  // eslint-disable-line

        },
    },

    effects: {
        *showRechargeModal( { payload }, {call, put, select}){
            const {data} = yield call(getOrganizationStaffTree);
            if(data && data.success){
                yield put({
                    type: 'getOrganizationStaffTreeSuccess',
                    payload: {
                        organizationStaffTreeNodes: data.data,
                        ...payload
                    }
                });
            }
        },
        *recharge({payload: rechargeValues}, {call, put, select}){
            rechargeValues['rechargeType'] = yield select(({recharge})=> recharge.titleType);
            const {data} = yield call(doRecharge, rechargeValues);
            if(data && data.success){
                yield put({
                    type:'rechargeSuccess',
                    rechargeData: data.data
                });
            }
        }
    },

    reducers: {
        /*showEditor(state, action){
            const {editorType, organizationId} = action.payload;
            return {...state, editorVisible: true, editorType, organizationId};
        },*/
        hideEditor(state, action){
            return {...state, editorVisible: false};
        },
        getOrganizationStaffTreeSuccess(state, action){
            /*const organizationStaffTreeNodes = [
                {name: '根组织', id: 1, parentId: '', type: 0, balance: 100, children: []},
                {name: '市场部', id: 2, parentId: '1', type: 1, balance: 200, children: []},
                {name: '营业部', id: 3, parentId: '2', type: 2, balance: 300, children: []},
                {name: '技术部', id: 4, parentId: '2', type: 2, balance: 400, children: []},
                {name: '财务部', id: 5, parentId: '2', type: 2, balance: 500, children: []},
            ];*/
            return {...state, ...action.payload, editorVisible: true};
        },
        rechargeSuccess(state, action){
            return {...state, rechargeSuccess: true, rechargeData: action.rechargeData};
        },
        hideRechargeSuccessModal(state, action){
            return {...state, rechargeSuccess: false, editorVisible: false};
        }
    },

};
