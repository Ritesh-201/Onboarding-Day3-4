import { config } from '../config/index.js';

// API Fetcher class
export class ApiFetcher {
  constructor() {
    this.baseUrl = '';
  }

  async fetchWithTimeout(url, options = {}, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  async fetchQuote() {
    console.log('🔄 Fetching quote from API-Ninjas...');
    this.showLoading();
    try {
      const response = await this.fetchWithTimeout(
        config.getApiUrl('ninjas', '/quotes'),
        {
          headers: config.getApiHeaders('ninjas')
        }
      );
      console.log('✅ Quote response:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📄 Quote data:', data);
      
      // API-Ninjas returns an array
      const quote = Array.isArray(data) ? data[0] : data;
      
      this.showResult(`
        <h3>Random Quote (API-Ninjas)</h3>
        <p>"${quote.quote}"</p>
        <p><strong>- ${quote.author}</strong></p>
        <small>Category: ${quote.category || 'General'}</small>
      `);
    } catch (error) {
      console.error('❌ Quote fetch error:', error);
      this.showError('Failed to fetch quote: ' + error.message);
    }
  }

  async fetchJoke() {
    console.log('🔄 Fetching joke from API-Ninjas...');
    this.showLoading();
    try {
      const response = await this.fetchWithTimeout(
        config.getApiUrl('ninjas', '/jokes'),
        {
          headers: config.getApiHeaders('ninjas')
        }
      );
      console.log('✅ Joke response:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📄 Joke data:', data);
      
      // API-Ninjas returns an array
      const joke = Array.isArray(data) ? data[0] : data;
      
      this.showResult(`
        <h3>Random Joke (API-Ninjas)</h3>
        <p>${joke.joke}</p>
      `);
    } catch (error) {
      console.error('❌ Joke fetch error:', error);
      this.showError('Failed to fetch joke: ' + error.message);
    }
  }

  async fetchFact() {
    console.log('🔄 Fetching fact from API-Ninjas...');
    this.showLoading();
    try {
      const response = await this.fetchWithTimeout(
        config.getApiUrl('ninjas', '/facts'),
        {
          headers: config.getApiHeaders('ninjas')
        }
      );
      console.log('✅ Fact response:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📄 Fact data:', data);
      
      // API-Ninjas returns an array
      const fact = Array.isArray(data) ? data[0] : data;
      
      this.showResult(`
        <h3>Random Fact (API-Ninjas)</h3>
        <p>${fact.fact}</p>
      `);
    } catch (error) {
      console.error('❌ Fact fetch error:', error);
      this.showError('Failed to fetch fact: ' + error.message);
    }
  }

  async fetchQuotesByCategory(categories) {
    console.log('🔄 Fetching quotes for categories:', categories);
    const quotesResult = document.getElementById('quotes-result');
    if (!quotesResult) return;
    
    quotesResult.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Fetching quotes...</div>';
    
    try {
      const quotes = [];
      
      for (const category of categories) {
        try {
          console.log(`🔄 Fetching quote for category: ${category}`);
          const response = await this.fetchWithTimeout(`https://api.quotable.io/random?tags=${category}`);
          console.log(`✅ Response for ${category}:`, response.status);
          
          if (!response.ok) {
            console.warn(`⚠️ Non-OK response for ${category}:`, response.status);
            continue;
          }
          
          const data = await response.json();
          console.log(`📄 Data for ${category}:`, data);
          
          if (data && data.content) {
            quotes.push({
              text: data.content,
              author: data.author,
              category: category
            });
          }
        } catch (error) {
          console.error(`❌ Error fetching ${category}:`, error);
        }
      }
      
      console.log('📊 Final quotes:', quotes);
      
      if (quotes.length > 0) {
        quotesResult.innerHTML = quotes.map(quote => `
          <div class="quote-item">
            <h4>${quote.category.charAt(0).toUpperCase() + quote.category.slice(1)} Quote</h4>
            <blockquote>"${quote.text}"</blockquote>
            <cite>- ${quote.author}</cite>
          </div>
        `).join('');
      } else {
        quotesResult.innerHTML = '<div class="error">No quotes found for the selected categories.</div>';
      }
    } catch (error) {
      console.error('❌ Overall fetch error:', error);
      quotesResult.innerHTML = `<div class="error">Error fetching quotes: ${error.message}</div>`;
    }
  }

  showLoading() {
    const apiContent = document.getElementById('api-content');
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = 'block';
    if (apiContent) apiContent.innerHTML = '';
  }

  showResult(html) {
    const apiContent = document.getElementById('api-content');
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = 'none';
    if (apiContent) apiContent.innerHTML = html;
  }

  showError(message) {
    const apiContent = document.getElementById('api-content');
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = 'none';
    if (apiContent) apiContent.innerHTML = `<div class="error"><i class="fas fa-exclamation-triangle"></i> ${message}</div>`;
  }
}