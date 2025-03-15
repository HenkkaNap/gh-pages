---
sidebar_position: 3
---

# Performance Best Practices

This guide covers performance optimization techniques and best practices for JavaScript/TypeScript applications.

## Memory Management

### Memory Leaks Prevention

```javascript
// Bad - Memory leak in event listeners
class Component {
  constructor() {
    document.addEventListener('click', this.handleClick);
  }

  handleClick = () => {
    // Handle click
  }
}

// Good - Proper cleanup
class Component {
  constructor() {
    document.addEventListener('click', this.handleClick);
  }

  handleClick = () => {
    // Handle click
  }

  destroy() {
    document.removeEventListener('click', this.handleClick);
  }
}
```

### Garbage Collection Optimization

```javascript
// Bad - Holding references unnecessarily
let cache = new Map();

function processData(data) {
  cache.set(data.id, data);
  // Process data
}

// Good - Limiting cache size
let cache = new Map();
const MAX_CACHE_SIZE = 1000;

function processData(data) {
  if (cache.size >= MAX_CACHE_SIZE) {
    const oldestKey = cache.keys().next().value;
    cache.delete(oldestKey);
  }
  cache.set(data.id, data);
  // Process data
}
```

## Code Optimization

### Debouncing and Throttling

```javascript
// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Usage
const debouncedSearch = debounce((query) => {
  // Perform search
}, 300);

const throttledScroll = throttle(() => {
  // Handle scroll
}, 100);
```

### Memoization

```javascript
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Usage
const expensiveFunction = (n) => {
  // Expensive calculation
  return n * n;
};

const memoizedExpensiveFunction = memoize(expensiveFunction);
console.log(memoizedExpensiveFunction(4)); // Calculates
console.log(memoizedExpensiveFunction(4)); // Returns cached result
```

## DOM Optimization

### Virtual DOM Implementation

```javascript
class VirtualDOM {
  constructor(type, props, ...children) {
    this.type = type;
    this.props = props;
    this.children = children.flat();
  }

  render() {
    const element = document.createElement(this.type);
    
    // Set properties
    Object.entries(this.props || {}).forEach(([key, value]) => {
      if (key.startsWith('on')) {
        element.addEventListener(key.slice(2).toLowerCase(), value);
      } else {
        element.setAttribute(key, value);
      }
    });

    // Append children
    this.children.forEach(child => {
      const childElement = child instanceof VirtualDOM 
        ? child.render()
        : document.createTextNode(child);
      element.appendChild(childElement);
    });

    return element;
  }
}

// Usage
const vdom = new VirtualDOM('div', { class: 'container' },
  new VirtualDOM('h1', {}, 'Hello'),
  new VirtualDOM('p', {}, 'World')
);

document.body.appendChild(vdom.render());
```

### Batch DOM Updates

```javascript
class DOMBatcher {
  constructor() {
    this.queue = new Set();
    this.pending = false;
  }

  addUpdate(element, updates) {
    this.queue.add({ element, updates });
    if (!this.pending) {
      this.pending = true;
      requestAnimationFrame(() => this.flush());
    }
  }

  flush() {
    this.queue.forEach(({ element, updates }) => {
      updates.forEach(update => {
        const [prop, value] = update;
        element[prop] = value;
      });
    });
    this.queue.clear();
    this.pending = false;
  }
}

// Usage
const batcher = new DOMBatcher();
const element = document.getElementById('myElement');

batcher.addUpdate(element, [
  ['textContent', 'New text'],
  ['className', 'new-class']
]);
```

## Network Optimization

### Request Batching

```javascript
class RequestBatcher {
  constructor(batchTime = 100) {
    this.queue = [];
    this.batchTime = batchTime;
    this.timeout = null;
  }

  add(request) {
    return new Promise((resolve, reject) => {
      this.queue.push({ request, resolve, reject });
      
      if (!this.timeout) {
        this.timeout = setTimeout(() => this.process(), this.batchTime);
      }
    });
  }

  async process() {
    const batch = this.queue;
    this.queue = [];
    this.timeout = null;

    try {
      const responses = await fetch('/batch', {
        method: 'POST',
        body: JSON.stringify(batch.map(item => item.request))
      });
      const results = await responses.json();
      
      batch.forEach((item, index) => {
        item.resolve(results[index]);
      });
    } catch (error) {
      batch.forEach(item => item.reject(error));
    }
  }
}

// Usage
const batcher = new RequestBatcher();

async function makeRequest(data) {
  try {
    const result = await batcher.add(data);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
```

## Best Practices Summary

1. **Memory Management**
   - Clean up event listeners
   - Limit cache sizes
   - Use weak references when appropriate

2. **Code Optimization**
   - Use debouncing and throttling
   - Implement memoization for expensive calculations
   - Optimize loops and recursion

3. **DOM Manipulation**
   - Batch DOM updates
   - Use document fragments
   - Minimize reflows and repaints

4. **Network Requests**
   - Implement request batching
   - Use caching strategies
   - Optimize payload size

5. **Monitoring and Profiling**
   - Use Performance API
   - Monitor memory usage
   - Profile critical paths 