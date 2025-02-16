// src/controllers/ticketController.js

// Função para exibir a página de vendas
exports.showSalesPage = (req, res) => {
  const prices = {
    VIP: 50,  // Preço do ingresso VIP
    Normal: 20  // Preço do ingresso Normal
  };
  
  res.render('vendas', { prices });  // Passa os preços para o template de vendas
};

// Função para exibir a confirmação da compra
exports.showPurchaseConfirmation = (req, res) => {
  const { vip, normal } = req.body;
  const prices = {
    VIP: 50,
    Normal: 20
  };

  const ticketDetails = [];
  let totalVIP = 0;
  let totalNormal = 0;

  if (vip && vip > 0) {
    ticketDetails.push({
      nome: 'VIP',
      preco: prices.VIP,
      quantidade: vip,
      total: prices.VIP * vip
    });
    totalVIP = prices.VIP * vip;
  }

  if (normal && normal > 0) {
    ticketDetails.push({
      nome: 'Normal',
      preco: prices.Normal,
      quantidade: normal,
      total: prices.Normal * normal
    });
    totalNormal = prices.Normal * normal;
  }

  const total = totalVIP + totalNormal;
  
  res.render('confirmacaoCompra', { ticketDetails, total });  // Renderiza a página de confirmação com os detalhes da compra
};

// Função para confirmar a compra
exports.confirmPurchase = (req, res) => {
  // A lógica de confirmação de compra será aqui. Vamos simular que a compra foi realizada.
  res.redirect('/vendas');  // Após a confirmação, redireciona para a página de vendas
};

// Função para cancelar a compra
exports.cancelPurchase = (req, res) => {
  res.redirect('/vendas');  // Cancela e redireciona para a página de vendas
};
