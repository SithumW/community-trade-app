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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeftRight, 
  Clock, 
  CheckCircle, 
  XCircle, 
  MapPin, 
  MessageCircle,
  Star,
  Calendar,
  User
} from 'lucide-react';
import { mockUsers } from '@/lib/mockData';
import { formatDistanceToNow } from 'date-fns';

const Trades = () => {
  const [activeTab, setActiveTab] = useState('active');

  // Mock trade data
  const mockTrades = [
    {
      id: 'trade1',
      type: 'outgoing',
      status: 'PENDING',
      requestedItem: {
        id: 'item2',
        title: 'MacBook Air 2020',
        image: '/api/placeholder/400/300',
        owner: mockUsers[1]
      },
      offeredItem: {
        id: 'item1',
        title: 'Vintage Leather Jacket',
        image: '/api/placeholder/400/300',
        owner: mockUsers[0]
      },
      requestedAt: '2024-08-29T10:00:00Z',
      location: 'Central Park, NYC'
    },
    {
      id: 'trade2',
      type: 'incoming',
      status: 'PENDING',
      requestedItem: {
        id: 'item4',
        title: 'Organic Garden Starter Kit',
        image: '/api/placeholder/400/300',
        owner: mockUsers[0]
      },
      offeredItem: {
        id: 'item3',
        title: 'Professional Art Supply Set',
        image: '/api/placeholder/400/300',
        owner: mockUsers[2]
      },
      requestedAt: '2024-08-28T15:30:00Z',
      message: 'Hi! I\'d love to trade my art supplies for your garden kit. I\'m just starting gardening and this would be perfect!'
    },
    {
      id: 'trade3',
      type: 'completed',
      status: 'COMPLETED',
      requestedItem: {
        id: 'item5',
        title: 'Board Game Collection',
        image: '/api/placeholder/400/300',
        owner: mockUsers[1]
      },
      offeredItem: {
        id: 'item6',
        title: 'Handmade Ceramic Dinnerware Set',
        image: '/api/placeholder/400/300',
        owner: mockUsers[2]
      },
      requestedAt: '2024-08-20T12:00:00Z',
      completedAt: '2024-08-25T16:00:00Z',
      location: 'Brooklyn Bridge Park',
      rating: 5
    }
  ];

  const pendingTrades = mockTrades.filter(trade => trade.status === 'PENDING');
  const completedTrades = mockTrades.filter(trade => trade.status === 'COMPLETED');
  const incomingRequests = mockTrades.filter(trade => trade.type === 'incoming' && trade.status === 'PENDING');
  const outgoingRequests = mockTrades.filter(trade => trade.type === 'outgoing' && trade.status === 'PENDING');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING': return <Clock className="h-4 w-4 text-warning" />;
      case 'COMPLETED': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'CANCELLED': return <XCircle className="h-4 w-4 text-destructive" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'status-pending';
      case 'COMPLETED': return 'status-completed';
      case 'CANCELLED': return 'status-cancelled';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleAcceptTrade = (tradeId: string) => {
    console.log('Accept trade:', tradeId);
  };

  const handleRejectTrade = (tradeId: string) => {
    console.log('Reject trade:', tradeId);
  };

  const handleCompleteTrade = (tradeId: string) => {
    console.log('Complete trade:', tradeId);
  };

  const TradeCard = ({ trade }: { trade: any }) => (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getStatusIcon(trade.status)}
            <Badge className={getStatusColor(trade.status)}>
              {trade.status}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(trade.requestedAt), { addSuffix: true })}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Trade Items */}
        <div className="flex items-center space-x-4">
          {/* Offered Item */}
          <div className="flex-1">
            <div className="text-sm text-muted-foreground mb-1">
              {trade.type === 'outgoing' ? 'Your item' : 'Their offer'}
            </div>
            <div className="flex items-center space-x-3">
              <img
                src={trade.offeredItem.image}
                alt={trade.offeredItem.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm truncate">{trade.offeredItem.title}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <Avatar className="h-4 w-4">
                    <AvatarImage src={trade.offeredItem.owner.image} />
                    <AvatarFallback className="text-xs">
                      {trade.offeredItem.owner.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">
                    {trade.offeredItem.owner.name}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex-shrink-0">
            <ArrowLeftRight className="h-5 w-5 text-muted-foreground" />
          </div>

          {/* Requested Item */}
          <div className="flex-1">
            <div className="text-sm text-muted-foreground mb-1">
              {trade.type === 'outgoing' ? 'Requested' : 'Your item'}
            </div>
            <div className="flex items-center space-x-3">
              <img
                src={trade.requestedItem.image}
                alt={trade.requestedItem.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm truncate">{trade.requestedItem.title}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <Avatar className="h-4 w-4">
                    <AvatarImage src={trade.requestedItem.owner.image} />
                    <AvatarFallback className="text-xs">
                      {trade.requestedItem.owner.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">
                    {trade.requestedItem.owner.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        {trade.message && (
          <div className="bg-muted p-3 rounded-lg">
            <div className="flex items-start space-x-2">
              <MessageCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-sm">{trade.message}</p>
            </div>
          </div>
        )}

        {/* Location */}
        {trade.location && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{trade.location}</span>
          </div>
        )}

        {/* Completed Date & Rating */}
        {trade.status === 'COMPLETED' && (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                Completed {formatDistanceToNow(new Date(trade.completedAt), { addSuffix: true })}
              </span>
            </div>
            {trade.rating && (
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                <span className="font-medium">{trade.rating}/5</span>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        {trade.status === 'PENDING' && (
          <div className="flex space-x-2 pt-2">
            {trade.type === 'incoming' ? (
              <>
                <Button 
                  variant="success" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleAcceptTrade(trade.id)}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Accept
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleRejectTrade(trade.id)}
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Decline
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Message
                </Button>
                <Button variant="destructive" size="sm" className="flex-1">
                  <XCircle className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
              </>
            )}
          </div>
        )}

        {trade.status === 'COMPLETED' && !trade.rating && (
          <Button variant="outline" size="sm" className="w-full">
            <Star className="h-4 w-4 mr-1" />
            Rate this trade
          </Button>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">My Trades</h1>
        <p className="text-muted-foreground">
          Manage your trade requests and track completed swaps
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Trades</p>
                <p className="text-2xl font-bold">{pendingTrades.length}</p>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Incoming</p>
                <p className="text-2xl font-bold text-warning">{incomingRequests.length}</p>
              </div>
              <User className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Outgoing</p>
                <p className="text-2xl font-bold text-accent">{outgoingRequests.length}</p>
              </div>
              <ArrowLeftRight className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-success">{completedTrades.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">
            Active Trades ({pendingTrades.length})
          </TabsTrigger>
          <TabsTrigger value="incoming">
            Incoming ({incomingRequests.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedTrades.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {pendingTrades.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <ArrowLeftRight className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <div className="text-lg font-medium mb-2">No active trades</div>
                <p className="text-muted-foreground">
                  Your active trade requests and ongoing swaps will appear here
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pendingTrades.map(trade => (
                <TradeCard key={trade.id} trade={trade} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="incoming" className="space-y-4">
          {incomingRequests.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <div className="text-lg font-medium mb-2">No incoming requests</div>
                <p className="text-muted-foreground">
                  Trade requests from other users will appear here
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {incomingRequests.map(trade => (
                <TradeCard key={trade.id} trade={trade} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedTrades.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <div className="text-lg font-medium mb-2">No completed trades</div>
                <p className="text-muted-foreground">
                  Your successful swaps and trade history will appear here
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {completedTrades.map(trade => (
                <TradeCard key={trade.id} trade={trade} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Trades;