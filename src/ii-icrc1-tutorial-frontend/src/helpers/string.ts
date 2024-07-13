export function extractGithubUsername(url: string): string {
  const match = url.match(/github.com\/([^\/]+)/);
  return match ? match[1] : "";
}