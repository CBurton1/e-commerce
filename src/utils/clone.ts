export function cloneDeep(array: any) {
  return JSON.parse(JSON.stringify(array));
}