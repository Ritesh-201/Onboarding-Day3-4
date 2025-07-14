class Config {
  constructor() {
    this.settings = {
      api: {
        ninjas: {
          baseUrl: 'https://api.api-ninjas.com/v1',
          key: this.getApiKey(),
          endpoints: {
            quotes: '/quotes',
            jokes: '/jokes',
            facts: '/facts'
          }
        }
      },
      app: {
        name: 'JS Utility Library',
        version: '1.0.0',
        author: 'Your Name'
      },
      defaults: {
        calculator: {
          precision: 10
        },
        todo: {
          maxItems: 100,
          storageKey: 'js_utility_todos'
        },
        game: {
          ticTacToe: {
            storageKey: 'js_utility_tictactoe_score'
          }
        }
      }
    };
  }

  // Get API key from environment or fallback
  getApiKey() {
    // Priority order: 
    // 1. Environment variable (for production)
    // 2. Vite environment variable (for development)
    // 3. Hardcoded fallback (for demo purposes)
    
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_NINJAS_KEY) {
      return import.meta.env.VITE_API_NINJAS_KEY;
    }
    
    if (typeof process !== 'undefined' && process.env && process.env.API_NINJAS_KEY) {
      return process.env.API_NINJAS_KEY;
    }
    
    // Fallback API key for demo purposes
    return 'bNhFoNDS9X05LR70sRnbsQ==SVa8KyTuOra6GDH2';
  }

  // Get configuration value by path
  get(path, fallback = null) {
    const keys = path.split('.');
    let current = this.settings;
    
    for (const key of keys) {
      if (current === null || current === undefined || !current.hasOwnProperty(key)) {
        return fallback;
      }
      current = current[key];
    }
    
    return current;
  }

  // Set configuration value by path
  set(path, value) {
    const keys = path.split('.');
    let current = this.settings;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
  }

  // Get API headers for external requests
  getApiHeaders(service = 'ninjas') {
    const apiKey = this.get(`api.${service}.key`);
    return {
      'X-Api-Key': apiKey,
      'Content-Type': 'application/json'
    };
  }

  // Get full API URL
  getApiUrl(service = 'ninjas', endpoint = '') {
    const baseUrl = this.get(`api.${service}.baseUrl`);
    return `${baseUrl}${endpoint}`;
  }
}

// Create and export global config instance
export const config = new Config();
export default config;
