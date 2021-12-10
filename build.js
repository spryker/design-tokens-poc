const StyleDictionary = require('style-dictionary');

console.log('Build started...');
console.log('\n==============================================');



StyleDictionary.registerTransform({
  name: 'spacing/px', 
  type: 'value',
  matcher: function(token) {
      // this is an example of a possible filter (based on the "cti" values) to show how a "matcher" works
      //return token.attributes.category === 'font' || token.attributes.category === 'margin';
      return token.group === 'size' || token.category === 'size' || token.unit === 'pixel' || token.unit === 'pixels';
  },
  transformer: function(token) {
      return `${token.value}px`;
  }
});

StyleDictionary.registerTransform({
  name: 'percent/em', 
  type: 'value',
  matcher: function(token) {
      // this is an example of a possible filter (based on the "cti" values) to show how a "matcher" works
      //return token.attributes.category === 'font' || token.attributes.category === 'margin';
      return token.unit === 'percent';
  },
  transformer: function(token) {
      return `${token.value*0.01}em`;
  }
});

StyleDictionary.registerTransformGroup({
  name: 'custom/less',
  transforms: ['attribute/cti', 'name/cti/kebab', 'color/css', 'spacing/px', 'percent/em']
});

// APPLY THE CONFIGURATION
// IMPORTANT: the registration of custom transforms
// needs to be done _before_ applying the configuration
const StyleDictionaryExtended = StyleDictionary.extend(__dirname + '/config.js');


// FINALLY, BUILD ALL THE PLATFORMS
StyleDictionaryExtended.buildAllPlatforms();


console.log('\n==============================================');
console.log('\nBuild completed!');