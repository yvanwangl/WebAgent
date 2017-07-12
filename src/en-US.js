/**
 * Created by wyf on 2017/2/27.
 */
import antdEn from 'antd/lib/locale-provider/en_US';
import appLocaleData from 'react-intl/locale-data/en';
import enMessages from '../locales/en-US.messages';

//noinspection JSAnnotator
window.appLocale = {
  messages: {
    ...enMessages,
  },
  antd: antdEn,
  locale: 'en-US',
  data: appLocaleData,
};
