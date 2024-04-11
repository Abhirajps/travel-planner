module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin', 
      ['@babel/plugin-proposal-decorators', { legacy: true }], 
      ['module-resolver', {  // Correct format for module-resolver
        root: ['./src'], 
        alias: {
          '^components(.*)$': './src/components/$1',
          '^utils(.*)$': './src/utils/$1'
          // ... Add more aliases as needed 
        }
      }]
    ]
  };
};
