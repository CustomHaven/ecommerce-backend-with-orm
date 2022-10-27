module.exports = (sequelize, DataTypes) => {
    const ProductImage = sequelize.define('ProductImage', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        image_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        image_data: {
            // type: DataTypes.STRING.BYTEA,
            type: DataTypes.BLOB,
            allowNull: false
        },
    }, {
        tableName: 'product_images',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        charset: 'utf8',
        collate: 'utf8_general_ci'
        // freezeTableName: true
        // paranoid: true
    });

    ProductImage.addHook('beforeCreate', (record, options) => {
        record.dataValues.created_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
        record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    });
    ProductImage.addHook('beforeUpdate', (record, options) => {
        record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    });

    ProductImage.associate = models => {
        ProductImage.belongsTo(models.Product, {
            foreignKey: "product_id",
            onDelete: "CASCADE"
        });
    };

    return ProductImage;
}