export function replaceHyphensWithSpaces(input: string): string {
  if (!input) return
  return input.replace(/-/g, ' ');
}
