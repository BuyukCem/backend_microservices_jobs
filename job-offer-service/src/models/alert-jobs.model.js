const {default: mongoose} = require("mongoose");
const {Schema} = require("mongoose");
const {db} = require("../config/mongo_db.config");

const alertJobsSchema = new Schema({
    jobs: {
        type: Schema.Types.Array,
        required: true
    },
    updatedDate: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: Schema.Types.Number,
        required: true
    },
    deleted: {
        type: Schema.Types.Boolean,
        default: false
    }
});

const alertJobs = db.model("alertJobs", alertJobsSchema);
module.exports = {alertJobs};
