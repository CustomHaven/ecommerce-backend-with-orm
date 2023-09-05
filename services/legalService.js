const Models = require('../models');
const { Legality } = Models;
const createError = require("http-errors");

module.exports = class LegalService {
    async findLegal() {
        try {
            const legal = await Legality.findByPk(1);
            if (!legal) {
                throw createError(404, 'Invalid path');
            }
            return legal;
        } catch (error) {
            throw error;
        }
    }
};