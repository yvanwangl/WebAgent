import {modifyPass} from '../services/modifyPass';

export default {

    namespace: 'modifyPass',

    state: {
        type:'loginPass',
        visible: false,
        oldPass: '',
        newPass:'',
        confirmPass:'',
        modifySuccess: false
    },

    effects: {
        *doModifyPass({payload}, {call, put, select}) {  // eslint-disable-line
            payload['type'] = yield select(({modifyPass})=> modifyPass.type);
            const {data} = yield call(modifyPass, payload);
            if (data && data.success) {
                yield put({
                    type: 'hideModal'
                });
            }
        }
    },

    reducers: {
        hideModal(state, action){
            return {...state, type:'loginPass', visible: false, oldPass: '', newPass:'', modifySuccess:true};
        },
        modifyPass(state, action){
            return {...state, type:action.passType, visible: true};
        },
    },

};
