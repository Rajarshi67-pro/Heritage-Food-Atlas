import { describe, it, expect } from 'vitest';
import en from '../locales/en.json';
import hi from '../locales/hi.json';
import bn from '../locales/bn.json';

describe('i18n Localization Suite', () => {
  it('ensures core navigation keys exist across EN, HI, BN dictionaries', () => {
    const requiredNavKeys = ['home', 'map', 'explore', 'festivals', 'ingredients', 'stories', 'trails', 'ai_vision', 'ai_storyteller', 'contribute'];

    for (const key of requiredNavKeys) {
      expect((en.nav as any)[key]).toBeDefined();
      expect((hi.nav as any)[key]).toBeDefined();
      expect((bn.nav as any)[key]).toBeDefined();
      expect(typeof (en.nav as any)[key]).toBe('string');
      expect(typeof (hi.nav as any)[key]).toBe('string');
      expect(typeof (bn.nav as any)[key]).toBe('string');
    }
  });

  it('verifies non-empty tagline and brand names across all 3 languages', () => {
    expect(en.app_name).toBe('Heritage Food Atlas');
    expect(hi.app_name).toContain('हेरिटेज');
    expect(bn.app_name).toContain('হেরিটেজ');

    expect(en.tagline.length).toBeGreaterThan(10);
    expect(hi.tagline.length).toBeGreaterThan(10);
    expect(bn.tagline.length).toBeGreaterThan(10);
  });
});
