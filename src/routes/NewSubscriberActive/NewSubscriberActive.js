import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {message} from 'antd';
import {injectIntl, FormattedMessage} from 'react-intl';
import BreadcrumbList from '../../components/Common/BreadcrumbList/BreadcrumbList';
import NewSubscriberActiveForm from '../../components/Customer/NewSubscriberActive/NewSubscriberActiveForm/NewSubscriberActiveForm';
import messages from './messages';
import {subscriberActiveContent} from './index.css';

const newSubscriberActivePropTypes = {
    //c: PropTypes.object.isRequired
};

/*面包屑导航列表*/
const breadcrumbItems = [
    <FormattedMessage {...messages.customer}/>,
    <FormattedMessage {...messages.title}/>
];

function NewSubscriberActive({intl}) {
    return (
        <div className={subscriberActiveContent}>
            {/*<ContentTitle>
                <FormattedMessage {...messages.title}/>
            </ContentTitle>*/}
            <BreadcrumbList breadcrumbItems={breadcrumbItems}/>
            <div className='infoContainer'>
                <NewSubscriberActiveForm />
            </div>
        </div>
    );
}

NewSubscriberActive.propTypes = newSubscriberActivePropTypes;

export default injectIntl(NewSubscriberActive);