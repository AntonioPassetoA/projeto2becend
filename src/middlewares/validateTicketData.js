//validateTicketData.js

exports.validateTicketData = (req, res, next) => {
    const { nome, preco, quantidadeDisponivel } = req.body;
  
    // Verificar se todos os campos obrigatórios estão presentes
    if (!nome || !preco || quantidadeDisponivel === undefined) {
      return res.status(400).json({ message: 'Campos nome, preço e quantidadeDisponivel são obrigatórios' });
    }
  
    // Verificar se o preço é um número válido
    if (isNaN(preco) || preco <= 0) {
      return res.status(400).json({ message: 'Preço deve ser um número válido e maior que 0' });
    }
  
    // Verificar se a quantidade disponível é um número válido
    if (isNaN(quantidadeDisponivel) || quantidadeDisponivel < 0) {
      return res.status(400).json({ message: 'Quantidade disponível deve ser um número válido e não negativo' });
    }
  
    next(); // Dados válidos, passa para o próximo middleware
  };
  