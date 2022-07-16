import application from '../models/application.model';
import {Op, Sequelize} from "sequelize";

export default {
    find: async (args= null) => {
        return application.findAll();
    },
    findById: async (...args) => {
        const app = await application.findOne({
            where: {
                [Op.or]: args
            }
        });
        if (app !== null) {
            return app;
        } else {
            throw new Error('application not found');
        }
    },
    /**
     *
     * @param {string} query The to run by
     * @returns
     */
    findByParams: async (...args) => {
        const app = await application.findAll({
            where: {
                [Op.or]: args
            },
            order: [
                ['id', 'DESC'],
            ],
            raw : true ,
            nest: true , // <--- The issue of raw true, will be solved by this
            include: [{
                all: true
            }],
        });
        if (app !== null) {
            return app;
        } else {
            throw new Error('application not found');
        }
    },
    countByParams: async (...args) => {
        const count = await application.count({
            where: {
                [Op.or]: args
            }
        });
        return count;
    },
    create: async (data) => {
        return await application.create(data);
    },
    findOne: async (field, value) => {
        return await application.findOne({where: {[`${field}`]: value}});
    },
    delete: async (id) => {
        return await application.destroy({ where: { id } });
    },
    update: async (id, data) => {
        let req = await application.update(data, {where: {id}})
        if(req > 0) {
            return await application.findOne({
                where: {
                    [Op.or]: {id: id}
                }
            });
        }else{
            return 0
        }
    },
    findStats: async () => {
        const app = await application.findAll({
            attributes: ["status",[Sequelize.fn("COUNT", Sequelize.col("id")), "status_count"]],
            group: "status",
            raw : true ,
            nest: true , // <--- The issue of raw true, will be solved by this
            include: [{
                all: true
            }],
        });
        if (app !== null) {
            return app;
        } else {
            throw new Error('application not found');
        }
    },
    findStatsByCompany: async (ids) => {
        const app = await application.findAll({
            where: {
                offer_id: ids
            },
            attributes: ["status",[Sequelize.fn("COUNT", Sequelize.col("id")), "status_count"]],
            group: "status",
            raw : true ,
            nest: true , // <--- The issue of raw true, will be solved by this
            include: [{
                all: true
            }],
        });
        if (app !== null) {
            return app;
        } else {
            throw new Error('application not found');
        }
    }
}
