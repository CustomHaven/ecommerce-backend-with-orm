const PaymentService = require("../services/paymentService");
const paymentService = new PaymentService();
const { PAYMENT } = require("../config");
const stripe = require('stripe')(PAYMENT.STRIPE_SECRET);


exports.publishKey = async (req, res, next) => {
    try {
        res.status(200).send(PAYMENT.STRIPE_PUBLIC);
    } catch (error) {
        next(error);
    }
}

exports.findAllPayments = async (req, res, next) => {
    try {
        const allItems = await paymentService.findAllPayment();
        res.status(200).send(allItems);
    } catch (error) {
        next(error);
    }
}


exports.findAPayment = async (req, res, next) => {
    try {
        const item = await paymentService.findPayment(Number(req.params.id, res.locals.userIdRole));
        res.status(200).send(item);
    } catch (error) {
        next(error);
    }
}

exports.updateAPayment = async (req, res, next) => {
    try {
        if ("name_on_card" in req.body) {
            req.body.name_on_card = req.body.name_on_card.toUpperCase();
        }
        const payment = await paymentService.updatePayment(Number(req.params.id), req.body, res.locals.userIdRole);
        res.status(201).send(payment);
    } catch (error) {
        next(error);
    }
}

exports.removePaymentDetail = async (req, res, next) => {
    try {
        await paymentService.deletePaymentDetail(Number(req.params.id), res.locals.userIdRole);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}


exports.masterPay = async (req, res, next) => {
    try {
        const { name_on_card, card_type, card_number, expiry_date, cvv, amount } = req.body;

        const user = await PaymentService.findUserContactDetails(req.params.user_id, res.locals.userIdRole);
        const userName = user.ContactDetail.first_name + " " + user.ContactDetail.last_name;

        // creating customer in stripe
        const customer = await stripe.customers.create({
            address: {
                city: user.ContactDetail.town_city,
                country: user.ContactDetail.country,
                line1: user.ContactDetail.address_line1,
                line2: user.ContactDetail.address_line2,
                postal_code: user.ContactDetail.zip_code
            },
            email: user.ContactDetail.email,
            name: userName.replace(/(^\w{1})|(\s\w{1})/g, (v) => v.toUpperCase())
        });

        // preparing payment method
        const paymentMethod = await stripe.paymentMethods.create({
            type: req.query.card_type, // depends on where the customer lives so we send this in from the frontend we detect their location area first
            card: {
                number: card_number,
                exp_month: parseInt(expiry_date?.replace(/^\d+[-,\\/\.\w]/g, "")), // format it as expdate as 2026/8
                exp_year: parseInt(expiry_date?.replace(/[-,\\/\.\w]\d+$/, "")), // format it as expdate as 2026/8
                cvc: String(cvv),
            },
        });

/* 
{
  "name_on_card": "ajay pilley", // fake but based on the user name we testing
  "card_type": "visa",
  "card_number": 4242424242424242,
  "expiry_date": "2026/8",
  "cvv": 132,
  "amount": 700
}
*/

        await stripe.paymentMethods.attach(
            paymentMethod.id,
            { customer: customer.id }
        );


        // 4000008260003178 // Insufficient funds credit card for TESTING

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: req.query.currency,
            customer: customer.id,
            payment_method: paymentMethod.id
        });
        // res.status(201).send(paymentIntent);

        // Might probably take paymentIntent to a different route
        const paymentIntentConfirm = await stripe.paymentIntents.confirm(
            paymentIntent.id,
            {
                payment_method: paymentMethod.id
            }
        );

        // res.status(201).send({ risk_level: paymentIntentConfirm.charges.data[0].outcome.risk_level,
        // risk_score: paymentIntentConfirm.charges.data[0].outcome.risk_score, reason: paymentIntentConfirm.charges.data[0].outcome.reason });

        // // Maybe make another column saying paid string yes or no
        // // And move this to the other route with paymenyIntents.confirm
        const data = {
            user_id: user.id,
            name_on_card: name_on_card?.toUpperCase(),
            card_type: card_type?.toUpperCase(),
            card_number: parseInt(card_number),
            expiry_date,
            cvv: parseInt(cvv),
            payment_provider_id: paymentIntentConfirm.id
        }

        // So move these to the other route
        if (paymentIntentConfirm.charges.data.length > 0) {
            await paymentService.newPayment(data);
        } else {
            console.log("payment failed"); // keeping this so I can keep record
        }

        res.status(201).json({ payment_id: paymentIntentConfirm.id });
    } catch (error) {
        next(error);
    }
}

exports.acceptPayment = async (req, res, next) => {
    try {
        const { paymentMethod } = req.query;
        // Might probably take paymentIntent to a different route
        const paymentIntentConfirm = await stripe.paymentIntents.confirm(
            paymentIntent.id,
            {
                payment_method: paymentMethod.id
            }
        );

        // Maybe make another column saying paid string yes or no
        // And move this to the other route with paymenyIntents.confirm
        const data = {
            user_id: user.id,
            name_on_card: name_on_card?.toUpperCase(),
            card_type: card_type?.toUpperCase(),
            card_number: parseInt(card_number),
            expiry_date,
            cvv: parseInt(cvv)
        }

        // So move these to the other route
        if (paymentIntentConfirm.charges.data.length > 0) {
            await paymentService.newPayment(data);
        } else {
            console.log("payment failed"); // keeping this so I can keep record
        }
    } catch (error) {
        next(error);
    }
}