export function extractGithubUsername(url: string): string {
  const match = url.match(/github.com\/([^\/]+)/);
  return match ? match[1] : "";
}

export function nano2mill(nano: string): number {
  return parseInt(nano) / 1000000;
}