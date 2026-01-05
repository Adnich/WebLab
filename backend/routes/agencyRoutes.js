
const express = require('express');
const agencyController = require('../controllers/agencyController');
console.log("agencyController keys:", Object.keys(agencyController));
const router = express.Router();

router.get('/', agencyController.getAllAgencies);
router.post('/', agencyController.addAgency);
router.put('/:id', agencyController.updateAgency);
router.delete('/:id', agencyController.deleteAgency);

router.get('/:id/trips', agencyController.getAgencyTrips);

module.exports = router;
