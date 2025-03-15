---
sidebar_position: 3
---

# Real World Scenarios

This page contains practical examples of real-world programming scenarios and their solutions.

## Form Validation and Processing

### Complex Form Validation
```javascript
class FormValidator {
  constructor(rules) {
    this.rules = rules;
  }

  validate(formData) {
    const errors = {};
    
    for (const [field, value] of Object.entries(formData)) {
      const fieldRules = this.rules[field];
      if (!fieldRules) continue;

      for (const rule of fieldRules) {
        const error = this.validateRule(value, rule);
        if (error) {
          errors[field] = errors[field] || [];
          errors[field].push(error);
        }
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  validateRule(value, rule) {
    switch (rule.type) {
      case 'required':
        return !value ? 'This field is required' : null;
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) 
          ? 'Please enter a valid email' 
          : null;
      case 'minLength':
        return value.length < rule.value 
          ? `Must be at least ${rule.value} characters` 
          : null;
      case 'custom':
        return rule.validate(value);
      default:
        return null;
    }
  }
}

// Usage
const validator = new FormValidator({
  email: [
    { type: 'required' },
    { type: 'email' }
  ],
  password: [
    { type: 'required' },
    { type: 'minLength', value: 8 }
  ],
  age: [
    { 
      type: 'custom',
      validate: value => value < 18 ? 'Must be 18 or older' : null
    }
  ]
});

const formData = {
  email: 'invalid-email',
  password: '123',
  age: 16
};

const result = validator.validate(formData);
console.log(result);
// {
//   isValid: false,
//   errors: {
//     email: ['Please enter a valid email'],
//     password: ['Must be at least 8 characters'],
//     age: ['Must be 18 or older']
//   }
// }
```

## API Integration

### REST API Client
```javascript
class ApiClient {
  constructor(baseUrl, options = {}) {
    this.baseUrl = baseUrl;
    this.options = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      ...this.options,
      ...options,
      headers: {
        ...this.options.headers,
        ...options.headers
      }
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Convenience methods
  get(endpoint) {
    return this.request(endpoint);
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    });
  }
}

// Usage
const api = new ApiClient('https://api.example.com', {
  headers: {
    'Authorization': 'Bearer token123'
  }
});

// Example API calls
async function fetchUserData() {
  try {
    const user = await api.get('/users/123');
    const posts = await api.get(`/users/${user.id}/posts`);
    return { user, posts };
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  }
}
```

## State Management

### Simple State Manager
```javascript
class StateManager {
  constructor(initialState = {}) {
    this.state = initialState;
    this.listeners = new Set();
  }

  getState() {
    return { ...this.state };
  }

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState
    };
    this.notifyListeners();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.getState()));
  }
}

// Usage
const store = new StateManager({
  user: null,
  isAuthenticated: false,
  theme: 'light'
});

// Subscribe to state changes
const unsubscribe = store.subscribe(state => {
  console.log('State updated:', state);
});

// Update state
store.setState({
  user: { id: 1, name: 'John' },
  isAuthenticated: true
});

// Unsubscribe when done
unsubscribe();
```

## File Processing

### CSV Parser
```javascript
class CSVParser {
  constructor(options = {}) {
    this.options = {
      delimiter: ',',
      headers: true,
      ...options
    };
  }

  parse(csvString) {
    const lines = csvString.split('\n').filter(line => line.trim());
    const result = [];
    
    if (this.options.headers) {
      const headers = this.parseLine(lines[0]);
      for (let i = 1; i < lines.length; i++) {
        const values = this.parseLine(lines[i]);
        const row = {};
        headers.forEach((header, index) => {
          row[header] = values[index];
        });
        result.push(row);
      }
    } else {
      for (const line of lines) {
        result.push(this.parseLine(line));
      }
    }

    return result;
  }

  parseLine(line) {
    return line
      .split(this.options.delimiter)
      .map(value => value.trim())
      .map(value => {
        // Handle quoted values
        if (value.startsWith('"') && value.endsWith('"')) {
          return value.slice(1, -1);
        }
        return value;
      });
  }
}

// Usage
const csv = `name,age,email
John Doe,30,john@example.com
Jane Smith,25,jane@example.com`;

const parser = new CSVParser();
const data = parser.parse(csv);
console.log(data);
// [
//   { name: 'John Doe', age: '30', email: 'john@example.com' },
//   { name: 'Jane Smith', age: '25', email: 'jane@example.com' }
// ]
```

These real-world scenarios demonstrate practical solutions to common programming challenges. Each example includes:
- Robust error handling
- Clean and maintainable code structure
- Practical use cases
- Modern JavaScript features and patterns

Feel free to explore more examples in our other sections! 