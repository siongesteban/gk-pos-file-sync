export const log = (...messages: string[]) =>
  console.log(`\n[${new Date().toLocaleString()}]\n${messages.join(' ')}`);
