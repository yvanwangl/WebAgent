import {getTelConfig, create, modify, getStaffByOrganizationId} from '../../services/dealer/organizationStaff';
export default {

    namespace: 'organizationStaff',

    state: {
        staffList:[],
        editorVisible: false,
        editorType: 'create',
        currentItem: {},
        disabled: true,
        addButtonDisabled: true,
        organizationChange: false,
        telConfig: {}
    },

    subscriptions: {
        setup({dispatch, history}) {  // eslint-disable-line
        },
    },

    effects: {
        *showEditor({payload}, {call, put}){
            const {data} = yield call(getTelConfig, {});
            if(data && data.success){
                yield put({
                    type:'doShowEditor',
                    payload: {
                        editorType: payload.editorType,
                        telConfig: data.data
                    }
                });
            }
        },
        *nodeSelect({payload}, {call, put}){
            yield put({
                type: 'organizationSelected'
            });
            const {data} = yield call(getStaffByOrganizationId, {organizationId: payload.selectKey});
            if(data && data.success){
                yield put({
                    type:'getStaffListSuccess',
                    staffList: data.data
                });
            }
        },
        *create({payload}, {call, put}){
            const {data} = yield call(create, payload);
            if(data && data.success){
                yield put({
                    type:'createSuccess',
                    newStaff: data.data
                });
            }
            /*else {
                let errorCode = data.errorCode;
                //处理错误逻辑，例如组织名称重复
                //将 errorCode 映射为相应的 errorMessage
                yield put({
                    type:'createFailed',
                    errorMessage: 'sameMobilePhone'
                });
            }*/
        },
        *modify({payload}, {call, put, select}){
            const staff = yield select(({organizationStaff})=> organizationStaff.currentItem);
            const modifyStaff = Object.assign({}, staff, payload);
            const {data} = yield call(modify, modifyStaff);
            if(data && data.success){
                yield put({
                    type:'modifySuccess',
                    modifyStaff: data.data
                });
            }
        },
        *charge({payload}, {call, put}){}
    },

    reducers: {
        doShowEditor(state, action){
            return {...state, editorVisible: true, ...action.payload};
        },
        hideEditor(state, action){
            return {...state, editorVisible: false};
        },
        getStaffListSuccess(state, action){
            const staffList = action.staffList;
            return {...state, staffList};
        },
        createSuccess(state, action){
            const currentItem = action.newStaff;
            const staffList = state.staffList;
            staffList.unshift(currentItem);
            return {...state, currentItem, staffList, editorVisible: false, editorType: 'create'};
        },
        createFailed(state, action){
            const errorMessage = action.errorMessage;
            return {...state, errorMessage};
        },
        modifySuccess(state, action){
            const currentItem = action.modifyStaff;
            const staffList = state.staffList;
            const newStaffList = staffList.map(staff=> {
                if(staff.id==currentItem.id){
                    return currentItem;
                }else {
                    return staff;
                }
            });
            return {...state, currentItem, staffList: newStaffList, editorVisible: false, editorType: 'create'};
        },
        staffSelect(state, action){
            const currentItem = action.staff;
            return {...state, currentItem, disabled: false};
        },
        resetErrorMessage(state, action){
            return {...state, errorMessage:''};
        },
        organizationSelected(state, action){
            return {...state, addButtonDisabled: false, organizationChange: true};
        },
        resetOrganizationChange(state, action){
            return {...state, organizationChange: false, disabled:true };
        },
        rechargeSuccess(state, action){
            const rechargeData = action.rechargeData;
            const currentItem = state.currentItem;
            const staffList = state.staffList;
            const newCurrentItem = {...currentItem, balance: rechargeData.rechargeInBalance};
            const newStaffList = staffList.map(staff=> staff.id==newCurrentItem.id? newCurrentItem:staff);
            return {...state, currentItem: newCurrentItem, staffList: newStaffList};
        }
    },

};
