import {modifyStock} from '../../services/dealer/organizationStock';
export default {

    namespace: 'modifyOrganizationStock',

    state: {
        stockList:[],
        editorVisible: false,
        modifyStockSuccess: false
    },

    subscriptions: {
        setup({dispatch, history}) {  // eslint-disable-line
        },
    },

    effects: {
        *showModifyEditor({payload}, {call, put, select}){
            const stockList = yield select(({organizationStock}) => organizationStock.stockList);
            yield put({
                type: 'showEditor',
                payload: {
                    stockList
                }
            });
        },
        *modifyStock({payload}, {call, put, select}){
            const {data} = yield call(modifyStock, payload);
            if(data && data.success){
                yield put({
                    type:'modifySuccess',
                    payload: data.data
                });
            }
        }
    },

    reducers: {
        showEditor(state, action){
            const stockList = action.payload.stockList;
            const newStockList = stockList.map(stock=> {
                stock.currentResourceNumber=stock.resourceNumber;
                stock.changeNumber = 0;
                return stock;
            });
            return {...state, stockList: newStockList, editorVisible:true};
        },
        hideEditor(state, action){
            return {...state, editorVisible: false};
        },
        modifySuccess(state, action){
            return {...state, modifyStockSuccess: true};
        },
        hideModifySuccessModal(state, action){
            return {...state, editorVisible:false, modifyStockSuccess: false};
        },
    },

};
