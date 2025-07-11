import delay from 'delay';

export async function trackPageView(pagePath: string): Promise<void> {
  console.log(`Sending analytics...`);
  console.log(`Path: ${pagePath}`);
  await delay(3000);
}