import React, {Component, PropTypes} from 'react';
import styles from './index.css';

const contentTitlePropTypes = {
    children: PropTypes.any.isRequired
};

function ContentTitle({children}) {
    return (
        <div className='contentTitle'>
            <h2>
                {children}
            </h2>
        </div>

    );
}

ContentTitle.propTypes = contentTitlePropTypes;

export default ContentTitle;