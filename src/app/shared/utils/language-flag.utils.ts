const countryLangMap: Record<string, string> = {
  en: 'us',
};

const urlBase = 'https://hatscripts.github.io/circle-flags/flags/';

export const getLanguageFlag = (lang: string) => {
  if (lang in countryLangMap) {
    lang = countryLangMap[lang];
    return `${urlBase}${lang}.svg`;
  }

  return `${urlBase}${lang}.svg`;
};
