import {login, logout, getCurrentUser} from '../services/login';
import {routerRedux} from 'dva/router';

export default {

    namespace: 'login',

    state: {
        username: '',
        password: '',
        isLogin: false,
        isAdmin: false,
        userId: null,
        partnerId: null,
        partnerStaffId: null,
        account: '',
        balance: 0,
        getBalanceSuccess: false,
        userInfo: {
            /*partnerStaffName: '1000',
            role: '管理员',
            partnerAccountNumber: '1000322',
            balance: 12500,
            partnerStaffCode: '10005620',
            partnerName: '张三',
            partnerCode: '100056'*/
        }
    },

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
            history.listen(location => {
                if(location.pathname.match(/\//)){
                    if(sessionStorage.getItem('userInfo')){
                        dispatch({
                            type: 'loginSuccess',
                            data: JSON.parse(sessionStorage.getItem('userInfo'))
                        });
                    }
                }
            });
        },
    },

    effects: {
        *doLogin({payload}, {call, put, select}) {  // eslint-disable-line
            const {data} = yield call(login, payload);
            if (data && data.success) {
                const userData = data.data;
                yield put({
                    type: 'loginSuccess',
                    data: userData
                });
                yield sessionStorage.setItem('userInfo', JSON.stringify(userData));
                if (userData.admin) {
                    yield put(routerRedux.push('/dealerOrganization'));
                } else {
                    yield put(routerRedux.push('/subDealer'));
                }

            }
        },
        *doLogout({payload}, {call, put, select}){
            const userId = yield select(({login})=> login.userId);
            const {data} = yield call(logout, {userId});
            if (data && data.success) {
                yield put({
                    type: 'logoutSuccess'
                });
                yield sessionStorage.setItem('userInfo', '');
                yield put(routerRedux.push('/login'));
            }
        },
        *getBalance({payload}, {call, put, select}){
            const {data} = yield call(getCurrentUser, {});
            if(data && data.success){
                yield put({
                    type: 'getCurrentUserSuccess',
                    payload: data.data
                });
            }
        }
    },

    reducers: {
        loginSuccess(state, action) {
            let data = action.data;
            let newData = {
                partnerStaffName: data['partnerStaffName'],
                role: data['admin']? 'Admin':'Staff',
                partnerAccountNumber: data['partnerAccountNumber'],
                balance: data['balance'],
                partnerStaffCode: data['partnerStaffCode'],
                partnerName: data['partnerName'],
                partnerCode: data['partnerCode'],
            };
            let userInfo = Object.assign({}, state.userInfo, newData);
            return {...state, isLogin: true, isAdmin: data.admin, userId:data.userId, partnerId: data.partnerId, partnerStaffId:data.partnerStaffId, userInfo};
        },
        logoutSuccess(state, action){
            return {...state, isLogin: false, isAdmin: false, userId:null, userInfo:{}};
        },
        getCurrentUserSuccess(state, action){
            return {...state, account: action.payload.partnerAccountNumber, balance:action.payload.balance, getBalanceSuccess:true};
        },
        hideBalanceModal(state, action){
            return {...state, getBalanceSuccess:false};
        }
    },

};
