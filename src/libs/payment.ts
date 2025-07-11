import delay from 'delay';

interface CreditCardInfo {
  creditCardNumber: string;
}

interface PaymentResult {
  status: string;
}

export async function charge(creditCardInfo: CreditCardInfo, amount: number): Promise<PaymentResult> {
  console.log(`Charging Credit Card: ${creditCardInfo.creditCardNumber}`);
  console.log(`Amount: ${amount}`);
  await delay(3000);
  return { status: 'success' };
}