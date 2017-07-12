import {getOrganizationTree, saleStock, getStockListByOrganizationId} from '../../services/dealer/subDealer';
export default {

    namespace: 'subDealerSaleStock',

    state: {
        stockList: [],
        editorVisible: false,
        saleStockSuccess: false,
        organizationTreeNodes: []
    },

    subscriptions: {
        setup({dispatch, history}) {  // eslint-disable-line
        },
    },

    effects: {
        *showSaleEditor({payload}, {call, put, select}){
            const {data} = yield call(getOrganizationTree);
            if (data && data.success) {
                yield put({
                    type: 'showEditor',
                    payload: {
                        organizationTreeNodes: [data.data]
                    }
                });
            }
        },
        *saleStock({payload}, {call, put, select}){
            const {data} = yield call(saleStock, payload);
            if (data && data.success) {
                yield put({
                    type: 'saleSuccess',
                    payload: data.data
                });
            }
        },
        *organizationTreeSelect({payload}, {call, put, select}){
            const selectOrganizationId = payload.selectOrganizationId;
            const {data} = yield call(getStockListByOrganizationId, {organizationId: selectOrganizationId});
            if (data && data.success) {
                const sourceStockList = data.data;
                const stockList = yield select(({subDealer}) => subDealer.stockList);
                yield put({
                    type: 'getSourceStockSuccess',
                    payload: {
                        stockList,
                        sourceStockList
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
            /*const stockList = action.payload.stockList;
             const newStockList = stockList.map(stock=> {
             stock.changeNumber = 0;
             return stock;
             });*/
            return {...state, ...action.payload, editorVisible: true};
        },
        hideEditor(state, action){
            return {...state, editorVisible: false};
        },
        saleSuccess(state, action){
            return {...state, saleStockSuccess: true};
        },
        hideSaleSuccessModal(state, action){
            return {...state, editorVisible: false, saleStockSuccess: false};
        },
        getSourceStockSuccess(state, action){
            const oldStockList = action.payload.stockList;
            const sourceStockList = action.payload.sourceStockList;
            /*获取旧的仓库列表标识集合*/
            const oldStockResourceSpecClassIds = oldStockList.map(oldStock => oldStock.resourceSpecClassId);
            /*优先检索源数据列表*/
            let newStockList = sourceStockList
                .filter(stock => stock.resourceNumber > 0)
                .map(stock => {
                    const newStock = {...stock};
                    const index = oldStockResourceSpecClassIds.indexOf(newStock.resourceSpecClassId);
                    newStock.sourceResourceNumber = newStock.resourceNumber;
                    if (index > -1) {
                        newStock.resourceNumber = oldStockList[index].resourceNumber;
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
            return {...state, stockList: oldStockList};
        },
    },

};
