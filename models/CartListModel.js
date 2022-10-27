module.exports = (sequelize, DataTypes) => {
    const CartList = sequelize.define('CartList', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'cart_list',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        charset: 'utf8',
        collate: 'utf8_general_ci'
        // freezeTableName: true
        // paranoid: true
    });

    CartList.addHook('beforeCreate', (record, options) => {
        record.dataValues.created_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
        record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    });
    CartList.addHook('beforeUpdate', (record, options) => {
        record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    });

    CartList.associate = models => {
        // CartList.hasMany(models.Product);
        CartList.belongsTo(models.Cart, {
            foreignKey: {
                name: "cart_id",
                allowNull: false
            },
            onDelete: "CASCADE",
        });

        CartList.belongsTo(models.Product, {
            foreignKey: {
                name: "product_id",
                allowNull: false
            },
            onDelete: "CASCADE",
        });
    };

    return CartList;
}