const { v4: uuidv4 } = require("uuid");
// module.exports = (sequelize, DataTypes) => {
module.exports = (sequelize, DataTypes, literal) => {
    const RefreshToken = sequelize.define("RefreshToken", {
        // id: {
        //   type: DataTypes.TEXT,
        //   allowNull: false,
        //   defaultValue: literal("concat_ws('-', 'user', nextval('user_seq'))"),
        //   primaryKey: true,
        // },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        expiry_date: {
            type: DataTypes.DATE,
        },
    }, {
        tableName: 'refresh_tokens',
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

    RefreshToken.createToken = async function (user) {
        let expiredAt = new Date();

        expiredAt.setSeconds(expiredAt.getSeconds() + 604800); // 7 days
        // expiredAt.setSeconds(expiredAt.getSeconds() + 50); // 50 sec
        // expiredAt.setSeconds(Number(expiredAt.getTime() + (50 * 1000))); // 7 days
        // expiredAt.setSeconds(expiredAt.addSeconds(50)); // 7 days


        let _token = uuidv4();

        let refreshToken = await this.create({
            token: _token,
            user_id: user.id,
            expiry_date: expiredAt.getTime(),
        });

        return refreshToken.token;
    };

    RefreshToken.verifyExpiration = (token) => {
        return token.expiry_date.getTime() > new Date().getTime();
    };

    RefreshToken.associate = models => {
        RefreshToken.belongsTo(models.User, {
            foreignKey: {
                name: "user_id",
                allowNull: false
            },
            onDelete: "CASCADE"
        });
    }

    return RefreshToken;
};