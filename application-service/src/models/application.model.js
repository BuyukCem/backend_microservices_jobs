import Sequelize from 'sequelize';
import {sequelize} from '../config/bdd.config';

const application = sequelize.define('application', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    offer_id: {
        type: Sequelize.STRING, // OUT OF RANGE IL FAUT FAIRE ÇA
        allowNull: false,
    },
    status: {
        type: Sequelize.ENUM('Inbox', 'In process', 'Interview', 'Rejected', 'Hired', 'Archived'),
        allowNull: false,
        defaultValue: 'Inbox'
    },
    resume: {
        type: Sequelize.STRING,
        allowNull: true
    },
    cover_letter: {
        type: Sequelize.STRING,
        allowNull: true
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
}, {
    freezeTableName: true,
    tableName: "application"
});


export default application;
