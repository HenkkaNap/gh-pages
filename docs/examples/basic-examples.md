---
sidebar_position: 1
---

# Basic Code Examples

This page contains basic code examples demonstrating common programming patterns and best practices.

## Array Operations

### Filter and Map
```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Filter even numbers and double them
const evenDoubled = numbers
  .filter(num => num % 2 === 0)
  .map(num => num * 2);

console.log(evenDoubled); // [4, 8, 12, 16, 20]
```

### Reduce
```javascript
const items = [
  { name: 'Apple', price: 1.00 },
  { name: 'Banana', price: 0.50 },
  { name: 'Orange', price: 1.50 }
];

// Calculate total price
const total = items.reduce((sum, item) => sum + item.price, 0);
console.log(total); // 3.00
```

## Object Operations

### Destructuring
```javascript
const user = {
  name: 'John Doe',
  age: 30,
  email: 'john@example.com',
  address: {
    street: '123 Main St',
    city: 'Anytown'
  }
};

// Destructure nested properties
const { name, address: { city } } = user;
console.log(name); // 'John Doe'
console.log(city); // 'Anytown'
```

### Spread Operator
```javascript
const baseConfig = {
  apiUrl: 'https://api.example.com',
  timeout: 5000
};

const developmentConfig = {
  ...baseConfig,
  debug: true,
  timeout: 10000
};

console.log(developmentConfig);
// {
//   apiUrl: 'https://api.example.com',
//   timeout: 10000,
//   debug: true
// }
```

## Async/Await

### Basic Promise
```javascript
async function fetchUserData(userId) {
  try {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    if (!response.ok) {
      throw new Error('User not found');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

// Usage
fetchUserData(123)
  .then(user => console.log(user))
  .catch(error => console.error(error));
```

### Parallel Requests
```javascript
async function fetchMultipleUsers(userIds) {
  try {
    const promises = userIds.map(id => 
      fetch(`https://api.example.com/users/${id}`).then(res => res.json())
    );
    const users = await Promise.all(promises);
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

// Usage
fetchMultipleUsers([1, 2, 3])
  .then(users => console.log(users))
  .catch(error => console.error(error));
```

## Error Handling

### Custom Error Class
```javascript
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

function validateUser(user) {
  if (!user.name) {
    throw new ValidationError('Name is required', 'name');
  }
  if (!user.email) {
    throw new ValidationError('Email is required', 'email');
  }
  return true;
}

// Usage
try {
  validateUser({});
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(`Validation failed for ${error.field}: ${error.message}`);
  }
}
```

These examples demonstrate common patterns and best practices in JavaScript. Each example includes:
- Clear, descriptive comments
- Proper error handling
- Modern JavaScript features
- Clean, readable code structure

Feel free to explore more advanced examples in the [Advanced Patterns](./advanced-patterns) section! 