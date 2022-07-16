const express = require('express');
const app = express.Router()
const {db} = require("../config/mongo_db.config");
const ObjectID = require('mongoose').Types.ObjectId;
const {agenda} = require('../config/agenda')
const {JobOffer} = require("../models/job-offer.model");

const alertOffer = db.collection('alertOffer')
const alertjobs = db.collection('alertjobs')

app.route("/alert").post(async (req, res) => {
    let {id,user_id} = req.body;
    if (!user_id) {
        return res.status(400).json({
            status: "error",
            message: "Missing user_id",
        })
    }
    if(!id) {
        const body = {
            ...req.body,
            deleted: false
        }
        agenda.now('createAlert',body)
        res.status(200).json({status: "success", data: 'success'})
    }else {
        const data = {
            data: req.body
        }
        delete data.data.id
        try {
            const doc = await alertOffer.findOneAndUpdate({_id: ObjectID(id),'data.user_id': user_id}, { $set: data });
            if(doc && doc.lastErrorObject.n === 1) {
                return res.status(200).json({data: "success", status: "success"})
            } else {
                return res.status(400).json({
                    status: "error",
                    message: "Can't create or update alert"
                })
            }
        }catch (error) {
            return res.status(400).json({
                status: "error",
                message: "Can't  update alert"
            })
        }
    }
})

app.route('/alert/:id').get((async (req, res) => {
    if (!req.params.id ) {
        return res.status(400).json({
            status: "error",
            message: "provide user id",
        })
    }
    
    try {
        const alert = await alertOffer.findOne({ 'data.user_id': parseInt(req.params.id) })
        if(alert) {
            const data = {
                _id: alert._id,
                ...alert.data
            }
            return res.status(200).json({data: data, status: "success"})
        }else {
            return res.status(400).json({
                status: "error",
                message: "Can't get alert "
            })
        }
    }catch (error) {
        return res.status(400).json({
            status: "error",
            message: "Can't get alert "
        })
    }
}))

app.route('/alerts/:id').get((async (req, res) => {
    if (!req.params.id ) {
        return res.status(400).json({
            status: "error",
            message: "provide user id",
        })
    }
    
    try {
        const jobs = await alertjobs.findOne({ 'user_id': parseInt(req.params.id) })
        if(jobs) {
            const validJobs = await JobOffer.find({_id: {$in: jobs.jobs},is_active: true})
            if(validJobs) {
                return res.status(200).json({data: validJobs, status: "success"})
            }else {
                return res.status(400).json({
                    status: "error",
                    message: "Can't get alerts "
                })
            }
            
        }else {
            return res.status(400).json({
                status: "error",
                message: "Can't get alerts "
            })
        }
    }catch (error) {
        return res.status(400).json({
            status: "error",
            message: "Can't get alerts "
        })
    }
}))

app.route("/delete-alert/:id/:user_id").delete(async (req, res) => {
    if (!req.params.id || !req.params.user_id) {
        return res.status(400).json({
            status: "error",
            message: "Missing alert id or user_id",
        })
    }
    try {
        const doc = await alertOffer.deleteOne({_id: ObjectID(req.params.id),'data.user_id': parseInt(req.params.user_id)})
        if(doc && doc.deletedCount === 1) {
            return res.status(200).json({data: doc, status: "success"})
        } else {
            return res.status(400).json({
                status: "error",
                message: "Can't delete"
            })
        }
    }catch (error) {
        return res.status(400).json({
            status: "error",
            message: "Can't delete 2"
        })
    }
    
})

module.exports = app
