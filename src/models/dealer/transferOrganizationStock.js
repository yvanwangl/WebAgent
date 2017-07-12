import {
    getOrganizationTree,
    transferStock,
    getStockListByOrganizationId
} from '../../services/dealer/organizationStock';
export default {

    namespace: 'transferOrganizationStock',

    state: {
        stockList: [],
        editorVisible: false,
        transferStockSuccess: false,
        organizationTreeNodes: []
    },

    subscriptions: {
        setup({dispatch, history}) {  // eslint-disable-line
        },
    },

    effects: {
        *showTransferEditor({payload}, {call, put, select}){
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
        *transferStock({payload}, {call, put, select}){
            const {data} = yield call(transferStock, payload);
            if (data && data.success) {
                yield put({
                    type: 'transferSuccess',
                    payload: data.data
                });
            }
        },
        *organizationTreeSelect({payload}, {call, put, select}){
            const selectOrganizationId = payload.selectOrganizationId;
            const {data} = yield call(getStockListByOrganizationId, {organizationId: selectOrganizationId});
            if (data && data.success) {
                const stockList = yield select(({organizationStock}) => organizationStock.stockList);
                const sourceStockList = data.data;
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
        },
    },

    reducers: {
        showEditor(state, action){
            return {...state, ...action.payload, editorVisible: true};
        },
        hideEditor(state, action){
            return {...state, editorVisible: false};
        },
        transferSuccess(state, action){
            return {...state, transferStockSuccess: true};
        },
        hideTransferSuccessModal(state, action){
            return {...state, editorVisible: false, transferStockSuccess: false};
        },
        getSourceStockSuccess(state, action){
            const oldStockList = action.payload.stockList;
            const sourceStockList = action.payload.sourceStockList;
            const oldStockResourceSpecClassIds = oldStockList.map(stock=> stock.resourceSpecClassId);
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
