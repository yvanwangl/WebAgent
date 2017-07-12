/**
 * Created by wyf on 2017/3/30.
 */
import React, {Component, PropTypes} from 'react';
import {Modal, Icon, Button} from 'antd';
import {injectIntl, FormattedMessage} from 'react-intl';
import messages from './messages';
import styles from './index.css';

const modalAlertProps = {
    type: PropTypes.string.isRequired,
    title: PropTypes.any.isRequired,
    content: PropTypes.any.isRequired,
    onOk: PropTypes.func.isRequired,
};

function ModalAlert({
    title,
    content,
    onOk,
    type
}) {

    const IconGen = ()=>{
        switch (type){
            case 'success':
                return <Icon type="check-circle" className={styles.successIcon}/>;
                break;
            case 'info':
                return <Icon type="info-circle" className={styles.infoIcon}/>;
                break;
            case 'error':
                return <Icon type="close-circle" className={styles.errorIcon}/>;
                break;
            case 'warning':
                return <Icon type="exclamation-circle" className={styles.warningIcon}/>;
                break;
            default:
                return <Icon type="info-circle" className={styles.infoIcon}/>;
                break;
        }
    };

    return (
        <Modal
            onOk={onOk}
            visible={true}
            closable={false}
            footer={null}
            className={styles.modalAlert}
        >
            <div className='clearfix'>
                <div className={styles.title}>
                    <IconGen />
                    <span>{title}</span>
                </div>
                <div className={styles.content}>
                    {
                        content
                    }
                </div>
                <Button type='primary' onClick={onOk}>
                    <FormattedMessage {...messages.onOkText}/>
                </Button>
            </div>
        </Modal>
    );
}

ModalAlert.propTypes = modalAlertProps;

export default ModalAlert;

