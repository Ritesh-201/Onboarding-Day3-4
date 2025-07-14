import { config } from '../config/index.js';

// Promise utilities
export const promiseUtils = {
  // Fallback quotes for demo purposes
  getFallbackQuotes: (count) => {
    const fallbackQuotes = [
      { quote: "The best way to predict the future is to create it.", author: "Peter Drucker" },
      { quote: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
      { quote: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
      { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
      { quote: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
      { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
      { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" }
    ];
    
    return fallbackQuotes.slice(0, count).map((quote, index) => ({
      ...quote,
      id: index + 1
    }));
  },

  fetchMultipleQuotes: async (count = 3) => {
    console.log(`🚀 Starting to fetch ${count} quotes...`);
    // Create multiple promise requests to demonstrate Promise.all
    const promises = [];
    
    for (let i = 0; i < count; i++) {
      promises.push(
        fetch(config.getApiUrl('ninjas', '/quotes'), {
          method: 'GET',
          headers: config.getApiHeaders('ninjas')
        }).then(response => {
          console.log(`📡 Response ${i + 1} status:`, response.status);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        }).then(data => {
          console.log(`📝 Quote data ${i + 1}:`, data);
          // API-Ninjas returns an array of quotes
          if (Array.isArray(data) && data.length > 0) {
            const quote = data[0]; // Get first quote
            return {
              quote: quote.quote,
              author: quote.author,
              id: i + 1
            };
          }
          throw new Error('No quote data received');
        }).catch(error => {
          console.error(`❌ Error in promise ${i + 1}:`, error);
          // Return fallback quote instead of throwing
          const fallbacks = promiseUtils.getFallbackQuotes(count);
          return fallbacks[i] || { 
            quote: "Demo quote: Promise.all allows concurrent execution.", 
            author: "JS Utility Library", 
            id: i + 1 
          };
        })
      );
    }
    
    try {
      // Use Promise.all to fetch all quotes concurrently
      console.log('🔄 Executing Promise.all...');
      const quotes = await Promise.all(promises);
      console.log('✅ All quotes fetched:', quotes);
      return quotes;
    } catch (error) {
      console.error('💥 Error fetching quotes, using fallback:', error);
      // Return fallback quotes to demonstrate Promise.all functionality
      return promiseUtils.getFallbackQuotes(count);
    }
  }
};