---
sidebar_position: 1
---

# Coding Standards

This guide outlines our recommended coding standards and best practices for writing clean, maintainable code.

## Naming Conventions

### Variables and Functions

```javascript
// Good
const userName = 'John';
const isActive = true;
function calculateTotal(items) { }

// Bad
const u = 'John';
const flag = true;
function calc(x) { }
```

### Classes and Interfaces

```javascript
// Good
class UserProfile {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

interface UserData {
  id: string;
  name: string;
}

// Bad
class user_profile { }
interface userdata { }
```

## Code Organization

### File Structure
```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── Button.css
│   └── Card/
│       ├── Card.tsx
│       ├── Card.test.tsx
│       └── Card.css
├── utils/
│   ├── validation.ts
│   └── formatting.ts
└── services/
    ├── api.ts
    └── auth.ts
```

### Module Organization

```javascript
// imports
import React from 'react';
import { useEffect, useState } from 'react';

// types/interfaces
interface Props {
  title: string;
}

// constants
const MAX_ITEMS = 10;

// component/class definition
export function Component({ title }: Props) {
  // implementation
}

// helper functions
function helperFunction() {
  // implementation
}
```

## Code Style

### Indentation and Spacing

```javascript
// Good
function calculate(a, b) {
  const result = a + b;
  return result;
}

const obj = {
  prop1: 'value1',
  prop2: 'value2'
};

// Bad
function calculate(a,b){
const result=a+b;
return result;
}

const obj={prop1:'value1',prop2:'value2'};
```

### Comments and Documentation

```javascript
/**
 * Calculates the total price including tax
 * @param {number} price - The base price
 * @param {number} taxRate - The tax rate (decimal)
 * @returns {number} The total price with tax
 */
function calculateTotalWithTax(price, taxRate) {
  // Validate inputs
  if (typeof price !== 'number' || typeof taxRate !== 'number') {
    throw new Error('Price and tax rate must be numbers');
  }

  // Calculate tax amount
  const taxAmount = price * taxRate;

  // Return total with tax
  return price + taxAmount;
}
```

## Error Handling

### Try-Catch Blocks

```javascript
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Re-throw for handling by caller
  }
}
```

### Error Types

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
}
```

## Testing

### Unit Tests

```javascript
describe('calculateTotalWithTax', () => {
  it('should calculate total with tax correctly', () => {
    expect(calculateTotalWithTax(100, 0.1)).toBe(110);
  });

  it('should throw error for invalid inputs', () => {
    expect(() => calculateTotalWithTax('100', 0.1)).toThrow();
  });
});
```

### Integration Tests

```javascript
describe('UserAPI', () => {
  it('should fetch user data successfully', async () => {
    const user = await fetchUserData('123');
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
  });
});
```

## Performance Considerations

### Memory Management

```javascript
// Good - Clean up resources
useEffect(() => {
  const subscription = dataSource.subscribe();
  return () => {
    subscription.unsubscribe();
  };
}, []);

// Bad - Memory leak
useEffect(() => {
  const subscription = dataSource.subscribe();
}, []);
```

### Optimization

```javascript
// Good - Memoize expensive calculations
const memoizedValue = useMemo(() => {
  return expensiveCalculation(prop);
}, [prop]);

// Bad - Recalculate on every render
const value = expensiveCalculation(prop);
```

Remember:
- Consistency is key
- Code should be self-documenting
- Follow the principle of least surprise
- Write code for humans first, computers second 