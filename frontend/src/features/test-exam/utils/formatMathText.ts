const superscriptMap: Record<string, string> = {
  '-': '\u207b',
  '0': '\u2070',
  '1': '\u00b9',
  '2': '\u00b2',
  '3': '\u00b3',
  '4': '\u2074',
  '5': '\u2075',
  '6': '\u2076',
  '7': '\u2077',
  '8': '\u2078',
  '9': '\u2079',
};

const vulgarFractionMap: Record<string, string> = {
  '1/2': '\u00bd',
  '1/3': '\u2153',
  '2/3': '\u2154',
  '1/4': '\u00bc',
  '3/4': '\u00be',
};

export const isMongoIdText = (value: unknown) => /^[a-f\d]{24}$/i.test(String(value || '').trim());

export const normalizeMathText = (value: string) =>
  String(value || '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&amp;/gi, '&')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\u2212/g, '-')
    .replace(/\u00d7/g, 'x')
    .replace(/\u00f7/g, '/')
    .replace(/\bmod\b/gi, 'mod')
    .replace(/\|\s+/g, '|')
    .replace(/\s+\|/g, '|')
    .replace(/([A-Za-z])(\d)(?=\s*[+\-=),.]|$)/g, '$1^$2')
    .replace(/\b([xyabmn])\s*2\b/g, '$1^2')
    .replace(/^[\uFFFD\u25A1\u25A0\s]+(?=[A-Za-z0-9(])/g, '\u222b ')
    .replace(/(\d+\s*[A-Za-z])\s*[\uFFFD\u25A1\u25A0]+\s*(?=\bis equal\b|=|:)/gi, '$1 dx ')
    .replace(/[\uFFFD\u25A1\u25A0]+/g, ' ');

export const formatMathText = (value: string) =>
  normalizeMathText(value)
    .replace(/\btheta\b/gi, '\u03b8')
    .replace(/\balpha\b/gi, '\u03b1')
    .replace(/\bbeta\b/gi, '\u03b2')
    .replace(/\bgamma\b/gi, '\u03b3')
    .replace(/\blambda\b/gi, '\u03bb')
    .replace(/\bomega\b/gi, '\u03c9')
    .replace(/\bDelta\b/g, '\u0394')
    .replace(/\bphi\b/gi, '\u03c6')
    .replace(/\bpi\b/gi, '\u03c0')
    .replace(/\bmu\b/gi, '\u03bc')
    .replace(/\bepsilon\b/gi, '\u03b5')
    .replace(/\bsqrt\(([^)]+)\)/gi, '\u221a($1)')
    .replace(/\bsqrt\s+([A-Za-z0-9]+)/gi, '\u221a$1')
    .replace(/\bintegral\b/gi, '\u222b')
    .replace(/\s*->\s*/g, ' \u2192 ')
    .replace(/\s*<=\s*/g, ' \u2264 ')
    .replace(/\s*>=\s*/g, ' \u2265 ')
    .replace(/\s*\+-\s*/g, ' \u00b1 ')
    .replace(/\bdegrees\b/gi, '\u00b0')
    .replace(/\bdeg\b/gi, '\u00b0')
    .replace(/\^(-?\d+)/g, (_match, power: string) => power.split('').map((char) => superscriptMap[char] || char).join(''))
    .replace(/\b(1\/2|1\/3|2\/3|1\/4|3\/4)\b/g, (match) => vulgarFractionMap[match] || match)
    .replace(/\s+([:;,.])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim();
