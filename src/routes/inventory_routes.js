const express = require('express');
const inventoryController = require('../controllers/inventory_controller');
const verifyJWT = require('../middlewares/verifyJWT');

const inventoryRouter = express.Router();

inventoryRouter.get('/stock', verifyJWT, inventoryController.getStockLevels);
inventoryRouter.put('/stock/:productId', verifyJWT, inventoryController.updateStock);

module.exports = inventoryRouter;
