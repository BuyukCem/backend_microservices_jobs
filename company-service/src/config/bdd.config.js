import Sequelize from 'sequelize';
import pgtools from "pgtools";

let sequelize;

exports.dbConnect = async () => {
    if (process.env.NODE_ENV === 'production') {
        const PG_URI_PRD_DATABASE = `postgres://${process.env.PG_USER_PRD}:${process.env.PG_PASSWORD_PRD}@${process.env.PG_HOST_PRD}:${process.env.PG_PORT_PRD}/${process.env.PG_DATABASE_PRD}`;
        console.log(PG_URI_PRD_DATABASE)
        sequelize = new Sequelize(PG_URI_PRD_DATABASE, {
            dialect: 'postgres',
            logging: false,
            ssl: true,
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
        })
    } else {
        const PG_DATABASE = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;
        sequelize = new Sequelize(PG_DATABASE, {
            dialect: 'postgres',
            logging: false,
        });
    }
    if (process.env.NODE_ENV !== 'test') {
        await sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.log(err);
            });
    }
    if (process.env.NODE_ENV !== 'test') {
        sequelize.sync({alter: true}).then(() => {
            console.log('Database has been successfully synced.');
        }).catch(err => {
            console.log(err.message);
        });
    }
};

exports.dbDisconnect = async () => {
    await sequelize.close();
};
export {sequelize};
