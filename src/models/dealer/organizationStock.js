import {getTotalStockList, getStockListByOrganizationId} from '../../services/dealer/organizationStock';
export default {

    namespace: 'organizationStock',

    state: {
        allStockList: [],
        stockList: [],
        disabled: true
    },

    subscriptions: {
        setup({dispatch, history}) {  // eslint-disable-line
            history.listen(location=> {
                if(location.pathname=='/dealerOrganization'){
                    dispatch({
                        type:'getTotalStockList'
                    });
                }
            })
        },
    },

    effects: {
        *getTotalStockList({payload}, {call, put, select}){
            const {data} = yield call(getTotalStockList);
            if(data && data.success){
                yield put({
                    type: 'getTotalStockListSuccess',
                    allStockList: data.data
                });
            }
        },
        *nodeSelect({payload}, {call, put, select}){
            yield put({
                type: 'organizationSelected'
            });
            const {data} = yield call(getStockListByOrganizationId, {organizationId: payload.selectKey});
            if(data && data.success){
                yield put({
                    type:'getStockListSuccess',
                    payload: {
                        stockList: data.data
                    }
                });
            }
        }
    },

    reducers: {
        organizationSelected(state, action){
            return {...state, disabled:false};
        },
        getTotalStockListSuccess(state, action){
            return {...state, allStockList: action.allStockList, };
        },
        getStockListSuccess(state, action){
            const newStockList = action.payload.stockList;
            let allStockList = state.allStockList;
            /*组织仓库资源规格标识集合*/
            const newStockResourceSpecClassIds = newStockList.map(newStock=> newStock.resourceSpecClassId);
            allStockList.map(stock=> {
                stock['id'] = stock['resourceSpecClassId'];
               if(newStockResourceSpecClassIds.indexOf(stock.resourceSpecClassId)>-1) {
                   const newStock = newStockList.filter(newStockItem=> newStockItem.resourceSpecClassId==stock.resourceSpecClassId)[0];
                   stock['resourceNumber'] = newStock['resourceNumber'];
               }else {
                   stock['resourceNumber'] = 0;
               }
            });

            return {...state, stockList: allStockList};
        }
    },

};
