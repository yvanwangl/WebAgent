import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Radio} from 'antd';
import styles from './index.css';

const RadioGroup = Radio.Group;

const productBouquetPropTypes = {
    products: PropTypes.array.isRequired
};
function ProductBouquet({products}) {
    return (
        <RadioGroup>
            {
                products.map((product, index) =>
                    <Radio value={product.code} key={index} style={{display: 'block'}}>
                        {product.externalName}
                        <Popover placement="right" content={product.description}>
                            <Icon type="question-circle-o" style={{marginLeft: 6}}/>
                        </Popover>
                    </Radio>
                )
            }
        </RadioGroup>
    );
}

ProductBouquet.propTypes = productBouquetPropTypes;

export default injectIntl(ProductBouquet);