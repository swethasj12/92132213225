const tokenSet = new Set();

export function createMiniUrlToken() {
  const chars = 'abcdef1234567890xyz';
  let token = '';
  do {
    token = Array.from({ length: 6 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join('');
  } while (tokenSet.has(token));
  tokenSet.add(token);
  return token;
}
