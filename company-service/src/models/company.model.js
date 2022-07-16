import Sequelize from 'sequelize';
import {sequelize} from '../config/bdd.config';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const Company = sequelize.define('company', {
    company_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        validate: {
            notNull: {
                msg: 'Please provide a value for "Comanpy Name"'
            },
            notEmpty: {
                msg: 'Please provide a value for "Comanpy Name"'
            }
        }
    },
    siret: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: {
            msg: 'This siret is already used',
            fields: ['siret']
        },
        validate: {
            validateSiret: function (value) {
                if (value.length != 14) {
                    throw new Error('Siret must be 14 characters long');
                }
            },
            notNull: {
                msg: 'Please provide a value for "Siret"'
            },
            notEmpty: {
                msg: 'Please provide a value for "Siret"'
            }
        },
    },
    siren: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true
    },
    status: {
        type: Sequelize.ENUM("created", "waiting", "valid", "refused"),
        allowNull: false,
        defaultValue: "created",
        validate: {
            notNull: {
                msg: 'Please provide a value for "Status"'
            },
            notEmpty: {
                msg: 'Please provide a value for "Status"'
            }
        }
    },
    nb_employees: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    presentation: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    wanted: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    cover_image: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    logo: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    // TODO: validation entreprise avec API du Gouvenement
    kabis: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    city: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    country: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    zip_code: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            validateZipCode: function (value) {
                if (value && value.length != 5) {
                    throw new Error('Zip code must be 5 characters long');
                }
            }
        }
    },
    street: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    street_number: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    createDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    updateDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    website: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: function (value) {
                if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)) {
                    throw new Error('Please provide a valid email');
                }
            }
        }
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    activity_Area: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    sub_activity_Area: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    company_token: {
        type: Sequelize.STRING,
    },
    longitude: {
        type: Sequelize.FLOAT,
        allowNull: true,
    },
    latitude: {
        type: Sequelize.FLOAT,
        allowNull: true,
    },
    user_account_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
}, {
    freezeTableName: true,
    tableName: "company"
});
Company.addHook('beforeSave', (company) => {
    company.company_token = crypto.randomBytes(20).toString('hex');
    company.createDate = new Date();
});
Company.addHook('beforeUpdate', (company) => {
    company.updateDate = new Date();
});
Company.addHook('beforeSave', (company) => {
    // TODO: A FAIRE
})

export default Company;
