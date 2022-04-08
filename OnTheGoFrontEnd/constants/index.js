import {COLORS, SIZES} from './themes';
import {NativeModules, Platform} from 'react-native';

const appLanguage =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
    : NativeModules.I18nManager.localeIdentifier;

// const deviceLanguage = appLanguage.search(/-|_/g) !== -1
// ? appLanguage.slice(0, 2)
// : appLanguage;

const deviceLanguage='tr'

var date = new Date();
var offsetInHours = date.getHours();

export {COLORS, SIZES, deviceLanguage,offsetInHours};

console.log(deviceLanguage);
