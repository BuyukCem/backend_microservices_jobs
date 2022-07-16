import Company from '../models/company.model';
import {Op} from "sequelize";
import axios from "axios";

export default {
    findAll: async (args= null) => {
        return Company.findAll({
            raw : true ,
            nest: true , // <--- The issue of raw true, will be solved by this
            include: [{
                all: true
            }]
        });
    },
    find: async (...args) => {
        const company = await Company.findOne({
            where: {
                [Op.or]: args
            },
            raw : true ,
            nest: true , // <--- The issue of raw true, will be solved by this
            include: [{
                all: true
            }]
        });

        if (company !== null) {
            return company;
        } else {
            throw new Error('Company not found');
        }
    },
    findMultiple: async (...args) => {
        const company = await Company.findAll({
            where: {
                [Op.or]: args
            },
            raw : true ,
            nest: true , // <--- The issue of raw true, will be solved by this
            include: [{
                all: true
            }]
        });

        if (company !== null) {
            return company;
        } else {
            throw new Error('Companies not found');
        }
    },
    create: async (data) => {
       return await Company.create(data);
    },
    findOne: async (field, value) => {
        const exists = await Company.findOne({where: {id: 1}});
        return exists
    },
    delete: async (id) => {
        return await Company.destroy({ where: { id } });
    },
    update: async (id, data) => {
        let req = await Company.update(data, {where: {id}})
        if(req > 0) {
            return await Company.findOne({
                where: {
                    [Op.or]: {id: id}
                }
            });
        }else{
            return 0
        }
    },
    postCompanyUser: async (data) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: process.env.USER_MICRO_SERVICE_URL + "/user",
                data:{
                    email: data.email,
                    password: data.password,
                    role: "CLIENT"
                },
                headers: {
                    "X_Auth_Token": process.env.USER_MICRO_SERVICE_X_AUTH_TOKEN,
                    "Content-Type": "application/json"
                }
            }).then((res) =>{
                console.log(1.1)
                return resolve(res.data)
            }).catch((err)=>{
                console.log(1.2)
                if (err.response) {
                    return reject(err.response.data)
                } else if (err.request) {
                    return reject(err.request)
                } else {
                    return reject(err.message)
                }
                return reject(err.config)
            })
        })
    }
}
