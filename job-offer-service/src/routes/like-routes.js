const express = require('express');
const app = express.Router()
const {likeOffer} = require("../models/like-offer.model");

app.route("/likes/:id").get(async (req, res) => {
    const user = JSON.parse(req.header('user'))
    if(user) {
        if (!req.params.id) {
            return res.status(400).json({
                status: "error",
                message: "Missing user_id",
            })
        }
        if(req.params.id !== user.id){
            return res.status(400).json({
                status: "error",
                message: "unauthorized"
            })
        }
        await likeOffer.find({user_id: req.params.id})
            .populate('job', ['title'])
            .then(data => res.status(200).json({data: data, status: "success"}))
    }else {
        return res.status(400).json({
            status: "error",
            message: "unauthorized"
        })
    }
})
app.route("/likes").get(async (req, res) => {
    const user_id = req.query.user_id;
    const user = JSON.parse(req.header('user'))
    if(user) {
        if(user_id !== user.id){
            return res.status(400).json({
                status: "error",
                message: "unauthorized"
            })
        }
            likeOffer.find({user: user_id,deleted: false})
            .then(data => {
                const like_ids = data.map(like => like.jobOffer);
                res.status(200).json({data: like_ids, status: "success"})
            })
            .catch(error => res.status(500).json({error: error.message, status: "error"}))
    }else {
        return res.status(400).json({
            status: "error",
            message: "unauthorized"
        })
    }
})

app.route("/like").post(async (req, res) => {
    const user_id = req.body.user_id;
    const user = JSON.parse(req.header('user'))
    if (user) {
        if(user_id !== user.id){
            return res.status(400).json({
                status: "error",
                message: "You can't like other user's offer",
            })
        }
        const job_id = req.body.job_id;
        const findLike = await likeOffer.findOne({user: user_id,jobOffer: job_id})
        if(findLike) {
            const update = {
                deleted: !findLike.deleted
            }
            likeOffer.findByIdAndUpdate(findLike._id,update)
            .then(data => res.status(200).json({data: data, status: "success"}))
            .catch(error => res.status(500).json({error: error.message, status: "error"}))
        }else {
            const data = {
                user: user_id,
                jobOffer:job_id,
                deleted: false,
            }
            const like = new likeOffer(data)
            like.save()
                .then(data => res.status(200).json({data: data, status: "success"}))
                .catch(error => res.status(500).json({error: error.message, status: "error"}))
        }
    }else {
        
    }

})
module.exports = app
