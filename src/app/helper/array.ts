import { languageCodes } from '../lib/languageCodes';
import { getNameLang } from '../lib/languageCodes';

export const uniqueArray = (array: any[]) => {
  return array.filter((item: any, pos: number) => pos === array.indexOf(item));
}

export const uniqueArrayFilterOnKey = (array: any[], key: string) => {
  return array.filter((item: any, pos: number) => pos === array.map(item2=>item2[key]).indexOf(item[key]));
}

export const sortAlphabeticallyOnKey = (key:any) => (a: any, b: any) => a[key] - b[key];

export const uniqueArrayFilterOnLanguageWithoutDialect = (array: any[]) => {
  return array.filter((item: any, pos: number) => pos === array.map(item2=>item2.lang.split('-')[0]).indexOf(item.lang.split('-')[0]));
}

export const sortAlphabeticallyOnLanguageWithoutDialect = (voice1: any, voice2: any) => getNameLang(voice1.lang) > getNameLang(voice2.lang) ? 1 : -1;
