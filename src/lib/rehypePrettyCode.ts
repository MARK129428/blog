import { type Options } from 'rehype-pretty-code';

export const rehypePrettyCodeOptions: Options = {
  theme: {
    dark: 'github-dark',
    light: 'github-light',
  },
  keepBackground: false,
  defaultLang: 'plaintext',
  filterMetaString: (str) => str.replace(/filename="[^"]*"/, ''),
};
