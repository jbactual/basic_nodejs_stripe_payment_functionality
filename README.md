# Basic Stripe Payment Functionality

Description: This is a full Node.js application that utilizes Express, Express Handlebars, and Stripe Payment. It demonstrates basic Stripe payment functionality.

## Technologies Used

1. Node.js
2. Express
3. Express Handlebars
4. Stripe Payments
5. Nodemon

## Setup Project

1. Install Node.js
2. Setup Stripe Payments and obtain API Secret Key
3. Download repo
4. Run "npm install"
5. Run "npm run dev" -> Requires nodemon

## Stripe Payment Flow

1. Homepage utilizes a Stripe provided checkout script -> https://checkout.stripe.com/checkout.js
2. This script POSTS user provided data to "localhost:PORT/checkout"
3. The above route utilizes the Stripe SDK to process payments through Stripes verification system
