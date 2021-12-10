const glob = require('fast-glob');

const tokensPath = 'tokens/**/*';
const files = glob
  .sync(tokensPath)
  .map((filePath) => filePath.replace('tokens/', '').replace('.json', ''));

module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    scss: {
      transformGroup: 'custom/less',
      buildPath: 'build/less/',
      files: files.map((filePath) => {
        return {
          destination: `${filePath}.less`,
          format: `less/variables`,
        };
      }),
    }
  }
}
