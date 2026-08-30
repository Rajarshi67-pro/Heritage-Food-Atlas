import { describe, it, expect } from 'vitest';
import { recognizeFoodImage } from '../lib/ai/visionService';
import { askHeritageStoryteller } from '../lib/ai/ragService';

describe('AI Culinary Services Suite', () => {
  it('recognizes traditional dishes via heuristic vision fallback', async () => {
    const fakeBase64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD...';
    const result = await recognizeFoodImage(fakeBase64, 'image/jpeg', 'patishapta_photo.jpg');

    expect(result).toBeDefined();
    expect(result.predictedName).toContain('Patishapta');
    expect(result.confidence).toBeGreaterThan(0.7);
    expect(result.detectedFeatures.length).toBeGreaterThan(0);
    expect(result.matchedDish).not.toBeNull();
  });

  it('answers historical culinary questions grounded in database knowledge', async () => {
    const res = await askHeritageStoryteller('What is the history of Pakhala Bhata in Odisha?');

    expect(res).toBeDefined();
    expect(res.answer.toLowerCase()).toContain('pakhala');
    expect(res.sources.length).toBeGreaterThan(0);
    expect(res.confidence).toBe('HIGH_VERIFIED');
  });

  it('answers harvest and festival questions with ritual context', async () => {
    const res = await askHeritageStoryteller('Why is Pongal associated with harvest?');

    expect(res.answer.toLowerCase()).toContain('pongal');
    expect(res.sources.length).toBeGreaterThan(0);
  });
});
