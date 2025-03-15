---
sidebar_position: 2
---

# Advanced Code Patterns

This page contains advanced programming patterns and examples that demonstrate more complex scenarios and best practices.

## Design Patterns

### Singleton Pattern
```javascript
class DatabaseConnection {
  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }
    
    this.connection = null;
    DatabaseConnection.instance = this;
  }

  async connect() {
    if (!this.connection) {
      this.connection = await this.createConnection();
    }
    return this.connection;
  }

  async createConnection() {
    // Simulate database connection
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ status: 'connected' });
      }, 1000);
    });
  }
}

// Usage
const db1 = new DatabaseConnection();
const db2 = new DatabaseConnection();
console.log(db1 === db2); // true - same instance
```

### Factory Pattern
```javascript
class Button {
  constructor(text, type = 'primary') {
    this.text = text;
    this.type = type;
  }

  render() {
    return `<button class="btn btn-${this.type}">${this.text}</button>`;
  }
}

class ButtonFactory {
  static createButton(type, text) {
    switch (type) {
      case 'primary':
        return new Button(text, 'primary');
      case 'secondary':
        return new Button(text, 'secondary');
      case 'danger':
        return new Button(text, 'danger');
      default:
        throw new Error(`Button type ${type} not supported`);
    }
  }
}

// Usage
const primaryBtn = ButtonFactory.createButton('primary', 'Click me');
const dangerBtn = ButtonFactory.createButton('danger', 'Delete');
console.log(primaryBtn.render()); // <button class="btn btn-primary">Click me</button>
```

## Advanced Array Methods

### Custom Array Methods
```javascript
Array.prototype.groupBy = function(key) {
  return this.reduce((result, item) => {
    const group = item[key];
    result[group] = result[group] || [];
    result[group].push(item);
    return result;
  }, {});
};

// Usage
const users = [
  { id: 1, name: 'John', role: 'admin' },
  { id: 2, name: 'Jane', role: 'user' },
  { id: 3, name: 'Bob', role: 'admin' }
];

const groupedUsers = users.groupBy('role');
console.log(groupedUsers);
// {
//   admin: [{ id: 1, name: 'John', role: 'admin' }, { id: 3, name: 'Bob', role: 'admin' }],
//   user: [{ id: 2, name: 'Jane', role: 'user' }]
// }
```

### Advanced Reduce Operations
```javascript
const transactions = [
  { type: 'deposit', amount: 100 },
  { type: 'withdrawal', amount: 50 },
  { type: 'deposit', amount: 200 },
  { type: 'withdrawal', amount: 75 }
];

const balance = transactions.reduce((acc, transaction) => {
  if (transaction.type === 'deposit') {
    acc.total += transaction.amount;
    acc.deposits += transaction.amount;
  } else {
    acc.total -= transaction.amount;
    acc.withdrawals += transaction.amount;
  }
  return acc;
}, { total: 0, deposits: 0, withdrawals: 0 });

console.log(balance);
// { total: 175, deposits: 300, withdrawals: 125 }
```

## Advanced Async Patterns

### Retry Pattern
```javascript
async function retry(fn, retries = 3, delay = 1000) {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    await new Promise(resolve => setTimeout(resolve, delay));
    return retry(fn, retries - 1, delay);
  }
}

// Usage
async function fetchWithRetry(url) {
  return retry(async () => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  });
}

// Example usage
fetchWithRetry('https://api.example.com/data')
  .then(data => console.log(data))
  .catch(error => console.error('Failed after retries:', error));
```

### Rate Limiting
```javascript
class RateLimiter {
  constructor(maxRequests, timeWindow) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow;
    this.requests = [];
  }

  async waitForSlot() {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.timeWindow);
    
    if (this.requests.length >= this.maxRequests) {
      const oldestRequest = this.requests[0];
      const waitTime = this.timeWindow - (now - oldestRequest);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    this.requests.push(now);
  }
}

// Usage
const limiter = new RateLimiter(3, 1000); // 3 requests per second

async function makeRequest(url) {
  await limiter.waitForSlot();
  return fetch(url);
}

// Example usage
const urls = ['url1', 'url2', 'url3', 'url4'];
Promise.all(urls.map(url => makeRequest(url)))
  .then(responses => console.log('All requests completed'));
```

## Error Handling Patterns

### Custom Error Types
```javascript
class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'NetworkError';
    this.statusCode = statusCode;
  }
}

class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

function handleError(error) {
  if (error instanceof NetworkError) {
    console.error(`Network error (${error.statusCode}): ${error.message}`);
    // Handle network error
  } else if (error instanceof ValidationError) {
    console.error(`Validation error in ${error.field}: ${error.message}`);
    // Handle validation error
  } else {
    console.error('Unexpected error:', error);
    // Handle unexpected error
  }
}

// Usage
try {
  throw new NetworkError('Failed to fetch data', 404);
} catch (error) {
  handleError(error);
}
```

These advanced patterns demonstrate more complex programming concepts and real-world scenarios. Each example includes:
- Detailed comments explaining the pattern
- Practical usage examples
- Error handling where appropriate
- Modern JavaScript features

Feel free to explore more examples in the [Real World Scenarios](./real-world-scenarios) section! 