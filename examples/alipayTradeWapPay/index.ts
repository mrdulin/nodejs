import rp from 'request-promise';
import { CoreOptions } from 'request';
import moment from 'moment';
import queryString from 'query-string';
import crypto from 'crypto';
import express from 'express';
import cors from 'cors';
import AlipaySdk from 'alipay-sdk';

import AlipayFormData from 'alipay-sdk/lib/form';

const app = express();

const gateway = 'https://openapi.alipaydev.com/gateway.do';
const appId = '2016091700532238';
const rsaPrivateKey = `
MIIEpAIBAAKCAQEApPFyfKhWx1ebzNJZLXjXRBMuy5YEdbK/Ju5N0C/MXpKO8uIj91wUmsw1jN8Decn+5vRHB/2wsEX3cUnNQbPHRv1lTWaV5Q4Vs+Hq3KkToTovM9npH5eJergPkPTPUgYl38QxmHmqje0OOEud042V/fY0Z18nFLQ6kNGla5Xu8OsyU8rQoRx5x0M9j9eBcYeMMhbHH273gguHZMQ9ss9BNoUgf7vIWeC94DijWiqo8uZPK8pUB/oBpxlhtts56sA9UrPj18YvwNfBxy0LU3jmMiP7P2gy9mfv9h4a1ctVRLXHBzo9KH7AHcm9f1NK1ZcbNiVvlxOaHHvFrk01nmD3nQIDAQABAoIBAQCakkof2AG6vbcbsuQvYNcazH9F+kgjpGbOLPRu7NwwpFeh9ZqO7JPCnSxx32x6bXmbJcCLFIrIJklEuUzJDZjqRfzxE/nUteZQtJ5MO4ZRyR0DEmsNWA1WG7c6uLCwxWIo2MtBgIL8jfKNfw9geYbegCOL2/fbxyo7HLxQnilVSxKnoGnRUGlZaW3cLsor5gl0a5z6HKk9M+ZtJ00qTL7w1c8d9UmnpunWBRWyFp7iVr7+R4IYybpNoyFABxFgThp77jT/H1j8XEml4yowTXxdd83z2SKWOQFao5dtBHkHoT84OMjq63pv8B5gGju1wqaDlyaRqIlJOVnFkVe9LhcBAoGBANCeom7t9QwZi+aaJmKPXfDi1QXtu5+S4Xyr86bKjAvb6cWS9Avp6p5uQZ5jKkw6slLcNBlQmsShqIaRmZYFEp4aimy5QsP0NiImBuhG7OhreTfZGj9TfpkU0oQ8jn4QSniAr002jJGbA10pzODcIYs3CgNWPeuIAkAVxRidM85lAoGBAMpnaiJ3ycffdRVgnUDJFc9aX5gFV9O90tN2boIXrE+bi7dHVKBFvhhBUSwmd/i1tkOmsZrrV9KVEwYmMFPeWBw59bU4o4h+vuBpkumUKvegxKi9m+wJPIpRfDLbafdmdmp2tAPndPokj4/aCnul5mwOdMg4Ggebf/H521LdeLTZAoGBAJby8Z1KWJDUu0G0MCoIinSN7I1JowSnhrhqwvXggMzj5paq6iLksnrIVHqCTkyx++2wn5HhnNrCDeqw12yRZxM3KQnaUtDul2zGDyFqkGjrut4KHM/NXkDtrBU6q+/TYc8nbbB00+lXPGvgnvnkzfCpdnlLoaoW02oDVoWk2aNxAoGADJQ6w2OgdbyMgUSc4U7d/SIHuOH0IGO2u4+rtIgWHGh1WXGkb8WF1+oPSmglop5gcnnkpdUkgyDiqsoqzLuPzElJ3PZlK3F9GWNWTw/3T6Z9MmN+UkAMtCf2SQ7b2hVTHLC95VQ4L+efyHfrmN2poWOQnHToITrny7kUiWTcQJkCgYB5VM4/oAzy+e4KJwv7zdWyLNR8O+3jWzh6yy/mM6CGxiz9Pr+7jOxcFAi/r5HkBl1/eoZJL6CF5Oyvir+D6BmymqHcliWZqJd3h/Z1LimfNP8DvxXZf7GUUcWqfBNYzFhJoqD43QlVkw5amOEoh3LQTJptSl25MCmMkGEPWhzQlA==
`;
const alipayrsaPublicKey =
  'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApPFyfKhWx1ebzNJZLXjXRBMuy5YEdbK/Ju5N0C/MXpKO8uIj91wUmsw1jN8Decn+5vRHB/2wsEX3cUnNQbPHRv1lTWaV5Q4Vs+Hq3KkToTovM9npH5eJergPkPTPUgYl38QxmHmqje0OOEud042V/fY0Z18nFLQ6kNGla5Xu8OsyU8rQoRx5x0M9j9eBcYeMMhbHH273gguHZMQ9ss9BNoUgf7vIWeC94DijWiqo8uZPK8pUB/oBpxlhtts56sA9UrPj18YvwNfBxy0LU3jmMiP7P2gy9mfv9h4a1ctVRLXHBzo9KH7AHcm9f1NK1ZcbNiVvlxOaHHvFrk01nmD3nQIDAQAB';

