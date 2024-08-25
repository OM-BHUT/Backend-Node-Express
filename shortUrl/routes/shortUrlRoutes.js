const express = require('express');
const router = express.Router();
const {
    handleShortRoutes,
    handleRedirectToOriginalUrl,
    handleAnalytics,
    handleGetAll,
    handleDeleteByShortUrl,
} = require('../controllers/shortUrlControlls');
router.post('/',handleShortRoutes);
router.get('/',handleGetAll);
router.get('/:shortId',handleRedirectToOriginalUrl);
router.get('/analytics/:shortId',handleAnalytics);
router.delete('/',handleDeleteByShortUrl);

module.exports = router;