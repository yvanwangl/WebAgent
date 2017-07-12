import React, {PropTypes} from 'react';
import {Link} from 'dva/router';
import styles from './index.css';

const navLinkPropTypes = {
    target: PropTypes.string,
    linkText: PropTypes.string,
    children: PropTypes.any
};

function NavLink({target, linkText, children}) {
    return (
        <Link to={target}>{linkText || children}</Link>
    );
}

NavLink.propTypes = navLinkPropTypes;

export default NavLink;
