import { describe, it, expect } from 'vitest';
import prisma from '../lib/prisma';

describe('Dishes & Data Workflow Suite', () => {
  it('retrieves verified dishes with linked states and ingredients from DB', async () => {
    const dishes = await prisma.dish.findMany({
      include: {
        state: true,
        dishIngredients: { include: { ingredient: true } },
      },
    });

    expect(dishes.length).toBeGreaterThan(5);

    const patishapta = dishes.find((d) => d.slug === 'patishapta');
    expect(patishapta).toBeDefined();
    expect(patishapta?.state.name).toBe('West Bengal');
    expect(patishapta?.cuisineType).toBe('Bengali');

    const avial = dishes.find((d) => d.slug === 'avial');
    expect(avial).toBeDefined();
    expect(avial?.state.name).toBe('Kerala');
  });

  it('verifies state culinary zones coverage', async () => {
    const states = await prisma.state.findMany();
    const zones = new Set(states.map((s) => s.zone));

    expect(zones.has('East')).toBe(true);
    expect(zones.has('South')).toBe(true);
    expect(zones.has('West')).toBe(true);
    expect(zones.has('North')).toBe(true);
    expect(zones.has('Northeast')).toBe(true);
  });

  it('validates oral history story associations with dishes', async () => {
    const stories = await prisma.story.findMany({
      where: { status: 'APPROVED' },
      include: { dish: true },
    });

    expect(stories.length).toBeGreaterThan(0);
    const story = stories[0];
    expect(story.storytellerName.length).toBeGreaterThan(2);
    expect(story.content.length).toBeGreaterThan(20);
  });
});
