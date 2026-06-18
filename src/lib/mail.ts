import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOrderEmail(
  email: string,
  orderId: string
) {
  await transporter.sendMail({
    from: `"D.ZHELEZNOV" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `Заказ ${orderId} оформлен`,
    html: `
      <h2>Спасибо за заказ в D.ZHELEZNOV</h2>

      <p>Номер заказа: <b>${orderId}</b></p>

      <p>Мы получили оплату и начали сборку заказа.</p>

      <p>После передачи заказа в СДЭК вы получите информацию для отслеживания.</p>

      <br>

      <p>D.ZHELEZNOV</p>
    `,
  });
}