module.exports = (sequelize, DataTypes) => {
  const OrderList = sequelize.define('OrderList', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    quantity: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  }, {
    tableName: 'order_list',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    // hooks: {
    //   beforeCreate(record, options) {
    //       record.dataValues.created_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    //       record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    //   },
    //   beforeUpdate(record, options) {
    //       record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    //   }
    // },
    charset: 'utf8',
    collate: 'utf8_general_ci'
    // paranoid: true
  });

  OrderList.addHook('beforeCreate', (record, options) => {
    record.dataValues.created_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
  });
  OrderList.addHook('beforeUpdate', (record, options) => {
    record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
  });

  OrderList.associate = models => {
    // OrderList.hasMany(models.Product);
    // OrderList.belongsTo(models.Order, {
    //     foreignKey: "order_id",
    //     allowNull: false,
    //     onDelete: "CASCADE",
    // });

    OrderList.belongsTo(models.Order, {
      foreignKey: "order_id",
      allowNull: false,
      onDelete: "CASCADE",
    });

    OrderList.belongsTo(models.Product, {
        foreignKey: {
            name: "product_id",
            allowNull: false
        },
        onDelete: "CASCADE",
    });
  };

  return OrderList;
}