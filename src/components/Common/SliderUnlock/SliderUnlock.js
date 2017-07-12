import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import slideunlock from './jquery.slideunlock';
import $ from 'jquery';
import styles from './index.css';

const sliderUnlockPropTypes = {
    intl: PropTypes.object.isRequired
};
class SliderUnlock extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        let slider = new slideunlock("#slider", {successLabelTip:'Verification Success'},()=>console.log('success'));
        slider.init();
    }

    render(){
        return (
            <div id="slider" className={styles.slider}>
                <div id="slider_bg" className={styles.slider_bg}></div>
                <span id="label"
                      className={`${styles.label} fa fa-angle-double-right fa-2x`}
                      aria-hidden="true"></span>
                <span id="labelTip" className={styles.labelTip}>Please Drag To Right</span>
            </div>
        );
    }
}

SliderUnlock.propTypes = sliderUnlockPropTypes;

export default injectIntl(SliderUnlock, {
    withRef: true,
});