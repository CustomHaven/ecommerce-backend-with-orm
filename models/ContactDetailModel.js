module.exports = (sequelize, DataTypes, literal) => {
  const ContactDetail = sequelize.define('ContactDetail', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    // user_id: { // ContactDetail.belongTo(User) THIS IS THE FKEY
    //   type: DataTypes.BIGINT
    // },
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
  })
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