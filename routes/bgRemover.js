const bgController = require('../controllers/bgController');
const router = require('express').Router();


module.exports = (app) => {
    app.use('/api/v2/bg-remover', router);

    router.post('/', bgController.sendImg);
    // router.post('/', bgController.sendImg);
    router.post('/cloudinary', bgController.removeBg);



    return router;
}