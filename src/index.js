import dva from 'dva';
import './index.less';
import {browserHistory} from 'dva/router';
import {LocaleProvider} from 'antd';
import {addLocaleData, IntlProvider} from 'react-intl';
import createLoading from 'dva-loading';
import ReactDOM from 'react-dom';

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/login'));
app.model(require('./models/modifyPass'));
app.model(require('./models/dealer/dealerOrganization'));
app.model(require('./models/dealer/organizationStock'));
app.model(require('./models/dealer/modifyOrganizationStock'));
app.model(require('./models/dealer/transferOrganizationStock'));
app.model(require('./models/dealer/organizationStaff'));
app.model(require('./models/dealer/recharge'));
app.model(require('./models/dealer/subDealer'));
app.model(require('./models/dealer/subDealerSaleStock'));
app.model(require('./models/dealer/subDealerReturnStock'));
app.model(require('./models/customer/newSubscriberActive'));
app.model(require('./models/customer/customerService'));
app.model(require('./models/customer/customerServiceRecharge'));
app.model(require('./models/customer/customerServiceChangeBouquet'));
app.model(require('./models/customer/customerServiceChangeCard'));
app.model(require('./models/customer/customerServiceRefreshAuth'));
app.model(require('./models/customer/customerServiceCustomer'));
app.model(require('./models/customer/cardSale'));
app.model(require('./models/report/activationSubscriber'));
app.model(require('./models/report/balanceChange'));
app.model(require('./models/report/balanceSale'));

// 4. Router
app.router(require('./router/router'));

// 5. Start
const App = app.start();

//il8n
const appLocale = window.appLocale;
addLocaleData(appLocale.data);
ReactDOM.render(
    <LocaleProvider locale={appLocale.antd}>
        <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
            <App />
        </IntlProvider>
    </LocaleProvider>,
    document.getElementById("root")
);
