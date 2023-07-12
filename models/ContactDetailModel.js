module.exports = (sequelize, DataTypes, literal) => {
  const ContactDetail = sequelize.define('ContactDetail', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false // just switch on now
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false // just switch on now
    },
    address_line1: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    address_line2: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    town_city: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    zip_code: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING(50),
      allowNull: true,
      validate: { /* "+44 123456 7890" "+44 079 456 7890" * "+1 555 555 1234" * "+252 615 555 555" * "+1 416 1234 5678" * +966 123 456 789 */
        // is: "^(\+\d{1,3}\s)?\(?\d{3}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}$", // ^(\+\d{1,3}[\s-])?\(?\d{3}\)?[\s-]?\d{3,4}[\s-]?\d{3,5}$   use this regex instead
        validatePhone: (value) => {
          if (!/^(\+\d{1,3}\s)?\(?\d{3}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}$/.test(value)) {
            throw new Error("Phone format error!");
          }
        }
      }
    }
  }, {
    tableName: 'contact_details',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    // hooks: {
    //   beforeCreate: (record, options) => {
    //       record.dataValues.created_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    //       record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    //   },
    //   beforeUpdate: (record, options) => {
    //       record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    //   }
    // },
    charset: 'utf8',
    collate: 'utf8_general_ci'
    // paranoid: true
  });
  ContactDetail.addHook('beforeCreate', (record, options) => {
    record.dataValues.created_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    for (const key in record.dataValues) {
      if (typeof record.dataValues[key] === 'string' && key !== 'id' && key !== 'user_id') {
        record.dataValues[key] = record.dataValues[key].toLowerCase();
      }
    }
  });
  ContactDetail.addHook('beforeUpdate', (record, options) => {
    record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    for (const key in record.dataValues) {
      if (typeof record.dataValues[key] === 'string' && key !== 'id' && key !== 'user_id') {
        record.dataValues[key] = record.dataValues[key].toLowerCase();
    }
    }
  });

  ContactDetail.associate = models => {
    ContactDetail.belongsTo(models.User, {
        foreignKey: {
          name: "user_id",
          allowNull: false
        },
        onDelete: "CASCADE"
    });
  }

  return ContactDetail;
}