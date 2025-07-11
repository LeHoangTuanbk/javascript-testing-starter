// Lesson: Writing your first tests
export function max(a: number, b: number): number {
  return a > b ? a : b;
}

// Exercise
export function fizzBuzz(n: number): string {
  if (n % 3 === 0 && n % 5 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";
  return n.toString();
}
