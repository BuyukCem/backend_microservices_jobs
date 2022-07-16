const {default: mongoose} = require("mongoose");
const {Schema} = require("mongoose");
const {db} = require("../config/mongo_db.config");
const validator = require('../validator/job-offer-validator')

const JobOfferSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    date_start: {
        type: Date,
        required: false
    },
    date_end: {
        type: Date,
        required: false
    },
    company_id: {
        type: Schema.Types.Number,
        required: true
    },
    contract_type: {
        type: String,
        enum: ["STAGE", "ALTERNANCE", "CDD", "CDI", "INTERIM", "FREELANCE", "AUTRE"],
        required: true
    },
    applicant_description: {
        type: String,
        required: true
    },
    job_description: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        validate: {
            validator: function (value) {
                return value.length >= 0 && value.length <= 20;
            },
        },
    },
    salary_type: {
        type: String,
        enum: ["ANNUEL", "MENSUEL", "HORAIRE"],
        required: false
    },
    // TODO: à valider
    sector: {
        type: String,
        validate: {validator: validator.check_sector, msg: "Sector is not valid"},
        required: true
    },
    sub_sector: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    street_number: {
        type: Number,
        required: false
    },
    street: {
        type: String,
        required: false
    },
    postal_code: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    is_active: {
        type: Boolean, default: true, required: false
    },
    created_at: {
        type: Date, //default : Date.now,
        required: false
    },
    updated_at: {
        type: Date, //default : Date.now,
        required: false
    }
}, { timestamps: true })

JobOfferSchema.path('date_start').validate((value) => {
    return new Date(value) >= new Date()
}, 'The start date must be greater than or equal to the current date');

/*JobOfferSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    console.log(this.updated_at)
    if ( !this.created_at ) {
      this.created_at = now;
      console.log(this.created_at)
    }
    next();
});*/



const JobOffer = db.model("JobOffer", JobOfferSchema);
module.exports = {JobOffer};
