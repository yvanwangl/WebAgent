import {defineMessages} from 'react-intl';

const messages = defineMessages({
    errorTitle: {
        id: 'util.errorMessages.errorTitle',
        defaultMessage: '错误提示'
    },
    errorCodeNull: {
        id: 'util.errorMessages.errorCodeNull',
        defaultMessage: '国际化信息丢失'
    },
    'unknown.authentication.exception': {
        id: 'unknown.authentication.exception',
        defaultMessage: '未知授权异常'
    },
    'username.and.password.authentication.exception': {
        id: 'username.and.password.authentication.exception',
        defaultMessage: '用户名或密码错误'
    },
    'invalid.period.authentication.exception': {
        id: 'invalid.period.authentication.exception',
        defaultMessage: '授权已过期，请重新登录'
    },
    'no.authentication.service': {
        id: 'no.authentication.service',
        defaultMessage: '非授权的服务'
    },
    'the.channel.of.partner.should.not.be.null': {
        id: 'the.channel.of.partner.should.not.be.null',
        defaultMessage: '合作伙伴渠道不能为空'
    },
    'session.persistence.authentication.exception': {
        id: 'session.persistence.authentication.exception',
        defaultMessage: '回话持久化异常'
    },
    'root.organization.is.null': {
        id: 'root.organization.is.null',
        defaultMessage: '根组织不能为空'
    },
    'the.pin.is.not.correct': {
        id: 'the.pin.is.not.correct',
        defaultMessage: '支付密码不正确'
    },
    'partnerdomain.exists.same.name.partnerOrganization': {
        id: 'partnerdomain.exists.same.name.partnerOrganization',
        defaultMessage: '存在同名的合作伙伴组织'
    },
    'user.password.is.error': {
        id: 'user.password.is.error',
        defaultMessage: '旧密码不正确'
    },
    'must.contain.num.and.letter': {
        id: 'must.contain.num.and.letter',
        defaultMessage: '新密码必须由数字和字母组成'
    },
    'newPassword.length.is.not.enough': {
        id: 'newPassword.length.is.not.enough',
        defaultMessage: '新密码长度不正确'
    },
    'partner.staff.pay.password.should.not.be.same.with.old': {
        id: 'partner.staff.pay.password.should.not.be.same.with.old',
        defaultMessage: '新密码不能与旧密码相同'
    },
    'partner.staff.pay.password.error': {
        id: 'partner.staff.pay.password.error',
        defaultMessage: '支付密码不正确'
    },
    'partner.staff.newPassword.length.is.not.enough': {
        id: 'partner.staff.newPassword.length.is.not.enough',
        defaultMessage: '新密码长度不正确'
    }
});

/*const messages = {
    errorTitle: 'Error Message',
    errorCodeNull: 'Internationalized Information Is Lost',
    'unknown.authentication.exception': 'Unknown Authentication Exception',
    'username.and.password.authentication.exception': 'Username And Password Authentication Exception',
    'invalid.period.authentication.exception': 'Invalid Period.authentication.exception',
}*/

export default messages;