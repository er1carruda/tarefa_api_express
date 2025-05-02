const express = require('express');
const cors = require('cors');

// Inicializa o app Express
const app = express();
const port = process.env.PORT || 3000;

// Configuração de middlewares
app.use(cors()); // Habilita CORS para todas as rotas
app.use(express.json()); // Para parsing de JSON no body das requisições

// Rota principal
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando corretamente!' });
});

// Função para obter a data atual em GMT-3
function getCurrentDateGMT3() {
  // Cria uma nova data no fuso horário local
  const now = new Date();
  
  // Obtém a data atual no formato string para garantir consistência
  const today = now.toISOString().split('T')[0];
  
  // Cria uma nova data com a data atual no fuso GMT-3
  // Usamos a hora 12:00 para evitar problemas com mudanças de dia
  const gmt3Date = new Date(`${today}T12:00:00-03:00`);
  
  return gmt3Date;
}

// Rota para retornar a data e hora em GMT -3 (Horário de Brasília)
app.get('/api/datetime', (req, res) => {
  const gmt3Date = getCurrentDateGMT3();
  
  // Formata a data e hora
  const formattedDate = gmt3Date.toISOString().replace('T', ' ').substring(0, 19);
  
  res.json({
    datetime: formattedDate,
    timezone: 'GMT -3',
    description: 'Horário de Brasília'
  });
});

// Rota para verificar se é sexta-feira
app.get('/api/is-friday', (req, res) => {
  const gmt3Date = getCurrentDateGMT3();
  const dayOfWeek = gmt3Date.getDay(); // 0 é domingo, 6 é sábado, 5 é sexta-feira
  
  const isFriday = dayOfWeek === 5;
  
  res.json({
    date: gmt3Date.toISOString().split('T')[0], // Apenas a data YYYY-MM-DD
    timezone: 'GMT -3',
    isFriday: isFriday,
    message: isFriday ? 'É Sexta-Feira, meus casas! 🎉🥳' : 'Não é sexta-feira, meus casas. 😢',
    dayOfWeek: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'][dayOfWeek]
  });
});

// Exemplo de rota GET
app.get('/api/items', (req, res) => {
  const items = [
    { id: 1, nome: 'Item 1' },
    { id: 2, nome: 'Item 2' },
    { id: 3, nome: 'Item 3' }
  ];
  res.json(items);
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});