const a = `
https://openapi.alipay.com/gateway.do?
timestamp=2013-01-01 08:08:08&
method=alipay.trade.wap.pay&
app_id=15965&
sign_type=RSA2&
sign=ERITJKEIJKJHKKKKKKKHJEREEEEEEEEEEE&
version=1.0&
charset=GBK&
biz_content={"time_expire":"2016-12-31 10:05","extend_params":{"sys_service_provider_id":"2088511833207846","hb_fq_seller_percent":"100","hb_fq_num":"3","industry_reflux_info":"{\\"scene_code\\":\\"metro_tradeorder\\",\\"channel\\":\\"xxxx\\",\\"scene_data\\":{\\"asset_name\\":\\"ALIPAY\\"}}","card_type":"S0JP0000"},"settle_info":{"settle_detail_infos":[{"amount":0.1,"trans_in":"A0001","settle_entity_type":"SecondMerchant??Store","summary_dimension":"A0001","settle_entity_id":"2088xxxxx;ST_0001","trans_in_type":"cardAliasNo"}]},"subject":"?????","body":"Iphone6 16G","product_code":"QUICK_WAP_WAY","merchant_order_no":"20161008001","sub_merchant":{"merchant_id":"19023454","merchant_type":"alipay: ???????????????????, merchant: ???????????????"},"invoice_info":{"key_info":{"tax_num":"1464888883494","is_support_invoice":true,"invoice_merchant_name":"ABC|003"},"details":"[{"code":"100294400","name":"????","num":"2","sumPrice":"200.00","taxRate":"6%"}]"},"ext_user_info":{"cert_type":"IDENTITY_CARD","cert_no":"362334768769238881","name":"????","mobile":"16587658765","fix_buyer":"F","min_age":"18","need_check_info":"F"},"timeout_express":"90m","disable_pay_channels":"pcredit,moneyFund,debitCardExpress","seller_id":"2088102147948060","royalty_info":{"royalty_type":"ROYALTY","royalty_detail_infos":[{"out_relation_id":"20131124001","amount_percentage":"100","amount":0.1,"batch_no":"123","trans_in":"2088101126708402","trans_out_type":"userId","trans_out":"2088101126765726","serial_no":1,"trans_in_type":"userId","desc":"???????1"}]},"store_id":"NJ_001","quit_url":"http://www.taobao.com/product/113714.html","passback_params":"merchantBizType%3d3C%26merchantBizNo%3d2016010101111","specified_channel":"pcredit","enable_pay_channels":"pcredit,moneyFund,debitCardExpress","out_trade_no":"70501111111S001111119","total_amount":9.00,"business_params":"{"data":"123"}","goods_type":"0","auth_token":"appopenBb64d181d0146481ab6a762c00714cC27","promo_params":"{"storeIdType":"1"}"}
`;

const ALIPAY_ALGORITHM_MAPPING = {
  RSA: 'RSA-SHA1',
  RSA2: 'RSA-SHA256',
};

const alipaySdk = new AlipaySdk({
  gateway,
  appId,
  privateKey: rsaPrivateKey,
});

function formSign(qs): string {
  const str = queryString.stringify(qs, { skipNull: true });
  // const sign = crypto
  //   .createSign(ALIPAY_ALGORITHM_MAPPING[qs.sign_type])
  //   .update(str, 'utf8')
  //   .sign(rsaPrivateKey, 'base64');

  return str;
}

function pay() {
  const bizContent = {
    subject: 'alipay trade wap pay test',
    out_trade_no: '2088102176035382',
    total_amount: '9.0',
    quit_url: 'https://github.com/mrduin',
    product_code: 'QUICK_WAP_WAY',
  };
  const qs = {
    app_id: appId,
    method: 'alipay.trade.wap.pay',
    charset: 'utf-8',
    sign_type: 'RSA2',
    timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
    version: '1.0',
    biz_content: JSON.stringify(bizContent),
    sign: '',
  };
  qs.sign =
    'Fug4FF8ticSyKAmyP5dhBjBi8PtNC+Xqt+ldcArEwo8AWatZSvCCyGEIy+YDOyOSp0buo+NyJD4dBtl4lGa5LRfDtLVc5h0CkA7af2hyrkus/i02sfJnKomr8LfQgzvi0/n089j4zJgD7JX2P7qiSwVjSnjGJQRIprrHy1msV0c9UIIHeUZDILGWh8Rt9tcNyXriL1nrGgict1BPTgMoTVcQG0VKDluSD5x0C0Uw38fxeHUL07lw6wHMgllOrcN2sv7xa57kKHh5LtQsm7+pj7To+nM3C6+uxa8WzUD5W3EjbPRKLKYLltvQDq2gabUrMMspTU8wdxfLIlGnwLQU/Q==';
  // exports.formSign(options.qs);
  const options: CoreOptions = { qs };
  console.log(qs);
  return rp.post(gateway, options);
}

app.use(cors());

app.get('/', (req, res) => {
  const html = `
    <a href='/pay'>Pay</a>
  `;
  res.send(html);
});

app.get('/pay', async (req, res) => {
  const formData = new AlipayFormData();

  formData.addField('notifyUrl', 'http://www.com/notify');
  formData.addField('bizContent', {
    outTradeNo: 'out_trade_no',
    productCode: 'FAST_INSTANT_TRADE_PAY',
    totalAmount: '0.01',
    subject: '商品',
    body: '商品详情',
  });

  const result = await alipaySdk.exec('alipay.trade.page.pay', {}, { formData: formData });

  // result 为 form 表单
  console.log(result);
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write(result);
});

const PORT = 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Http server is listening on http://localhost:${PORT}`);
  });
}

exports.formSign = formSign;
exports.pay = pay;
