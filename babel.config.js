module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    ['@babel/plugin-proposal-decorators', {legacy: true}]
  ]
  // In contrast to MobX 4/5, "loose" must be false!    ^
};
