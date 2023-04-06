module.exports = (sequelize, DataTypes, literal) => {
    const Role = sequelize.define("Role", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: { // change the name to role_name for simplicity
            type: DataTypes.STRING
        }
    }, {
        tableName: 'roles',
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

    Role.addHook('beforeCreate', (record, options) => {
        record.dataValues.created_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
        record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
        // record.dataValues.name_on_card = record.dataValues.name_on_card.toUpperCase();
    });
    Role.addHook('beforeUpdate', (record, options) => {
        record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
        // record.dataValues.name_on_card = record.dataValues.name_on_card.toUpperCase();
    });

    Role.associate = models => {
        Role.belongsToMany(models.User, {
            through: "user_roles",
            foreignKey: "role_id",
            otherKey: "user_id"
        });
    }

    return Role;
};