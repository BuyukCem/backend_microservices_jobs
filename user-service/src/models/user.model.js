import Sequelize from 'sequelize';
import {sequelize} from '../config/bdd.config';
import bcrypt from 'bcryptjs';
import {sendActivateAccountToken} from '../services/email.service';
const jwt = require('jsonwebtoken');
import crypto from 'crypto';

const User = sequelize.define('user', {
    lastName: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false
    },
    birthDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        unique: false,
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: {
                msg: 'Must be a Valid email',
            }
        },
        lowercase: true,
        unique: true,
        required: [true, "Email can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true,
        trim: true,
    },
    phone: {
        type: Sequelize.STRING,
        defaultValue: '',
        allowNull: true,
        unique: false,
    },
    password: {
        type: Sequelize.STRING,
        defaultValue: '',
        required: true,
        allowNull: false,
    },
    professionalTitle: {
        type: Sequelize.STRING,
        defaultValue: '',
        allowNull: true,
        unique: false
    },
    presentation: {
        type: Sequelize.TEXT,
        defaultValue: '',
        allowNull: true,
        defaultValue: '',
        unique: false
    },
    image_user_profile: {
        type: Sequelize.STRING,
        defaultValue: '',
        allowNull: true,
        defaultValue: '',
        unique: false
    },
    cover_cv: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: '',
        unique: false,
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    accountDateCreation: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
    },
    resetToken: {
        type: Sequelize.STRING,
        defaultValue: '',
    },
    role: {
        type: Sequelize.ENUM('ADMIN', 'USER', 'CLIENT'),
        defaultValue: 'USER',
    },
    professionalTitle: {
        type: Sequelize.STRING,
        defaultValue: '',
        allowNull: true,
    },
    expectedSalary: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    city: {
        type: Sequelize.STRING,
        defaultValue: '',
        allowNull: true,
    },
    country: {
        type: Sequelize.STRING,
        defaultValue: '',
        allowNull: true,
    },
    zip_code: {
        type: Sequelize.STRING,
        defaultValue: '',
        allowNull: true,
    },
    street: {
        type: Sequelize.STRING,
        defaultValue: '',
        allowNull: true,
    },
    street_number: {
        type: Sequelize.STRING,
        defaultValue: '',
        allowNull: true,
    },
    formatted_address: {
        type: Sequelize.STRING,
        defaultValue: '',
        allowNull: true,
    },
    activateToken: {
        type: Sequelize.STRING,
        defaultValue: '',
    },
    profile_completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    freezeTableName: true,
    tableName: "user"
});

User.prototype.generatePasswordResetToken = async function () {
    jwt.sign({id: this.id}, process.env.JWT_SECRET, {expiresIn: '1h'}, (err, token) => {
        if (err) return err;
        this.resetToken = token;
        this.save();
    });
}
User.addHook('beforeSave', async (user) => {
    user.activateToken =  crypto.randomBytes(40).toString('hex');
    user.password = bcrypt.hashSync(user.password, parseInt(process.env.JWT_SECRET, 40));
})

User.addHook('beforeBulkUpdate', async ({attributes}) => {
    if(attributes.password) {
        attributes.password = bcrypt.hashSync(attributes.password, parseInt(process.env.JWT_SECRET, 40));
    }
})
User.addHook('afterSave', async (user) => {
      // ===== AFTER SAVE USER =====
      console.log("===== AFTER SAVE USER =====")
       sendActivateAccountToken(user.dataValues);
})
export default User;
