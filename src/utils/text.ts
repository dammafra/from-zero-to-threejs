export const textFonts = {
  regular: '/fonts/encode-sans-regular.ttf',
  bold: '/fonts/encode-sans-bold.ttf',
}

// Every glyph used by slides: shared so troika generates all SDFs once, during preload
export const textCharacters =
  Array.from({ length: 95 }, (_, i) => String.fromCharCode(32 + i)).join('') + '•↗👆'
