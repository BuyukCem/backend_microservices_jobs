const express = require('express');
const app = express.Router()
const {JobOffer} = require("../models/job-offer.model");

app.route("/sectors").get(async (req, res) => {
    await JobOffer.distinct("sector").then(data => res.status(200).json({data: data, status: "success"}))
        .catch(error => res.status(500).json({error: error.message, status: "error"}))
})

module.exports = app
