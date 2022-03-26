const path = require("path");
const express = require("express");
const hbs = require("express-handlebars");
const dotenv = require("dotenv");

dotenv.config({
  path: "./config/config.env",
});

const stripe = require("stripe")(process.env.STRIPE_SECRET);

const app = express();

/**
 * Middleware
 */
// Parse JSON
app.use(express.json());

// Form Submissions
app.use(
  express.urlencoded({
    extended: false,
  })
);

/**
 * View Engine
 */
app.engine(
  "handlebars",
  hbs({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

/**
 * Routes
 */
app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
  });
});

app.post("/charge", (req, res) => {
  const amount = 2500;

  stripe.customer
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
    })
    .then((customer) => {
      stripe.paymentIntents.create({
        amount: amount,
        description: "Web dev ebook",
        currency: "usd",
        customer: customer.id,
      });
    })
    .then((charge) => {
      if (charge) {
        res.render("index", {
          success: true,
          msg: "Thanks for buying the book.",
        });
      }
    })
    .catch((err) => {
      console.log(`Purchase Error: ${err}`);
      res.render("index", {
        error: true,
        msg: err,
      });
    });
});

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
  res.status(404).render("404");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
