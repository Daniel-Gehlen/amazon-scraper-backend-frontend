// server.js
import express from 'express';
import axios from 'axios';
import { JSDOM } from 'jsdom';

const app = express();
const PORT = 3000;

// Middleware para permitir CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Rota para scraping
app.get('/api/scrape', async (req, res) => {
  try {
    const keyword = req.query.keyword;
    
    if (!keyword) {
      return res.status(400).json({ error: 'Keyword parameter is required' });
    }

    // Configuração do User-Agent para evitar bloqueio
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    };

    // URL da Amazon com o termo de busca
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;
    
    // Fazendo a requisição para a Amazon
    const response = await axios.get(url, { headers });
    const html = response.data;

    // Parseando o HTML com JSDOM
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Selecionando todos os itens de produtos
    const items = document.querySelectorAll('.s-result-item');

    const products = [];

    items.forEach(item => {
      try {
        // Extraindo título
        const titleElement = item.querySelector('h2 a span');
        const title = titleElement ? titleElement.textContent.trim() : 'No title';

        // Extraindo rating
        const ratingElement = item.querySelector('.a-icon-star-small .a-icon-alt');
        const rating = ratingElement ? ratingElement.textContent.split(' ')[0] : 'No rating';

        // Extraindo número de reviews
        const reviewsElement = item.querySelector('.a-size-small .a-link-normal .a-size-base');
        const reviews = reviewsElement ? reviewsElement.textContent.trim() : '0';

        // Extraindo URL da imagem
        const imageElement = item.querySelector('.s-image');
        const imageUrl = imageElement ? imageElement.src : 'No image';

        // Adicionando apenas produtos válidos
        if (title !== 'No title') {
          products.push({
            title,
            rating,
            reviews,
            imageUrl
          });
        }
      } catch (error) {
        console.error('Error processing one item:', error);
      }
    });

    res.json(products);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to scrape Amazon' });
  }
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
