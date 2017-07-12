import {getOrganizationTree, returnStock, getStockListByOrganizationId} from '../../services/dealer/subDealer';
export default {

    namespace: 'subDealerReturnStock',

    state: {
        stockList:[],
        editorVisible: false,
        returnStockSuccess: false,
        organizationTreeNodes: []
    },

    subscriptions: {
        setup({dispatch, history}) {  // eslint-disable-line
        },
    },

    effects: {
        *showReturnEditor({payload}, {call, put, select}){
            const {data} = yield call(getOrganizationTree);
            if(data && data.success){
                yield put({
                    type: 'showEditor',
                    payload: {
                        organizationTreeNodes:[data.data]
                    }
                });
            }
        },
        *returnStock({payload}, {call, put, select}){
            const {data} = yield call(returnStock, payload);
            if(data && data.success){
                yield put({
                    type:'returnSuccess',
                    payload: data.data
                });
            }
        },
        *organizationTreeSelect({payload}, {call, put, select}){
            const selectOrganizationId = payload.selectOrganizationId;
            const {data} = yield call(getStockListByOrganizationId, {organizationId: selectOrganizationId});
            if(data && data.success) {
                const targetStockList = data.data;
                const stockList = yield select(({subDealer}) => subDealer.stockList);
                yield put({
                    type: 'getTargetStockSuccess',
                    payload: {
                        stockList,
                        targetStockList
                    }
                });
            }
        },
        *resetStockList({payload}, {call, put, select}){
            const stockList = yield select(({subDealer}) => subDealer.stockList);
            yield put({
                type: 'doResetStockList',
                payload: {
                    stockList
                }
            });
        }
    },

    reducers: {
        showEditor(state, action){
            return {...state, ...action.payload, editorVisible:true};
        },
        hideEditor(state, action){
            return {...state, editorVisible: false};
        },
        returnSuccess(state, action){
            return {...state, returnStockSuccess: true};
        },
        hideReturnSuccessModal(state, action){
            return {...state, editorVisible:false, returnStockSuccess: false};
        },
        getTargetStockSuccess(state, action){
            const oldStockList = action.payload.stockList;
            const targetStockList = action.payload.targetStockList;
            /*获取旧的仓库列表标识集合*/
            const targetStockResourceSpecClassIds = targetStockList.map(targetStock => targetStock.resourceSpecClassId);
            /*优先检索源数据列表*/
            let newStockList = oldStockList
                .filter(stock => stock.resourceNumber > 0)
                .map(stock => {
                    const newStock = {...stock};
                    const index = targetStockResourceSpecClassIds.indexOf(newStock.resourceSpecClassId);
                    newStock.sourceResourceNumber = newStock.resourceNumber;
                    if (index > -1) {
                        newStock.resourceNumber = targetStockList[index].resourceNumber;
                    } else {
                        newStock.resourceNumber = 0;
                    }
                    newStock.changeNumber = 0;
                    return newStock;
                });

            return {...state, stockList: newStockList};
        },
        doResetStockList(state, action){
            const oldStockList = action.payload.stockList;
            return {...state, stockList:oldStockList };
        },
    },

};
