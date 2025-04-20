// script.js
document.addEventListener('DOMContentLoaded', () => {
  const scrapeBtn = document.getElementById('scrapeBtn');
  const keywordInput = document.getElementById('keyword');
  const resultsDiv = document.getElementById('results');
  const loadingDiv = document.getElementById('loading');
  const errorDiv = document.getElementById('error');

  scrapeBtn.addEventListener('click', async () => {
    const keyword = keywordInput.value.trim();
    
    if (!keyword) {
      showError('Please enter a search keyword');
      return;
    }

    // Limpar resultados anteriores
    resultsDiv.innerHTML = '';
    errorDiv.classList.add('hidden');
    loadingDiv.classList.remove('hidden');

    try {
      const response = await fetch(`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch data from server');
      }

      const products = await response.json();
      
      if (products.length === 0) {
        showError('No products found. Try a different keyword.');
        return;
      }

      displayResults(products);
    } catch (error) {
      showError(`Error: ${error.message}`);
    } finally {
      loadingDiv.classList.add('hidden');
    }
  });

  function displayResults(products) {
    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.className = 'product';
      
      productElement.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.title}">
        <h3>${product.title}</h3>
        <div class="rating">Rating: ${product.rating}</div>
        <div class="reviews">Reviews: ${product.reviews}</div>
      `;
      
      resultsDiv.appendChild(productElement);
    });
  }

  function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
  }
});
