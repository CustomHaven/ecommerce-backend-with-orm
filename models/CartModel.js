module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        abandoned: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        tableName: 'carts',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        charset: 'utf8',
        collate: 'utf8_general_ci'
        // freezeTableName: true
        // paranoid: true
    });

    Cart.addHook('beforeCreate', (record, options) => {
        record.dataValues.created_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
        record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    });
    Cart.addHook('beforeUpdate', (record, options) => {
        record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    });

    const arrayModels = ["CartList", "Order"]

    Cart.associate = models => {
        for (const model of arrayModels) {
            Cart.hasMany(models[model], {
                foreignKey: "cart_id",
                allowNull: model === "CartList" ? true : false,
            });
        }
        
        Cart.belongsTo(models.User, {
            foreignKey: "user_id",
            onDelete: "CASCADE"
        })
    };

    return Cart;
}