export function extractBearerToken(str: string): string | undefined {
  const [type, token] = str.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}
