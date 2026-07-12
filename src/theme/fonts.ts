import {
  useFonts,
  Newsreader_300Light,
  Newsreader_300Light_Italic,
} from '@expo-google-fonts/newsreader';
import {
  JetBrainsMono_500Medium,
  JetBrainsMono_700Bold,
} from '@expo-google-fonts/jetbrains-mono';
import {
  Manrope_500Medium,
  Manrope_600SemiBold,
} from '@expo-google-fonts/manrope';

// Display font is Reckless Neue Light in the source design (paid, no CDN).
// Newsreader 300 is the documented fallback — see FONTS.md. Swap fontFamily
// values below to "Reckless Neue" once licensed files are added.
export const fontFamily = {
  display: 'Newsreader_300Light',
  displayItalic: 'Newsreader_300Light_Italic',
  mono: 'JetBrainsMono_500Medium',
  monoBold: 'JetBrainsMono_700Bold',
  body: 'Manrope_500Medium',
  bodySemiBold: 'Manrope_600SemiBold',
};

export function useCuratoFonts() {
  return useFonts({
    Newsreader_300Light,
    Newsreader_300Light_Italic,
    JetBrainsMono_500Medium,
    JetBrainsMono_700Bold,
    Manrope_500Medium,
    Manrope_600SemiBold,
  });
}
