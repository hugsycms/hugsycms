export function strToJson(str: string, defaultReturn: any = {}) {
  if (typeof str == 'string') {
    try {
      if (typeof JSON.parse(str) == 'object') {
        return JSON.parse(str);
      }
    } catch (e) {
      return defaultReturn;
    }
  }
  return defaultReturn;
}

export const jsonToStr = (obj: any) => {
  if (typeof obj === 'object') {
    return JSON.stringify(obj);
  }
  return '';
};
