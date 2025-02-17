const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');
const { authenticate } = require('../middlewares/authenticate');

// Rota GET para exibir a página de vendas
router.get('/vendas', authenticate, purchaseController.showSalesPage);  // Página de vendas

// Rota POST para criar a compra
router.post('/vendas', authenticate, purchaseController.createPurchase);  // Rota para a criação da compra

// Rota GET para exibir o histórico de compras
router.get('/historico', authenticate, purchaseController.getPurchaseHistory);  // Exibe histórico de compras

// Rota POST para cancelar a compra
router.post('/cancelar/:purchaseId', authenticate, purchaseController.cancelPurchase);  // Cancela a compra

// Rota para confirmar a compra
router.get('/confirmacaoCompra/:purchaseId', authenticate, purchaseController.showConfirmPurchase);  // Confirma a compra

router.post('/confirmar/:purchaseId', authenticate, purchaseController.confirmPurchase);  // Confirma a compra

module.exports = router;
