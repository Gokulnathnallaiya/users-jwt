const express = require('express');
const router = express.Router();
const stripe = require("stripe")("sk_test_51HbevCJNorcZJykEop3lFaPyVawMD9nQ3JI9gIFRLKX074OlIQTnPSUe7aQdbJe6kxsqcGnEcStSO0JtP2NinK4A00MbOXtS0W");
const { v4: uuidv4 } = require('uuid');
router.post("/checkout", async (req, res) => {
    console.log("Request:", req.body);
  
    let error;
    let status;
    try {
      const { token,total } = req.body;
  
      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id
      });
  
      const idempotency_key = uuidv4();
      const charge = await stripe.charges.create(
        {
          amount: total,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `Paying to woocommerce`,
          shipping: {
            name: token.card.name,
            address: {
              line1: token.card.address_line1,
              line2: token.card.address_line2,
              city: token.card.address_city,
              country: token.card.address_country,
              postal_code: token.card.address_zip
            }
          }
        },
        {
          idempotency_key
        }
      );
      console.log("Charge:", { charge });
      status = "success";
    } catch (error) {
      console.error("Error:", error);
      status = "failure";
    }
  
    res.json({ error, status });
  });


  module.exports = router;