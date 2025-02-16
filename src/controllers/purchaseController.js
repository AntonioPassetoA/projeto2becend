const { Purchase, Ticket } = require('../models');

// Função para exibir a página de vendas com os preços
exports.showSalesPage = (req, res) => {
  const prices = {
    VIP: 50,  // Preço do ingresso VIP
    Normal: 20  // Preço do ingresso Normal
  };

  res.render('vendas', { prices });  // Passa os preços para o template
};

// Função para confirmar a compra
exports.createPurchase = async (req, res) => {
  const { vip, normal } = req.body;

  // Verifica se algum ingresso foi selecionado
  if (!vip && !normal) {
    return res.status(400).json({ message: 'Nenhum ingresso selecionado para compra.' });
  }

  try {
    // Criar a compra para o usuário autenticado
    const purchase = await Purchase.create({ usuarioId: req.user.id, status: 'pendente' });

    // Se houver ingressos VIP
    if (vip > 0) {
      const ticketVIP = await Ticket.findOne({ where: { nome: 'VIP' } });
      const totalPriceVIP = ticketVIP.preco * vip;  // Calculando o total para o ingresso VIP

      if (ticketVIP.quantidadeDisponivel < vip) {
        return res.status(400).json({ message: 'Estoque insuficiente para o ingresso VIP.' });
      }

      await purchase.addTicket(ticketVIP, { through: { quantidade: vip } });
      await ticketVIP.update({ quantidadeDisponivel: ticketVIP.quantidadeDisponivel - vip });
    }

    // Se houver ingressos Normais
    if (normal > 0) {
      const ticketNormal = await Ticket.findOne({ where: { nome: 'Normal' } });
      const totalPriceNormal = ticketNormal.preco * normal;  // Calculando o total para o ingresso Normal

      if (ticketNormal.quantidadeDisponivel < normal) {
        return res.status(400).json({ message: 'Estoque insuficiente para o ingresso Normal.' });
      }

      await purchase.addTicket(ticketNormal, { through: { quantidade: normal } });
      await ticketNormal.update({ quantidadeDisponivel: ticketNormal.quantidadeDisponivel - normal });
    }

    // Redireciona para a página de confirmação após a compra
    res.redirect(`/confirmacaoCompra/${purchase.id}`);
  } catch (error) {
    console.error('Erro ao confirmar a compra:', error.message);  // Adicionando a mensagem de erro para depuração
    res.status(500).json({ message: 'Erro ao confirmar a compra' });
  }
};

// Função para listar as compras do usuário
exports.getPurchaseHistory = async (req, res) => {
  try {
    // Recupera as compras do usuário logado
    const purchases = await Purchase.findAll({
      where: { usuarioId: req.user.id },
      include: [{
        model: Ticket,
        through: { attributes: ['quantidade'] },
      }],
    });

    res.render('historico', { purchases });
  } catch (error) {
    console.error('Erro ao buscar histórico de compras:', error);
    res.status(500).json({ message: 'Erro ao buscar histórico de compras' });
  }
};

// Função para confirmar a compra
exports.confirmPurchase = async (req, res) => {
  const { purchaseId } = req.params;

  try {
    const purchase = await Purchase.findByPk(purchaseId);

    if (!purchase) {
      return res.status(404).json({ message: 'Compra não encontrada.' });
    }

    purchase.status = 'confirmada';  // Atualiza o status para confirmada
    await purchase.save();

    res.redirect('/historico');  // Redireciona para o histórico de compras
  } catch (error) {
    console.error('Erro ao confirmar a compra:', error);
    res.status(500).json({ message: 'Erro ao confirmar a compra' });
  }
};

// Função para cancelar a compra
exports.cancelPurchase = async (req, res) => {
  const { purchaseId } = req.params;

  try {
    const purchase = await Purchase.findByPk(purchaseId);

    if (!purchase) {
      return res.status(404).json({ message: 'Compra não encontrada.' });
    }

    purchase.status = 'cancelada';  // Atualiza o status para cancelada
    await purchase.save();

    res.redirect('/historico');  // Redireciona para o histórico de compras
  } catch (error) {
    console.error('Erro ao cancelar a compra:', error);
    res.status(500).json({ message: 'Erro ao cancelar a compra' });
  }
};
