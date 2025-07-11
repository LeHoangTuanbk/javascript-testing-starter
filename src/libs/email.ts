import delay from 'delay';

export function isValidEmail(email: string): boolean {
  const emailPattern = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

  return emailPattern.test(email);
}

export async function sendEmail(to: string, message: string): Promise<void> {
  console.log(`Sending email to ${to}...`);
  console.log(`Message: ${message}`);
  await delay(3000);
}