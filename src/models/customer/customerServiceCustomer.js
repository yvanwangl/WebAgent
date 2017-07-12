import {queryAddress, doModifyCustomer} from '../../services/customer/customerServiceCustomer';

export default {

    namespace: 'customerServiceCustomer',

    state: {
        editorVisible: false,
        saleAddressId: '',
        saleAddressName: '北京地址',
        addresses:[
            {id:1, name:'一级地址', parentId:null},
            {id:2, name:'2级地址', parentId:1},
            {id:3, name:'2级地址', parentId:1},
            {id:4, name:'3级地址', parentId:2},
        ],
        currentItem: {},
        modifyCustomerSuccess: false
    },

    subscriptions: {
        setup({dispatch, history}) {  // eslint-disable-line
        },
    },

    effects: {
        *showModal({payload}, {call, put, select}) {  // eslint-disable-line
            const customerInfo = payload.customerInfo;
            const {data} = yield call(queryAddress);
            if (data && data.success) {
                yield put({
                    type: 'queryAddressSuccess',
                    payload: {
                        currentItem: customerInfo,
                        ...data.data
                    }
                });
            }
        },
        *doModifyCustomer({ payload }, { call, put, select }) {  // eslint-disable-line
            const {data} = yield call(doModifyCustomer, payload);
            if(data && data.success){
                yield put({
                    type: 'modifyCustomerSuccess',
                    currentItem: data.data
                });
                /*
                * 更新客户成功后，通知 customerService 更新客户信息 customerInfo
                * 可以跨 model 进行 action 触发，
                * type: 'customerService/updateCustomerInfo',
                * 这样可以实现，
                * 但是，会触发修改客户信息的弹窗重新渲染，出现闪窗的情况，
                * 所以，在点击了成功提示弹窗后再通知 customerService 更新客户信息 customerInfo
                * */
            }
        },
    },

    reducers: {
        queryAddressSuccess(state, action) {
            return {...state, ...action.payload, editorVisible:true };
        },
        queryProductsSuccess(state, action){
            return {...state, products: action.products};
        },
        hideModal(state, action){
            return {...state, editorVisible:false};
        },
        modifyCustomerSuccess(state, action){
            return {...state, currentItem: action.currentItem , modifyCustomerSuccess: true };
        },
        hideModifyCustomerSuccessModal(state, action){
            return {...state, editorVisible:false, modifyCustomerSuccess: false};
        }
    },

};
