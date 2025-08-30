import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Edit,
  MapPin,
  Calendar,
  Star,
  Award,
  Package,
  ArrowLeftRight,
  MessageCircle,
  TrendingUp,
  Users,
  Heart
} from 'lucide-react';
import { mockUsers, badgeInfo } from '@/lib/mockData';
import { formatDistanceToNow, format } from 'date-fns';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const currentUser = mockUsers[0]; // Mock current user

  // Calculate badge progress
  const getBadgeProgress = () => {
    const points = currentUser.loyalty_points;
    if (points < 100) return { next: 'SILVER', progress: (points / 100) * 100, needed: 100 - points };
    if (points < 300) return { next: 'GOLD', progress: ((points - 100) / 200) * 100, needed: 300 - points };
    if (points < 600) return { next: 'DIAMOND', progress: ((points - 300) / 300) * 100, needed: 600 - points };
    if (points < 1000) return { next: 'RUBY', progress: ((points - 600) / 400) * 100, needed: 1000 - points };
    return { next: 'MAX', progress: 100, needed: 0 };
  };

  const badgeProgress = getBadgeProgress();

  // Mock stats and activity data
  const stats = {
    totalTrades: 15,
    successfulTrades: 14,
    averageRating: 4.8,
    totalRatings: 18,
    responseTime: '2 hours',
    joinedDate: new Date(currentUser.createdAt),
    lastActive: new Date(),
    favoriteCategories: ['Electronics', 'Fashion', 'Books']
  };

  const recentActivity = [
    {
      type: 'trade_completed',
      description: 'Completed trade with Mike Johnson',
      date: '2024-08-28T10:00:00Z',
      icon: ArrowLeftRight,
      color: 'text-success'
    },
    {
      type: 'item_posted',
      description: 'Posted new item: Organic Garden Starter Kit',
      date: '2024-08-27T14:30:00Z',
      icon: Package,
      color: 'text-primary'
    },
    {
      type: 'review_received',
      description: 'Received 5-star review from Emma Wilson',
      date: '2024-08-26T09:15:00Z',
      icon: Star,
      color: 'text-warning'
    },
    {
      type: 'badge_earned',
      description: 'Earned Gold Trader badge!',
      date: '2024-08-25T16:00:00Z',
      icon: Award,
      color: 'text-secondary'
    }
  ];

  const achievements = [
    {
      title: 'First Trade',
      description: 'Complete your first successful trade',
      earned: true,
      earnedDate: '2024-01-20T10:00:00Z',
      icon: ArrowLeftRight
    },
    {
      title: 'Community Builder',
      description: 'Help 10 community members with trades',
      earned: true,
      earnedDate: '2024-06-15T10:00:00Z',
      icon: Users
    },
    {
      title: 'Highly Rated',
      description: 'Maintain 4.5+ star rating with 10+ reviews',
      earned: true,
      earnedDate: '2024-07-01T10:00:00Z',
      icon: Star
    },
    {
      title: 'Popular Trader',
      description: 'Receive 50+ favorites on your items',
      earned: false,
      progress: 32,
      target: 50,
      icon: Heart
    },
    {
      title: 'Category Expert',
      description: 'Complete 20+ trades in a single category',
      earned: false,
      progress: 12,
      target: 20,
      icon: Award
    }
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            {/* Avatar */}
            <Avatar className="h-24 w-24 ring-4 ring-primary/20">
              <AvatarImage src={currentUser.image} />
              <AvatarFallback className="text-2xl font-bold">
                {currentUser.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            {/* User Info */}
            <div className="flex-1 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold">{currentUser.name}</h1>
                  <p className="text-muted-foreground flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4" />
                    Member since {format(stats.joinedDate, 'MMMM yyyy')}
                  </p>
                </div>
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              {/* Bio */}
              <p className="text-sm leading-relaxed">{currentUser.bio}</p>

              {/* Location */}
              {currentUser.latitude && currentUser.longitude && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  New York, NY
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badge and Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Badge */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Current Badge</h3>
                <Badge className={`${badgeInfo[currentUser.badge].color} font-medium`}>
                  <Award className="h-3 w-3 mr-1" />
                  {badgeInfo[currentUser.badge].name}
                </Badge>
              </div>
              <div className="text-2xl font-bold text-primary">
                {currentUser.loyalty_points} Points
              </div>
              <p className="text-sm text-muted-foreground">
                {badgeInfo[currentUser.badge].points} points range
              </p>
            </div>

            {/* Next Badge Progress */}
            {badgeProgress.next !== 'MAX' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Next Badge</h3>
                  <Badge variant="outline" className={badgeInfo[badgeProgress.next as keyof typeof badgeInfo].color}>
                    {badgeInfo[badgeProgress.next as keyof typeof badgeInfo].name}
                  </Badge>
                </div>
                <Progress value={badgeProgress.progress} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  {badgeProgress.needed} more points to reach {badgeInfo[badgeProgress.next as keyof typeof badgeInfo].name}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Trades</p>
                <p className="text-2xl font-bold">{stats.totalTrades}</p>
              </div>
              <ArrowLeftRight className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-success">
                  {Math.round((stats.successfulTrades / stats.totalTrades) * 100)}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold text-warning">{stats.averageRating}</p>
              </div>
              <Star className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Items</p>
                <p className="text-2xl font-bold">{currentUser._count?.items || 0}</p>
              </div>
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Trading Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Trading Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{stats.averageRating}</div>
                  <div className="flex items-center justify-center mt-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= Math.floor(stats.averageRating)
                            ? 'fill-current text-yellow-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Average Rating ({stats.totalRatings} reviews)
                  </p>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-success">{stats.responseTime}</div>
                  <p className="text-sm text-muted-foreground mt-1">Average Response Time</p>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">
                    {Math.round((stats.successfulTrades / stats.totalTrades) * 100)}%
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Success Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Favorite Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Favorite Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {stats.favoriteCategories.map(category => (
                  <Badge key={category} variant="secondary" className="px-3 py-1">
                    {category}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3 pb-4 last:pb-0 border-b last:border-0">
                      <div className={`p-2 rounded-full bg-muted ${activity.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(activity.date), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Achievements & Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={index}
                      className={`flex items-center space-x-4 p-4 rounded-lg border ${
                        achievement.earned
                          ? 'bg-success/5 border-success/20'
                          : 'bg-muted/30 border-muted'
                      }`}
                    >
                      <div
                        className={`p-3 rounded-full ${
                          achievement.earned
                            ? 'bg-success text-success-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{achievement.title}</h4>
                          {achievement.earned && (
                            <Badge variant="secondary" className="bg-success/10 text-success">
                              Earned
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {achievement.description}
                        </p>
                        {achievement.earned && achievement.earnedDate && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Earned {formatDistanceToNow(new Date(achievement.earnedDate), { addSuffix: true })}
                          </p>
                        )}
                        {!achievement.earned && achievement.progress !== undefined && (
                          <div className="mt-2">
                            <div className="flex justify-between text-sm mb-1">
                              <span>{achievement.progress}/{achievement.target}</span>
                              <span>{Math.round((achievement.progress / achievement.target) * 100)}%</span>
                            </div>
                            <Progress value={(achievement.progress / achievement.target) * 100} className="h-2" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;