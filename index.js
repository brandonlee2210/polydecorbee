import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./src/routes/index.js";
import cookieParser from "cookie-parser";
import nodemailer from "nodemailer";
import { errorHandler } from "./src/middlewares/errorMiddleware.js";
import fs from "fs";
import path from "path";

dotenv.config();
const { PORT, MONGO_URL } = process.env;

const app = express();
app.use(express.json());
// app.use(errorHandler);

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "*",
    exposedHeaders: ["set-cookie"],
  })
);

// Configure Nodemailer
// Create a transporter object using Gmail service
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "giabao20032001@gmail.com", // Your Gmail address
    pass: "czsd yqxh qgpn edce", // Your Gmail password or App Password
  },
});

mongoose
  .connect(`${MONGO_URL}`)
  .then(() => console.log("Database Connected!"))
  .catch((err) => console.log(err));
app.use("/api/v1", router);
app.post("/api/v1/send-email", (req, res) => {
  // Read the HTML template
  let html = `
      <!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333333;
        }
        p {
            color: #555555;
            line-height: 1.6;
        }
        .order-summary {
            border-top: 2px solid #e4e4e4;
            padding-top: 10px;
            margin-top: 10px;
        }
        .order-summary p {
            margin: 5px 0;
        }
        .footer {
            margin-top: 20px;
            padding-top: 10px;
            border-top: 1px solid #e4e4e4;
            text-align: center;
            color: #888888;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Đơn Hàng Của Bạn Đã Được Đặt Thành Công!</h1>
        <p>Chào [Tên Khách Hàng],</p>
        <p>Chúng tôi xin cảm ơn bạn vì đã mua hàng!</p>
        <p>Chúng tôi rất vui được thông báo rằng đơn hàng #[Số Đơn Hàng] của bạn đã được đặt thành công. Dưới đây là chi tiết đơn hàng của bạn:</p>
        
        <div class="order-summary">
            <h2>Tóm Tắt Đơn Hàng:</h2>
            <p><strong>Tổng Số Tiền:</strong> [Tổng Số Tiền]</p>
            <p><strong>Địa Chỉ Giao Hàng:</strong> [Địa Chỉ Giao Hàng]</p>
            <p><strong>Dự Kiến Ngày Giao Hàng:</strong> [Ngày Giao Dự Kiến]</p>
            <p><strong>Trạng Thái Đơn Hàng:</strong> [Trạng Thái Hiện Tại của Đơn Hàng]</p>
            <h3>Chi Tiết Sản Phẩm:</h3>
            <ul>
              [Danh Sách Sản Phẩm]
            </ul>
        </div>
        
        <p>Bạn có thể theo dõi trạng thái đơn hàng và xem thêm chi tiết bằng cách đăng nhập vào tài khoản của bạn trên trang web của chúng tôi <a href="[URL Trang Web]">tại đây</a> hoặc liên hệ với đội ngũ chăm sóc khách hàng của chúng tôi.</p>
        
        <p>Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ thêm, xin đừng ngần ngại liên hệ với chúng tôi qua [Email/Điện Thoại Chăm Sóc Khách Hàng].</p>
        
        <p>Cảm ơn bạn đã mua sắm cùng chúng tôi! Chúng tôi hy vọng bạn sẽ hài lòng với sản phẩm của mình.</p>

        <div class="footer">
            <p>Trân trọng,</p>
            <p>[Tên Bạn]<br>
            [Chức Danh Của Bạn]<br>
            [Tên Công Ty]<br>
            [Thông Tin Liên Hệ]<br>
            <a href="[URL Trang Web]">[URL Trang Web]</a></p>
        </div>
    </div>
</body>
</html>
`;
  // Customize the HTML content
  let { total, address, status, date, products, email, phoneNumber } = req.body;

  // Generate product list HTML
  let productListHtml = products
    .map(
      (product) => `
    <li>
      <p><strong>Tên Sản Phẩm:</strong> ${product.name}</p>
      <p><strong>Số Lượng:</strong> ${product.quantity}</p>
      <p><strong>Giá:</strong> ${product.price}</p>
    </li>
  `
    )
    .join("");

  let customizedHtml = html
    .replace("[Tên Khách Hàng]", "bạn") // Replace with actual customer name
    .replace("[Số Đơn Hàng]", "123456") // Replace with actual order number
    // .replace("[Tên Sản Phẩm]", "Sản phẩm XYZ") // Replace with actual product name
    // .replace("[Số Lượng]", "2") // Replace with actual quantity
    .replace("[Tổng Số Tiền]", total) // Replace with actual total amount
    .replace("[Địa Chỉ Giao Hàng]", address) // Replace with actual shipping address
    .replace("[Ngày Giao Dự Kiến]", "15/08/2024") // Replace with actual delivery date
    .replace("[Trạng Thái Hiện Tại của Đơn Hàng]", "Chờ xác nhận") // Replace with actual order status
    .replace("[Danh Sách Sản Phẩm]", productListHtml)
    .replace("[URL Trang Web]", "https://example.com") // Replace with actual URL
    .replace("[Email/Điện Thoại Chăm Sóc Khách Hàng]", "support@example.com"); // Replace with actual contact

  // Setup email data
  let mailOptions = {
    from: '"Poly Decor Shop" <your-email@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Xác Nhận Đơn Hàng", // Subject line
    html: customizedHtml, // HTML body content
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error sending email:", error);
    }
    console.log("Email sent:", info.response);

    // send response to client
    res.status(200).json({ message: "Email sent successfully" });
  });
});
const port = 8000; // default port to listen

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
