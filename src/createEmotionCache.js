// src/createEmotionCache.js
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

/**
 * Emotion cache for MUI with RTL support.
 * Exported as default so you can `import cacheRtl from './createEmotionCache'`.
 */
export default function createEmotionCache() {
  return createCache({
    key: 'mui',
    stylisPlugins: [prefixer, rtlPlugin],
  });
}
