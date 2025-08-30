import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MapPin, ArrowLeftRight, Eye } from 'lucide-react';
import { Item } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

interface ItemCardProps {
  item: Item;
  showTradeButton?: boolean;
  onTradeRequest?: (item: Item) => void;
}

const ItemCard = ({ item, showTradeButton = true, onTradeRequest }: ItemCardProps) => {
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'NEW': return 'bg-success/10 text-success border-success/20';
      case 'GOOD': return 'bg-primary/10 text-primary border-primary/20';
      case 'FAIR': return 'bg-warning/10 text-warning border-warning/20';
      case 'POOR': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return 'bg-success/10 text-success border-success/20';
      case 'RESERVED': return 'bg-warning/10 text-warning border-warning/20';
      case 'SWAPPED': return 'bg-accent/10 text-accent border-accent/20';
      case 'REMOVED': return 'bg-muted text-muted-foreground border-muted';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden bg-gradient-card border-border/50 hover:border-primary/30">
      <div className="relative">
        <Link to={`/items/${item.id}`}>
          <div className="aspect-[4/3] overflow-hidden">
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
              className={`${getStatusColor(item.status)} font-medium`}
            >
              {item.status}
            </Badge>
          </div>

          {/* Favorite Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-3 right-3 bg-background/80 hover:bg-background/90 backdrop-blur-sm"
            onClick={(e) => {
              e.preventDefault();
              // Handle favorite toggle
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <CardContent className="p-4">
        <Link to={`/items/${item.id}`}>
          <div className="space-y-3">
            {/* Title and Category */}
            <div className="space-y-1">
              <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {item.category}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getConditionColor(item.condition)}`}
                >
                  {item.condition}
                </Badge>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {item.description}
            </p>

            {/* Owner Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={item.user.image} />
                  <AvatarFallback className="text-xs">
                    {item.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{item.user.name}</span>
              </div>
              
              {item.latitude && item.longitude && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  Nearby
                </div>
              )}
            </div>

            {/* Posted Time */}
            <div className="text-xs text-muted-foreground">
              Posted {formatDistanceToNow(new Date(item.posted_at), { addSuffix: true })}
            </div>
          </div>
        </Link>
      </CardContent>

      {showTradeButton && item.status === 'AVAILABLE' && (
        <CardFooter className="p-4 pt-0 space-y-2">
          <div className="flex space-x-2 w-full">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              asChild
            >
              <Link to={`/items/${item.id}`}>
                <Eye className="h-4 w-4 mr-1" />
                View Details
              </Link>
            </Button>
            
            <Button 
              variant="trade" 
              size="sm" 
              className="flex-1"
              onClick={() => onTradeRequest?.(item)}
            >
              <ArrowLeftRight className="h-4 w-4 mr-1" />
              Trade Request
            </Button>
          </div>
          
          {item._count && item._count.trade_requests_for > 0 && (
            <div className="text-xs text-muted-foreground text-center">
              {item._count.trade_requests_for} pending request{item._count.trade_requests_for !== 1 ? 's' : ''}
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default ItemCard;