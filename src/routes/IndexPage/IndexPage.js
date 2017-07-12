import React, {PropTypes} from 'react';
import styles from './index.css';

const indexPagePropTypes = {
    children: PropTypes.object.isRequired
};

function IndexPage({children}) {
    return (
        <div className={styles.normal}>
            {children}
        </div>
    );
}

IndexPage.propTypes = indexPagePropTypes;

export default IndexPage;
