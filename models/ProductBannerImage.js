module.exports = (sequelize, DataTypes) => {
    const ProductBannerImage = sequelize.define('ProductBannerImage', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        banner_image_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        banner_image_data: {
            // type: DataTypes.STRING.BYTEA,
            type: DataTypes.BLOB,
            allowNull: false,
            set(value) {
                this.setDataValue("banner_image_data", sequelize.raw(`SELECT encode(${value}, base64)`))
            }
        },
    }, {
        tableName: 'product_banner_images',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        charset: 'utf8',
        collate: 'utf8_general_ci'
        // freezeTableName: true
        // paranoid: true
    });

    ProductBannerImage.addHook('beforeCreate', (record, options) => {
        record.dataValues.created_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
        record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    });
    ProductBannerImage.addHook('beforeUpdate', (record, options) => {
        record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    });

    // ProductBannerImage.associate = models => {
    //     ProductBannerImage.belongsTo(models.Product, {
    //         foreignKey: "product_id",
    //         onDelete: "CASCADE"
    //     });
    // };

    ProductBannerImage.associate = models => {
        ProductBannerImage.belongsTo(models.Product, {
            foreignKey: "product_id",
            onDelete: "CASCADE"
        });
    };

    return ProductBannerImage;
}