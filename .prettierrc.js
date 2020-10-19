module.exports = {
  singleQuote: true,
  printWidth: 120,
  trailingComma: 'all',
  proseWrap: 'never',
  endOfLine: 'lf',
  overrides: [
      {
          files: '.prettierrc',
          options: {
              parser: 'json',
          },
      },
      {
          files: 'document.ejs',
          options: {
              parser: 'html',
          },
      },
  ],  
};
