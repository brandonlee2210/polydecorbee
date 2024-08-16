import { Router } from "express";

import CategoryRouter from "./category.js";
import VariantRouter from "./variant.js";
import OrderRouter from "./order.js";
import authRouter from "./auth.js";
import OrderDetailRouter from "./orderDetail.js";
import VariantProductRouter from "./variantProduct.js";
import CommentRouter from "./comment.js";
import moment from "moment";
import querystring from "qs";
import crypto from "crypto";

let config = {
  vnp_TmnCode: "HS7UZ3PF",
  vnp_HashSecret: "E0IFYW1VQA7H6SNSX3YLDVL2MGJG9CKM",
  vnp_Url: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
  vnp_Api: "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction",
  vnp_ReturnUrl: "http://localhost:8000/api/v1/vnpay_return",
};

const router = Router();

router.use("/", new CategoryRouter().route);
// router.use("/", new ProductRouter().route);
router.use("/", authRouter);
router.use("/", new VariantRouter().route);
router.use("/", new OrderRouter().route);
router.use("/", new OrderDetailRouter().route);
router.use("/", new VariantProductRouter().route);
router.use("/", new CommentRouter().route);

const orderRouter = new OrderRouter();
orderRouter.addRouter(
  "post",
  "/orders/save-order",
  orderRouter.controller.saveOrder
);
orderRouter.addRouter(
  "get",
  "/ordersByUser/:userId",
  orderRouter.controller.getOrdersByUserId
);
orderRouter.addRouter(
  "get",
  "/orders/variants/:categoryName",
  orderRouter.controller.getVariantsByCategoryId
);
orderRouter.addRouter(
  "post",
  "/orders/update-stock",
  orderRouter.controller.updateStock
);
orderRouter.addRouter(
  "get",
  "/orders/details/:orderId",
  orderRouter.controller.getOrderDetailsByOrderId
);

router.post("/create_payment_url", function (req, res, next) {
  process.env.TZ = "Asia/Ho_Chi_Minh";

  let date = new Date();
  let createDate = moment(date).format("YYYYMMDDHHmmss");

  let ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  let tmnCode = config.vnp_TmnCode;
  let secretKey = config.vnp_HashSecret;
  let vnpUrl = config.vnp_Url;
  let returnUrl = config["vnp_ReturnUrl"];
  let orderId = moment(date).format("DDHHmmss");
  let amount = 1000000;
  let bankCode = "NCB";

  let locale = req.body.language;
  if (locale === null || locale === "") {
    locale = "vn";
  }
  let currCode = "VND";
  let vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params["vnp_Locale"] = "vn";
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
  vnp_Params["vnp_OrderType"] = "other";
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  let signData = querystring.stringify(vnp_Params, { encode: false });
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

  res.status(200).json({ code: "00", data: vnpUrl });
});

router.get("/vnpay_return", function (req, res, next) {
  let vnp_Params = req.query;

  let secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);

  let tmnCode = config["vnp_TmnCode"];
  let secretKey = config["vnp_HashSecret"];

  let signData = querystring.stringify(vnp_Params, { encode: false });
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

    // res.status(200).json({ status: "00", data: vnp_Params });
    res.redirect("http://localhost:5173/result-checkout");
  } else {
    res.status(200).json({ status: "00", data: vnp_Params });
  }
});

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

router.use("/", orderRouter.route);

export default router;
