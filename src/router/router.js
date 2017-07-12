import React from 'react';
import {Router, Route, IndexRedirect, Redirect} from 'dva/router';
import IndexPage from '../routes/IndexPage/IndexPage';
import HomePage from '../routes/HomePage/HomePage';
import Login from '../routes/Login/Login';
import DealerOrganization from '../routes/DealerOrganization/DealerOrganization';
import SubDealer from '../routes/SubDealer/SubDealer';
import NewSubscriberActive from '../routes/NewSubscriberActive/NewSubscriberActive';
import CustomerService from '../routes/CustomerService/CustomerService';
import CardSale from '../routes/CardSale/CardSale';
import BalanceChange from '../routes/BalanceChange/BalanceChange';
import BalanceSale from '../routes/BalanceSale/BalanceSale';
import ActivationSubscriber from '../routes/ActivationSubscriber/ActivationSubscriber';
import NotFoundPage from '../routes/NotFoundPage/NotFoundPage';

function RouterConfig({history}) {
    return (
        <Router history={history}>
            <Route path='/' component={IndexPage}>
                <IndexRedirect to="/login"/>
                <Route path='/login' component={Login}/>
                <Route path='/home' component={HomePage}/>
                <Route component={HomePage}>
                    <Route path='/dealerOrganization' component={DealerOrganization}/>
                    <Route path='/subDealer' component={SubDealer}/>
                    <Route path='/newSubscriberActive' component={NewSubscriberActive}/>
                    <Route path='/customerService' component={CustomerService}/>
                    <Route path='/cardSale' component={CardSale}/>
                    <Route path='/balanceChange' component={BalanceChange}/>
                    <Route path='/balanceSale' component={BalanceSale}/>
                    <Route path='/activationSubscriber' component={ActivationSubscriber}/>
                </Route>
                <Route path="/*" component={NotFoundPage}/>
            </Route>
        </Router>
    );
}

export default RouterConfig;
