import moment from 'moment';

const { formSign, pay } = require('./');

describe('alipay trade wap pay', () => {
  describe('#formSign', () => {
    const appId = '2016091700532238';
    const bizContent = {
      subject: 'alipay trade wap pay test',
      out_trade_no: '2088102176035382',
      total_amount: 9.0,
      quit_url: 'https://github.com/mrduin',
      product_code: 'QUICK_WAP_WAY',
    };
    const qs = {
      app_id: appId,
      method: 'alipay.trade.wap.pay',
      charset: 'utf-8',
      sign_type: 'RSA2',
      timestamp: moment().format('yyyy-MM-dd HH:mm:ss'),
      version: '1.0',
      biz_content: JSON.stringify(bizContent),
    };

    it('should form sign correctly', () => {
      const actual = formSign(qs);
      console.log(actual);
    });

    it('should send pay request', async () => {
      const actual = await pay();
      console.log(actual);
    }, 10000);
  });
});
