const Agenda = require("agenda");
var Agendash = require("agendash");
const {JobOffer} = require("../models/job-offer.model");
const {alertJobs} = require("../models/alert-jobs.model")
    let agenda;

    if(process.env.NODE_ENV !== 'production') {
        const url = 'mongodb://'+process.env.MONGO_HOST+':'+process.env.MONGO_PORT+'/'+process.env.MONGO_DATABASE
        agenda = new Agenda({ db: {
            address: url,
            collection : "alertOffer",
            options: { useNewUrlParser: true,useUnifiedTopology: true,authSource: "admin" }
          },
          processEvery: "40 seconds"});
    }
    if(process.env.NODE_ENV  == 'production'){
        agenda = new Agenda({ db: {
            address: process.env.MONGO_ATLAS_URL,
            collection : "alertOffer",
            options: { useNewUrlParser: true,useUnifiedTopology: true,authSource: "admin" }
          },
          processEvery: "40 seconds"});
    }

    agenda.define('createAlert', async (job) => {
        const data = job.attrs.data;
        if(data) {
            let filter = []
            const contract_type =  data.contract_type ? data.contract_type.split(',') : [];
            if (data.location) {
                filter.push({city: data.location});
            }
            if (data.contract_type && data.contract_type.length > 0) {
                filter.push({contract_type: {$in: data.contract_type}});
            }
            if (data.search) {
                filter.push({title: new RegExp(data.search, 'i')});
            }
            if (data.sector) {
                filter.push({sector: data.sector});
            }

            if (filter.length > 0) {
                const result = await JobOffer.find({
                    $and: filter
                })
                if(result.length > 0) {
                    const existAlerts = await alertJobs.findOne({user_id: data.user_id})
                    if(existAlerts) {
                        const newJobs = result.filter(job => {
                            return !existAlerts.jobs.includes(job._id)
                        }).map(job => job._id)
                        const newJobsAlert = existAlerts.jobs.concat(newJobs)
                        await alertJobs.findOneAndUpdate({user_id: data.user_id}, {$set: {jobs: newJobsAlert}})
                    }else {
                        const newAlert = new alertJobs({
                            jobs: result.map( job => job._id),
                            user_id: data.user_id
                        })
                        newAlert.save()
                    }
                }

            }
        }
        job.repeatEvery('7 days')
    });

    agenda.on('ready', () => {
        agenda.start();
        console.log("Agenda is ready !!!!!!!")
    })


 module.exports.agendaInit = (app) => {
        app.use("/dash", Agendash(agenda));
}

module.exports.agenda = agenda
