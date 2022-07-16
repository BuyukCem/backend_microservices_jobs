const {default: mongoose} = require("mongoose");
const {Schema} = require("mongoose");
const {db} = require("../config/mongo_db.config");
const validator = require('../validator/job-offer-validator')

const likeOfferSchema = new Schema({
    user: {
        type: Schema.Types.Number,
        ref: "User",
        required: true
    },
    jobOffer: {
        type: Schema.Types.ObjectId,
        ref: "JobOffer",
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    deleted: {
        type: Schema.Types.Boolean,
        default: false
    }
});

const likeOffer = db.model("likeOffer", likeOfferSchema);
module.exports = {likeOffer};
