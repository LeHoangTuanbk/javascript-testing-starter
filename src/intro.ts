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

export function calculateAverage(nums: number[]) {
  const n = nums.length;
  if (n === 0) return NaN;
  return nums.reduce((pre, cur) => pre + cur, 0) / n;
}

export function factorial(n: number) {
  if (n < 0) return undefined;
  let res = 1;
  for (let i = 1; i <= n; i++) {
    res *= i;
  }
  return res;
}
