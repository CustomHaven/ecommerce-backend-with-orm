module.exports = (sequelize, DataTypes) => {
    const PaymentDetail = sequelize.define('PaymentDetail', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name_on_card: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        card_type: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        card_number: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                isCreditCard: true
            }
        },
        expiry_date: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        cvv: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                max: 9999,
                min: 100
            }
        }
    }, {
        tableName: 'payment_details',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        charset: 'utf8',
        collate: 'utf8_general_ci'
        // freezeTableName: true
        // paranoid: true
    });

    PaymentDetail.addHook('beforeCreate', (record, options) => {
        record.dataValues.created_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
        record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
        // record.dataValues.name_on_card = record.dataValues.name_on_card.toUpperCase();
    });
    PaymentDetail.addHook('beforeUpdate', (record, options) => {
        record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
        // record.dataValues.name_on_card = record.dataValues.name_on_card.toUpperCase();
    });

    PaymentDetail.associate = models => {
        // PaymentDetail.hasMany(models.Product);
        PaymentDetail.belongsTo(models.User, {
            foreignKey: {
                name: "user_id",
                allowNull: false
            },
            onDelete: "CASCADE"
        });
    };

    return PaymentDetail;
}