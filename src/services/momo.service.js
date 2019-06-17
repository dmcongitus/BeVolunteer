import Axios from "axios";
const uuidv1 = require("uuid/v1");
const https = require("https");
//parameters send to MoMo get get payUrl
var endpoint = "https://test-payment.momo.vn/gw_payment/transactionProcessor";
var hostname = "https://test-payment.momo.vn";
var path = "/gw_payment/transactionProcessor";
var partnerCode = "MOMO";
var accessKey = "F8BBA842ECF85";
var serectkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
var orderInfo = "pay with MoMo";
var returnUrl = "https://momo.vn/return";
var notifyurl = "https://callback.url/notify";
var amount = "1000";
var orderId = uuidv1();
var requestId = uuidv1();
var requestType = "captureMoMoWallet";
var extraData = "merchantName=;merchantId="; //pass empty value if your merchant does not have stores else merchantName=[storeName]; merchantId=[storeId] to identify a transaction map with a physical store

//before sign HMAC SHA256 with format
//partnerCode=$partnerCode&accessKey=$accessKey&requestId=$requestId&amount=$amount&orderId=$oderId&orderInfo=$orderInfo&returnUrl=$returnUrl&notifyUrl=$notifyUrl&extraData=$extraData

//json object send to MoMo endpoint

//Create the HTTPS objects

//Send the request and get the response

export async function donateEvent(amountDonate, callback) {
  console.log("Sending....");
  var rawSignature =
    (await "partnerCode=") +
    partnerCode +
    "&accessKey=" +
    accessKey +
    "&requestId=" +
    requestId +
    "&amount=" +
    amountDonate +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&returnUrl=" +
    returnUrl +
    "&notifyUrl=" +
    notifyurl +
    "&extraData=" +
    extraData;
  //puts raw signature
  // console.log("--------------------RAW SIGNATURE----------------");
  // console.log(rawSignature);
  //signature
  const crypto = require("crypto");
  var signature = await crypto
    .createHmac("sha256", serectkey)
    .update(rawSignature)
    .digest("hex");
  // console.log("--------------------SIGNATURE----------------");
  // console.log(signature);
  var body = await JSON.stringify({
    partnerCode: partnerCode,
    accessKey: accessKey,
    requestId: requestId,
    amount: amountDonate,
    orderId: orderId,
    orderInfo: orderInfo,
    returnUrl: returnUrl,
    notifyUrl: notifyurl,
    extraData: extraData,
    requestType: requestType,
    signature: signature
  });
  var options = await {
    hostname: "cors-anywhere.herokuapp.com/test-payment.momo.vn",
    port: 443,
    path: "/gw_payment/transactionProcessor",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(body),
      mode: "no-cors"
    }
  };

  var test;
  var req = await https.request(options, res => {
    // console.log(res);
    // console.log(`Status: ${res.statusCode}`);
    // console.log(`Headers: ${JSON.stringify(res.headers)}`);
    res.setEncoding("utf8");
    res.on("data", body => {
      console.log("body");
      // ns chung gio a muon lay cai gia tri test o day :v
      test = JSON.parse(body);

      //h a muốn lấy caí thằng body này
    });

    res.on("end", () => {
      callback(test);
      console.log("No more data in response.");
    });
  });

  req.on("error", e => {
    console.log(`problem with request: ${e.message}`);
  });

  // write data to request body

  req.write(body);
  req.end();
}
//donateEvent("1000")

// function get(link, field) {
//   const regex = new RegExp(`${field}=([^&]*)`);
//   let x = regex.exec(link);
//   if (x != undefined) return field + "=" + x[1] + "&";
// }

function get(url, name) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return name+"="+decodeURIComponent(results[2].replace(/\+/g, ' '))+"&";
}
export function checkPayment(data, amount) {
  // console.log("payment");
  // console.log(get(data, "amount"));
  const url =
    "//test-payment.momo.vn/gw_payment//qr/query?" +
    get(data, "partnerCode") +
    get(data, "amount") +
    get(data, "orderId") +
    get(data, "accessKey") +
    get(data, "requestId") +
    get(data, "signature") +
    get(data, "requestType");
    //console.log(url);
    
  return Axios.post(
    url
  );
}
