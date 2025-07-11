// Exercise: Writing good assertions
interface Coupon {
  code: string;
  discount: number;
}

export function getCoupons(): Coupon[] {
  return [
    { code: 'SAVE20NOW', discount: 0.2 },
    { code: 'DISCOUNT50OFF', discount: 0.5 },
  ];
}

// Lesson: Positive and negative testing
export function calculateDiscount(price: number, discountCode: string): number | string {
  if (typeof price !== 'number' || price <= 0) {
    return 'Invalid price';
  }

  if (typeof discountCode !== 'string') {
    return 'Invalid discount code';
  }

  let discount = 0;
  if (discountCode === 'SAVE10') {
    discount = 0.1;
  } else if (discountCode === 'SAVE20') {
    discount = 0.2;
  }

  return price - price * discount;
}

// Exercise: Positive and negative testing
export function validateUserInput(username: string, age: number): string {
  let errors: string[] = [];

  if (typeof username !== 'string' || username.length < 3) {
    errors.push('Invalid username');
  }

  if (typeof age !== 'number' || age < 18) {
    errors.push('Invalid age');
  }

  return errors.length === 0 ? 'Validation successful' : errors.join(', ');
}

// Lesson: Boundary testing
export function isPriceInRange(price: number, min: number, max: number): boolean {
  return price >= min && price <= max;
}

// Exercise: Boundary testing
export function isValidUsername(username: string): boolean {
  const minLength = 5;
  const maxLength = 15;

  return username.length >= minLength && username.length <= maxLength;
}

// Exercise: Boundary testing
export function canDrive(age: number, countryCode: string): boolean | string {
  const legalDrivingAge: Record<string, number> = {
    US: 16,
    UK: 17,
  };

  if (!legalDrivingAge[countryCode]) {
    return 'Invalid country code';
  }

  return age >= legalDrivingAge[countryCode];
}

// Lesson: Testing asynchronous code
export function fetchData(): Promise<number[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [1, 2, 3];
      resolve(data);
    });
  });
}

// Lesson: Setup and teardown
export class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }
    return this.items.pop()!;
  }

  peek(): T {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  clear(): void {
    this.items = [];
  }
}

// Additional exercises
interface Product {
  name: string;
  price: number;
}

interface ProductResult {
  success: boolean;
  error?: { code: string; message: string };
  message?: string;
}

export function createProduct(product: Product): ProductResult {
  if (!product.name)
    return {
      success: false,
      error: { code: 'invalid_name', message: 'Name is missing' },
    };

  if (product.price <= 0)
    return {
      success: false,
      error: { code: 'invalid_price', message: 'Price is missing' },
    };

  return { success: true, message: 'Product was successfully published' };
}

export function isStrongPassword(password: string): boolean {
  // Check the length of the password (minimum 8 characters)
  if (password.length < 8) {
    return false;
  }

  // Check if the password contains at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return false;
  }

  // Check if the password contains at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return false;
  }

  // Check if the password contains at least one digit (number)
  if (!/\d/.test(password)) {
    return false;
  }

  // If all criteria are met, consider the password strong
  return true;
}