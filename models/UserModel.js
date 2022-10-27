module.exports = (sequelize, DataTypes, literal) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: literal("concat_ws('-', 'user', nextval('user_seq'))"),
      primaryKey: true,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      lowercase: true,
      // set(value) {
      //   return value.toLowerCase()
      // },
      // get() {
      //   return this.dataValues.email
      // },
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    google_id: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    facebook_id: {
      type: DataTypes.STRING,
      defaultValue: null
    }
  }, {
    indexes: [
      { 
        unique: true, 
        fields: ['email'] 
      },
    ],
    tableName: 'users',
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
  User.addHook('beforeCreate', (record, options) => {
    record.dataValues.created_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    for (const key in record.dataValues) {
      if (typeof record.dataValues[key] === 'string' && key !== 'id' && key !== 'password') {
        record.dataValues[key] = record.dataValues[key].toLowerCase();
      }
    }
  });
  User.addHook('beforeUpdate', (record, options) => {
    record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    for (const key in record.dataValues) {
      if (typeof record.dataValues[key] === 'string' && key !== 'id' && key !== 'password') {
        record.dataValues[key] = record.dataValues[key].toLowerCase();
      }
    }
  });

  const fkey = {
    foreignKey: {
      type: DataTypes.TEXT,
      allowNull: false,
      name: "user_id",
      onDELETE: "CASCADE"
    }
  }

  const arrayModelsMany = ["Cart", "Order"];
  const arrayModelsOnes = ["ContactDetail", "PaymentDetail"];

  User.associate = models => {
    for (const model of arrayModelsMany) {
      User.hasMany(models[model], {
        foreignKey: "user_id"
      });
    }

    for (const model of arrayModelsOnes) {
      User.hasOne(models[model], {
        foreignKey: "user_id"
      });
    }
  };
  return User;
}