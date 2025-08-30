import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ItemCard from '@/components/items/ItemCard';
import { Plus, Edit, Trash2, Package, Eye, MessageCircle } from 'lucide-react';
import { mockItems } from '@/lib/mockData';
import { ItemStatus } from '@/lib/types';

const MyItems = () => {
  const [statusFilter, setStatusFilter] = useState<ItemStatus | 'ALL'>('ALL');
  
  // Mock user items (in real app, would filter by user ID)
  const userItems = mockItems.filter(item => item.user_id === 'user1');
  
  const filteredItems = statusFilter === 'ALL' 
    ? userItems 
    : userItems.filter(item => item.status === statusFilter);

  const getStatusStats = () => {
    return {
      AVAILABLE: userItems.filter(item => item.status === 'AVAILABLE').length,
      RESERVED: userItems.filter(item => item.status === 'RESERVED').length,
      SWAPPED: userItems.filter(item => item.status === 'SWAPPED').length,
      REMOVED: userItems.filter(item => item.status === 'REMOVED').length,
    };
  };

  const stats = getStatusStats();

  const handleEditItem = (itemId: string) => {
    console.log('Edit item:', itemId);
    // Navigate to edit form
  };

  const handleDeleteItem = (itemId: string) => {
    console.log('Delete item:', itemId);
    // Show confirmation dialog
  };

  const handleStatusChange = (itemId: string, newStatus: ItemStatus) => {
    console.log('Change status:', itemId, newStatus);
    // API call to update status
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Items</h1>
          <p className="text-muted-foreground">
            Manage your items and track trade requests
          </p>
        </div>
        <Button variant="trade" size="lg" className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add New Item
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Available</p>
                <p className="text-2xl font-bold text-success">{stats.AVAILABLE}</p>
              </div>
              <div className="h-8 w-8 bg-success/10 rounded-full flex items-center justify-center">
                <Package className="h-4 w-4 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reserved</p>
                <p className="text-2xl font-bold text-warning">{stats.RESERVED}</p>
              </div>
              <div className="h-8 w-8 bg-warning/10 rounded-full flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Swapped</p>
                <p className="text-2xl font-bold text-accent">{stats.SWAPPED}</p>
              </div>
              <div className="h-8 w-8 bg-accent/10 rounded-full flex items-center justify-center">
                <Eye className="h-4 w-4 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold">{userItems.length}</p>
              </div>
              <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Package className="h-4 w-4 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Filter by status:</span>
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ItemStatus | 'ALL')}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Items</SelectItem>
                  <SelectItem value="AVAILABLE">Available</SelectItem>
                  <SelectItem value="RESERVED">Reserved</SelectItem>
                  <SelectItem value="SWAPPED">Swapped</SelectItem>
                  <SelectItem value="REMOVED">Removed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Showing {filteredItems.length} of {userItems.length} items
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items List */}
      {filteredItems.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <div className="text-lg font-medium mb-2">
              {statusFilter === 'ALL' ? 'No items yet' : `No ${statusFilter.toLowerCase()} items`}
            </div>
            <p className="text-muted-foreground mb-4">
              {statusFilter === 'ALL' 
                ? 'Start by adding your first item to trade with the community'
                : `You don't have any ${statusFilter.toLowerCase()} items at the moment`
              }
            </p>
            {statusFilter === 'ALL' && (
              <Button variant="trade">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Item
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <Card key={item.id} className="group hover:shadow-lg transition-all duration-300">
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                  <img
                    src={item.images[0]?.url || '/api/placeholder/400/300'}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                
                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <Badge 
                    variant="secondary" 
                    className={`status-${item.status.toLowerCase()}`}
                  >
                    {item.status}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="flex space-x-1">
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="h-8 w-8 bg-background/90 hover:bg-background"
                      onClick={() => handleEditItem(item.id)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg leading-tight">{item.title}</h3>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {item.condition}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>

                  {item._count && item._count.trade_requests_for > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Trade Requests:</span>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {item._count.trade_requests_for}
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
              
              <div className="p-4 pt-0 space-y-2">
                {/* Quick Status Change */}
                {item.status === 'AVAILABLE' && (
                  <Select 
                    value={item.status} 
                    onValueChange={(value) => handleStatusChange(item.id, value as ItemStatus)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AVAILABLE">Available</SelectItem>
                      <SelectItem value="REMOVED">Remove from listing</SelectItem>
                    </SelectContent>
                  </Select>
                )}
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button variant="default" size="sm" className="flex-1">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyItems;