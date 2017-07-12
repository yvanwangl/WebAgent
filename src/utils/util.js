/**
 * Created by wyf on 2017/3/2.
 */
import numeral from 'numeral';

/*日期格式化工具方法*/
function dateFormat(date) {
    let year = date.getFullYear();
    let month = `0${date.getMonth()+1}`.substr(-2);
    let day = `0${date.getDate()}`.substr(-2);
    return `${year}-${month}-${day}`;
}

/*时间格式化工具方法*/
function timeFormat(date) {
    return `${date.getHours()}:${date.getMinutes()}`;
}

function numberFormat(number, precision=2) {
    return numeral(number).format('0,0');
}

/*国际化格式化工具*/
function messageFormat(intl, messages) {
    return (message)=> intl.formatMessage(messages[message]);
}

export default {
    dateFormat,
    timeFormat,
    numberFormat,
    messageFormat
};
