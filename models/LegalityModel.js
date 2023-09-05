module.exports = (sequelize, DataTypes, literal) => {
    const Legality = sequelize.define("Legality", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        terms_and_conditions: { // change the name to role_name for simplicity
            type: DataTypes.TEXT,
            allowNull: false
        },
        privacy_policy: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        about_us: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        delivery_information: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 'legalities',
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
    Legality.addHook('beforeCreate', (record, options) => {
        record.dataValues.created_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
        record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
        // record.dataValues.name_on_card = record.dataValues.name_on_card.toUpperCase();
    });
    Legality.addHook('beforeUpdate', (record, options) => {
        record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
        // record.dataValues.name_on_card = record.dataValues.name_on_card.toUpperCase();
    });

    return Legality;
}