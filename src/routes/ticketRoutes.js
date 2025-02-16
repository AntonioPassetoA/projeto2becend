// src/routes/ticketRoutes.js
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController'); // Ou o nome do controlador adequado

// Rota de vendas
router.get('/vendas', ticketController.showSalesPage);  // Exibe a página de vendas

// Rota POST para processar a compra
router.post('/vendas', ticketController.showPurchaseConfirmation); // Processa a compra

// Rota para confirmar a compra
router.post('/vendas/confirmar', ticketController.confirmPurchase); // Confirma a compra

// Rota para cancelar a compra
router.get('/vendas/cancelar', ticketController.cancelPurchase); // Cancela a compra

module.exports = router;
