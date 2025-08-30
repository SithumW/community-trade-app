import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ItemCard from '@/components/items/ItemCard';
import { Filter, SlidersHorizontal, Grid, List, MapPin } from 'lucide-react';
import { mockItems, categories } from '@/lib/mockData';
import { Item, ItemCondition } from '@/lib/types';

const Browse = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCondition, setSelectedCondition] = useState<ItemCondition | 'all'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'alphabetical' | 'distance'>('recent');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let items = [...mockItems];

    // Filter by search query
    if (searchQuery) {
      items = items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'all') {
      items = items.filter(item => item.category === selectedCategory);
    }

    // Filter by condition
    if (selectedCondition && selectedCondition !== 'all') {
      items = items.filter(item => item.condition === selectedCondition);
    }

    // Sort items
    switch (sortBy) {
      case 'alphabetical':
        items.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'distance':
        // Mock sorting by distance - in real app would use actual coordinates
        items.sort((a, b) => (a.latitude || 0) - (b.latitude || 0));
        break;
      case 'recent':
      default:
        items.sort((a, b) => new Date(b.posted_at).getTime() - new Date(a.posted_at).getTime());
        break;
    }

    return items;
  }, [searchQuery, selectedCategory, selectedCondition, sortBy]);

  const handleTradeRequest = (item: Item) => {
    console.log('Trade request for:', item.title);
    // In real app, would open trade request modal
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedCondition('all');
    setSortBy('recent');
  };

  const activeFilters = [
    selectedCategory && selectedCategory !== 'all' && `Category: ${selectedCategory}`,
    selectedCondition && selectedCondition !== 'all' && `Condition: ${selectedCondition}`,
    searchQuery && `Search: "${searchQuery}"`,
    sortBy !== 'recent' && `Sort: ${sortBy}`
  ].filter(Boolean);

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="bg-gradient-hero text-white border-0 overflow-hidden relative">
        <div className="absolute inset-0 bg-black/10" />
        <CardHeader className="relative z-10 text-center py-12">
          <CardTitle className="text-3xl md:text-4xl font-bold mb-2">
            Welcome to Swappo
          </CardTitle>
          <CardDescription className="text-white/90 text-lg max-w-2xl mx-auto">
            Trade items with your community. Reduce waste, save money, and build connections
            through sustainable swapping.
          </CardDescription>
          <div className="flex justify-center gap-4 mt-6">
            <Button variant="secondary" size="lg" className="shadow-lg">
              Start Trading
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              Learn More
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <Input
                placeholder="Search items, categories, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Condition Filter */}
            <Select value={selectedCondition} onValueChange={(value) => setSelectedCondition(value as ItemCondition | 'all')}>
              <SelectTrigger className="w-full lg:w-36">
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conditions</SelectItem>
                <SelectItem value="NEW">New</SelectItem>
                <SelectItem value="GOOD">Good</SelectItem>
                <SelectItem value="FAIR">Fair</SelectItem>
                <SelectItem value="POOR">Poor</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as 'recent' | 'alphabetical' | 'distance')}>
              <SelectTrigger className="w-full lg:w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="alphabetical">Alphabetical</SelectItem>
                <SelectItem value="distance">Distance</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode Toggle */}
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="text-sm font-medium">Active filters:</span>
              {activeFilters.map((filter, index) => (
                <Badge key={index} variant="secondary" className="px-2 py-1">
                  {filter}
                </Badge>
              ))}
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          Available Items ({filteredItems.length})
        </h2>
        <Button variant="outline" size="sm">
          <MapPin className="h-4 w-4 mr-2" />
          Map View
        </Button>
      </div>

      {/* Items Grid/List */}
      {filteredItems.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="text-muted-foreground text-lg mb-2">No items found</div>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search criteria or filters
            </p>
            <Button variant="outline" className="mt-4" onClick={clearFilters}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
        }>
          {filteredItems.map(item => (
            <ItemCard
              key={item.id}
              item={item}
              onTradeRequest={handleTradeRequest}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Browse;