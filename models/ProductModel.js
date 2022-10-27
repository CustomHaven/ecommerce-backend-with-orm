module.exports = (sequelize, DataTypes, literal) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: literal("concat_ws('-', 'prod', nextval('prod_seq'))"),
            primaryKey: true,
        },
        source: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        product_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        type: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            // set(value) {
            //     console.log("value");
            //     console.log(value);
            //     console.log("value");

            //     return parseFloat(value.toFixed(2))
            // }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'products',
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
    
    Product.addHook('beforeCreate', (record, options) => {
        record.dataValues.created_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
        record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
        for (const key in record.dataValues) {
            if (typeof record.dataValues[key] === 'string' && key !== 'id' && key !== 'product_name') {
                record.dataValues[key] = record.dataValues[key].toLowerCase();
            }
        }
    });
    
    Product.addHook('beforeUpdate', (record, options) => {
        record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
        for (const key in record.dataValues) {
            if (typeof record.dataValues[key] === 'string' && key !== 'id' && key !== 'product_name') {
                record.dataValues[key] = record.dataValues[key].toLowerCase();
            }
        }
    });


    const arrayModels = ["ProductImage", "CartList", "OrderList"];

    // const fkey = {
    //     foreignKey: {
    //         type: DataTypes.TEXT,
    //         allowNull: true,
    //         name: "product_id",
    //         onDelete: 'CASCADE',
    //         hooks: true
    //     }
    // };
    Product.associate = models => {
        for (const model of arrayModels) {
            Product.hasMany(models[model], {
                foreignKey: "product_id", // do cascade in belongTo
            });
        }
    };

    return Product;
}