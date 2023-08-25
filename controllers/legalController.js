const LegalService = require("../services/legalService");
const legalService = new LegalService();

exports.getLegality = async (req, res, next) => {
    try {
        const legals = await legalService.findLegal();
        res.status(200).send(legals);
    } catch (error) {
        next(error);
    }
}