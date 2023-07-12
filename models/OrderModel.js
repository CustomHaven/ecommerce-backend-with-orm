module.exports = (sequelize, DataTypes, literal) => {
  // const { DataTypes } = Sequelize;
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.TEXT,
      defaultValue: literal("concat_ws('-', 'order', nextval('order_seq'))"),
      allowNull: false,
      primaryKey: true
    },
    shipping_status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "pending"
    },
    cart_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    shipping_method: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "missed"
    },
    shipping_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    final_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    total_items: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    tracking_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "not available"
    },
    payment_provider_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "missed"
    }
  }, {
    tableName: 'orders',
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

  Order.addHook('beforeCreate', (record, options) => {
    record.dataValues.created_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
  });
  Order.addHook('beforeUpdate', (record, options) => {
    record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
  });

  Order.associate = models => {
    // very strange as this fkey is only in 1 other table so why do I have to use hasMany, in order to get all records of it when query for and use include?
    Order.hasMany(models.OrderList, {
      foreignKey: 'order_id',
      allowNull: false
    });

    Order.belongsTo(models.Cart, {
      foreignKey: "cart_id",
      onDelete: "CASCADE"
    });

    Order.belongsTo(models.User, {
      foreignKey: {
        name: "user_id",
        allowNull: false
      },
      onDelete: "CASCADE"
    })
  }

  return Order;
}