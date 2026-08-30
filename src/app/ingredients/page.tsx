import React from 'react';
import prisma from '@/lib/prisma';
import IngredientCard from '@/components/ui/IngredientCard';
import { Metadata } from 'next';
import { Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Traditional Ingredients Explorer — Heritage Food Atlas',
  description: 'Discover indigenous Indian grains, native cold-pressed oils, wild forest sweeteners, and healing spices.',
};

export default async function IngredientsPage() {
  const ingredients = await prisma.ingredient.findMany({
    include: {
      _count: { select: { dishIngredients: true } },
    },
    orderBy: { name: 'asc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-2">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#2A9D8F]/10 text-[#2A9D8F] border border-[#2A9D8F]/20">
          Indigenous Biodiversity
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#1E1B18]">
          Traditional Ingredient Explorer
        </h1>
        <p className="text-sm text-neutral-600 max-w-2xl leading-relaxed">
          From fragrant heirloom rice varieties and wild date-palm jaggery to coastal kokum and bamboo shoots, explore the foundation of regional Indian cooking.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ingredients.map((ing) => (
          <IngredientCard key={ing.id} ingredient={ing as any} />
        ))}
      </div>
    </div>
  );
}
