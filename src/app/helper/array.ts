export const uniqueArray = (array: any[]) => {
  return array.filter((item: any, pos: number) => pos === array.indexOf(item));
}

export const uniqueArrayFilterOnKey = (array: any[], key: string) => {
  return array.filter((item: any, pos: number) => pos === array.map(item2=>item2[key]).indexOf(item[key]));
}

export const sortAlphabeticallyOnKey = (key:any) => (a: any, b: any) => a[key] - b[key];
