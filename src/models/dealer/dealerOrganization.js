import { create, modify, getOrganizationTreeNodes ,getOrganizationById} from '../../services/dealer/dealerOrganization';

const defaultOrganizationInfo = {
    code: '',
    name: '',
    balance: null,
    parentName: ''
};

export default {

    namespace: 'dealerOrganization',

    state: {
        organizationInfo: {...defaultOrganizationInfo},
        editorVisible: false,
        editorType: 'create',
        currentItem: {},
        disabled: true,
        treeGridNodes:[],
        errorMessage:''
    },

    subscriptions: {
        setup({dispatch, history}) {  // eslint-disable-line
            history.listen(location=> {
                if(location.pathname == '/dealerOrganization') {
                    dispatch({
                        type:'getOrganizationTreeNodes'
                    });
                }
            });
        },
    },

    effects: {
        *getOrganizationTreeNodes({payload}, {call, put}) {  // eslint-disable-line
            const {data} = yield call(getOrganizationTreeNodes);
            if(data && data.success){
                yield put({
                    type: 'getOrganizationTreeNodesSuccess',
                    treeGridNodes: [data.data]
                });
            }
        },
        *create({payload}, {call, put}){
            const {data: organization} = yield call(create, payload);
            if(organization && organization.success){
                const newOrganization = organization.data;
                const {data} = yield call(getOrganizationTreeNodes);
                if( data && data.success){
                    yield put({
                        type:'createSuccess',
                        payload: {
                            treeGridNodes: [data.data],
                            currentItem: newOrganization
                        }
                    });
                }else {
                    let errorCode = data.errorCode;
                    //处理错误逻辑，例如组织名称重复
                    //将 errorCode 映射为相应的 errorMessage
                    yield put({
                        type:'createFailed',
                        errorMessage: 'sameName'
                    });
                }
            }
        },
        *modify({payload}, {call, put, select}){
            const {data} = yield call(modify, payload);
            if(data && data.success){
                yield put({
                    type:'modifySuccess',
                    payload: data.data
                });
            }
        },
        *nodeSelect({payload}, {call, put}){
            const {data} = yield call(getOrganizationById, {id: payload.selectKey});
            if(data && data.success){
                yield put({
                    type:'getTreeNodeSuccess',
                    currentItem: data.data
                });
            }
        },
    },

    reducers: {
        save(state, action) {
            return {...state, ...action.payload};
        },
        showEditor(state, action){
            return {...state, editorVisible: true, editorType: action.editorType};
        },
        hideEditor(state, action){
            return {...state, editorVisible: false};
        },
        createSuccess(state, action){
            const currentItem = action.payload.currentItem;
            const organizationInfo = {
                code: currentItem['code'],
                name: currentItem['name'],
                balance: currentItem['balance'],
                parentName: currentItem['parentName']
            };
            return {...state, ...action.payload, organizationInfo, editorVisible: false};
        },
        createFailed(state, action){
            const errorMessage = action.errorMessage;
            return {...state, errorMessage};
        },
        modifySuccess(state, action){
            const data = action.payload;
            const currentItem = {...data};
            const organizationInfo = {
                code: data['code'],
                name: data['name'],
                balance: data['balance'],
                parentName: data['parentName']
            };
            return {...state, currentItem, organizationInfo, editorVisible: false, editorType: 'create'};
        },
        getOrganizationTreeNodesSuccess(state, action){
            return {...state, treeGridNodes: action.treeGridNodes, currentItem: null};
        },
        getTreeNodeSuccess(state, action){
            const data = action.currentItem;
            const currentItem = {...data};
            const organizationInfo = {
                code: data['code'],
                name: data['name'],
                balance: data['balance'],
                parentName: data['parentName']
            };
            return {...state, currentItem, organizationInfo, disabled: false};
        },
        resetErrorMessage(state, action){
            return {...state, errorMessage:''};
        },
        rechargeSuccess(state, action){
            const rechargeData = action.rechargeData;
            const currentItem = state.currentItem;
            const newCurrentItem = {...currentItem, balance: rechargeData.rechargeInBalance};
            const treeGridNodes = state.treeGridNodes;
            const rechargeOutType = rechargeData.rechargeOutType;
            const updateTreeNodes = (treeNodes)=>{
                treeNodes.map((node)=>{
                    if(node.id==rechargeData.rechargeOutId){
                        node.balance = rechargeData.rechargeOutBalance;
                    } else {
                        if(node.children.length>0){
                            updateTreeNodes(node.children);
                        }
                    }
                });
            };
            /*
            * 如果转出账户的类型是组织
            * 对组织列表的数据进行迭代更新
            * */
            if(rechargeOutType==0){
                updateTreeNodes(treeGridNodes);
            }
            return {...state, treeGridNodes: treeGridNodes, currentItem: newCurrentItem};
        }
    },

};
