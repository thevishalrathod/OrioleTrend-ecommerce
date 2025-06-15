import paypal from "paypal-rest-sdk";

try {
  paypal.configure({
    mode: "sandbox",
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET,
  });

  console.log("paypal connected!");
} catch (error) {
  console.log("ERROR IN paypal: ", error);
}

export default paypal;
