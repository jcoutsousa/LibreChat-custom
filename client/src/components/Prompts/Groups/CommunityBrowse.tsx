import React, { useState, useMemo } from 'react';
import { Search, Heart, Star, TrendingUp } from 'lucide-react';
import { useRecoilValue } from 'recoil';
import { Input, Label } from '@librechat/client';
import ListCard from '~/components/Prompts/Groups/ListCard';
import { useLocalize } from '~/hooks';
import store from '~/store';

// Mock community prompts data - in real app this would come from API
const mockCommunityPrompts = [
  {
    _id: 'community-1',
    name: 'Code Review Assistant',
    category: 'Programming',
    oneliner: 'Helps review code for bugs, best practices, and improvements',
    productionPrompt: { prompt: 'Review this code and suggest improvements...' },
    author: 'Sarah Chen',
    rating: 4.8,
    usageCount: 1240,
    tags: ['code', 'review', 'programming']
  },
  {
    _id: 'community-2', 
    name: 'Email Writer Pro',
    category: 'Writing',
    oneliner: 'Crafts professional emails for any business situation',
    productionPrompt: { prompt: 'Write a professional email for...' },
    author: 'Alex Kumar',
    rating: 4.6,
    usageCount: 892,
    tags: ['email', 'business', 'writing']
  },
  {
    _id: 'community-3',
    name: 'Marketing Copy Creator',
    category: 'Marketing',
    oneliner: 'Generate compelling marketing copy and ad text',
    productionPrompt: { prompt: 'Create marketing copy that...' },
    author: 'Jessica Park',
    rating: 4.9,
    usageCount: 1567,
    tags: ['marketing', 'copy', 'ads']
  },
  {
    _id: 'community-4',
    name: 'Learning Tutor',
    category: 'Education',
    oneliner: 'Explains complex topics in simple, understandable terms',
    productionPrompt: { prompt: 'Explain this topic in simple terms...' },
    author: 'Dr. Michael Rodriguez',
    rating: 4.7,
    usageCount: 2103,
    tags: ['education', 'learning', 'explanation']
  },
  {
    _id: 'community-5',
    name: 'Data Analysis Helper',
    category: 'Analytics',
    oneliner: 'Analyzes data patterns and provides insights',
    productionPrompt: { prompt: 'Analyze this data and find patterns...' },
    author: 'Emma Thompson',
    rating: 4.5,
    usageCount: 734,
    tags: ['data', 'analysis', 'insights']
  },
  {
    _id: 'community-6',
    name: 'Creative Writing Spark',
    category: 'Creative',
    oneliner: 'Generates creative writing prompts and story ideas',
    productionPrompt: { prompt: 'Create a creative writing prompt about...' },
    author: 'Ryan Williams',
    rating: 4.4,
    usageCount: 621,
    tags: ['creative', 'writing', 'stories']
  }
];

const categories = [
  'All Categories',
  'Programming',
  'Writing', 
  'Marketing',
  'Education',
  'Analytics',
  'Creative'
];

export default function CommunityBrowse() {
  const localize = useLocalize();
  const promptFavorites = useRecoilValue(store.promptFavorites);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'recent'>('popular');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredPrompts = useMemo(() => {
    let filtered = [...mockCommunityPrompts];

    // Filter by favorites first if enabled
    if (showFavoritesOnly) {
      filtered = filtered.filter(prompt => promptFavorites.includes(prompt._id));
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(prompt =>
        prompt.name.toLowerCase().includes(query) ||
        prompt.oneliner.toLowerCase().includes(query) ||
        prompt.tags.some(tag => tag.toLowerCase().includes(query)) ||
        prompt.author.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(prompt => 
        prompt.category === selectedCategory
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'recent':
          return b._id.localeCompare(a._id); // Mock recent sorting
        case 'popular':
        default:
          return b.usageCount - a.usageCount;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, sortBy, showFavoritesOnly, promptFavorites]);

  return (
    <div className="flex h-full flex-col p-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-text-primary mb-2">
          Community Prompts
        </h2>
        <p className="text-sm text-text-secondary">
          Discover and use prompts shared by the community
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search prompts, authors, or tags..."
            className="pl-10 bg-surface-primary border-border-light"
          />
        </div>

        {/* Filter Row */}
        <div className="flex flex-wrap gap-3 items-center">
          {/* Category Filter */}
          <div>
            <Label className="text-xs text-text-tertiary mb-1">Category</Label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-md border border-border-light bg-surface-primary text-text-primary text-sm"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div>
            <Label className="text-xs text-text-tertiary mb-1">Sort by</Label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'popular' | 'rating' | 'recent')}
              className="px-3 py-2 rounded-md border border-border-light bg-surface-primary text-text-primary text-sm"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="recent">Most Recent</option>
            </select>
          </div>

          {/* Favorites Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                showFavoritesOnly
                  ? 'bg-red-100 text-red-600 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
                  : 'bg-surface-secondary text-text-secondary hover:bg-surface-tertiary border border-border-light'
              }`}
            >
              <Heart size={14} fill={showFavoritesOnly ? 'currentColor' : 'none'} />
              My Favorites
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto">
        {filteredPrompts.length === 0 && showFavoritesOnly && (
          <div className="text-center py-12">
            <Heart size={48} className="mx-auto text-text-tertiary mb-4" />
            <p className="text-text-secondary">No favorite prompts yet.</p>
            <p className="text-text-tertiary text-sm">Click the heart icon on any prompt to add it to your favorites.</p>
          </div>
        )}

        {filteredPrompts.length === 0 && !showFavoritesOnly && (
          <div className="text-center py-12">
            <Search size={48} className="mx-auto text-text-tertiary mb-4" />
            <p className="text-text-secondary">No prompts found matching your criteria.</p>
            <p className="text-text-tertiary text-sm">Try adjusting your search or filters.</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-3">
          {filteredPrompts.map(prompt => (
            <div key={prompt._id} className="relative">
              <ListCard
                name={prompt.name}
                category={prompt.category}
                promptId={prompt._id}
                snippet={prompt.oneliner}
                onClick={() => {
                  // Handle prompt selection - would integrate with existing submitPrompt logic
                  console.log('Selected community prompt:', prompt);
                }}
              >
                <div className="flex items-center gap-3 text-xs text-text-tertiary">
                  <div className="flex items-center gap-1">
                    <Star size={12} fill="currentColor" className="text-yellow-500" />
                    <span>{prompt.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp size={12} />
                    <span>{prompt.usageCount}</span>
                  </div>
                  <span>by {prompt.author}</span>
                </div>
              </ListCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}