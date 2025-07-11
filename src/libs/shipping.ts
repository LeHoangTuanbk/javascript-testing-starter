interface ShippingQuote {
  cost: number;
  estimatedDays: number;
}

export function getShippingQuote(destination: string): ShippingQuote {
  console.log(`Getting a shipping quote for ${destination}...`);
  return { cost: 10 * Math.random(), estimatedDays: 2 };
}