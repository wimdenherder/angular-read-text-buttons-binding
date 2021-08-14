export const getNameLang = function(langCode: string | undefined) {
  if(!langCode) return langCode;
  return languageCodes[langCode.split('-')[0]]
}

export const languageCodes: any = {
  'nl': 'Dutch',
  'en': 'English',
  "it": 'Italian',
  "sv": 'Swedish',
  "fr": 'French',
  "de": 'German',
  "es": 'Spanish',
  "ro": 'Romanian',
  "ja": 'Japanese',
  'he': 'Hebrew',
  'id': 'Indonesian',
  'pt': 'Portugese',
  'th': 'Thai',
  'sk': 'Slovak',
  'hi': 'Hindi',
  'ar': 'Arabic',
  'hu': 'Hungarian',
  'zh': 'Chinese',
  'el': 'Greek',
  'nb': 'Norway',
  'da': 'Danish',
  'fi': 'Finnish',
  'tr': 'Turkish',
  'ko': 'Korean',
  'pl': 'Polish',
  'cs': 'Czech',
  'ru': 'Russian'
}
