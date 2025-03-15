---
sidebar_position: 2
---

# Design Patterns

This guide covers common design patterns and their implementations in JavaScript/TypeScript.

## Creational Patterns

### Singleton Pattern

```javascript
class Database {
  private static instance: Database;
  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public query(sql: string) {
    // Execute query
  }
}

// Usage
const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(db1 === db2); // true
```

### Factory Pattern

```javascript
interface Animal {
  speak(): string;
}

class Dog implements Animal {
  speak() {
    return 'Woof!';
  }
}

class Cat implements Animal {
  speak() {
    return 'Meow!';
  }
}

class AnimalFactory {
  createAnimal(type: string): Animal {
    switch (type.toLowerCase()) {
      case 'dog':
        return new Dog();
      case 'cat':
        return new Cat();
      default:
        throw new Error(`Animal type ${type} not supported`);
    }
  }
}

// Usage
const factory = new AnimalFactory();
const dog = factory.createAnimal('dog');
console.log(dog.speak()); // 'Woof!'
```

## Structural Patterns

### Adapter Pattern

```javascript
// Old interface
class OldPrinter {
  printOld(text: string) {
    console.log(`Old Printer: ${text}`);
  }
}

// New interface
interface ModernPrinter {
  print(text: string): void;
}

// Adapter
class PrinterAdapter implements ModernPrinter {
  private oldPrinter: OldPrinter;

  constructor(oldPrinter: OldPrinter) {
    this.oldPrinter = oldPrinter;
  }

  print(text: string) {
    this.oldPrinter.printOld(text);
  }
}

// Usage
const oldPrinter = new OldPrinter();
const modernPrinter: ModernPrinter = new PrinterAdapter(oldPrinter);
modernPrinter.print('Hello World'); // 'Old Printer: Hello World'
```

### Decorator Pattern

```javascript
interface Coffee {
  cost(): number;
  description(): string;
}

class SimpleCoffee implements Coffee {
  cost() {
    return 10;
  }

  description() {
    return 'Simple coffee';
  }
}

class MilkDecorator implements Coffee {
  private coffee: Coffee;

  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost() + 2;
  }

  description() {
    return `${this.coffee.description()} with milk`;
  }
}

// Usage
let coffee: Coffee = new SimpleCoffee();
coffee = new MilkDecorator(coffee);
console.log(coffee.description()); // 'Simple coffee with milk'
console.log(coffee.cost()); // 12
```

## Behavioral Patterns

### Observer Pattern

```javascript
interface Observer {
  update(data: any): void;
}

class Subject {
  private observers: Observer[] = [];

  public addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  public removeObserver(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  public notify(data: any): void {
    this.observers.forEach(observer => observer.update(data));
  }
}

class NewsAgency extends Subject {
  public publishNews(news: string): void {
    this.notify(news);
  }
}

class NewsChannel implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  update(news: string): void {
    console.log(`${this.name} received news: ${news}`);
  }
}

// Usage
const newsAgency = new NewsAgency();
const channel1 = new NewsChannel('Channel 1');
const channel2 = new NewsChannel('Channel 2');

newsAgency.addObserver(channel1);
newsAgency.addObserver(channel2);
newsAgency.publishNews('Breaking News!');
```

### Strategy Pattern

```javascript
interface PaymentStrategy {
  pay(amount: number): void;
}

class CreditCardPayment implements PaymentStrategy {
  pay(amount: number) {
    console.log(`Paid ${amount} using Credit Card`);
  }
}

class PayPalPayment implements PaymentStrategy {
  pay(amount: number) {
    console.log(`Paid ${amount} using PayPal`);
  }
}

class ShoppingCart {
  private paymentStrategy: PaymentStrategy;

  setPaymentStrategy(strategy: PaymentStrategy) {
    this.paymentStrategy = strategy;
  }

  checkout(amount: number) {
    this.paymentStrategy.pay(amount);
  }
}

// Usage
const cart = new ShoppingCart();
cart.setPaymentStrategy(new CreditCardPayment());
cart.checkout(100); // 'Paid 100 using Credit Card'

cart.setPaymentStrategy(new PayPalPayment());
cart.checkout(200); // 'Paid 200 using PayPal'
```

## Best Practices

1. **Choose the Right Pattern**
   - Don't force patterns where they don't fit
   - Consider the problem's specific requirements
   - Think about future maintenance

2. **Keep It Simple**
   - Start with the simplest solution
   - Add complexity only when needed
   - Document your pattern usage

3. **Consider Performance**
   - Some patterns can impact performance
   - Use patterns judiciously
   - Profile and test implementations

4. **Maintain Flexibility**
   - Design for change
   - Use interfaces over concrete implementations
   - Keep dependencies minimal 