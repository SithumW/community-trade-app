import { Link, useLocation } from 'react-router-dom';
import { Home, Package, ArrowLeftRight, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const MobileNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Browse', icon: Home },
    { path: '/my-items', label: 'My Items', icon: Package },
    { path: '/trades', label: 'Trades', icon: ArrowLeftRight },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Mock pending requests count
  const pendingRequestsCount = 2;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex flex-col items-center justify-center space-y-1 transition-colors relative
                ${active 
                  ? 'text-primary bg-primary/5' 
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {item.path === '/trades' && pendingRequestsCount > 0 && (
                  <Badge 
                    variant="secondary" 
                    className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs bg-secondary text-secondary-foreground"
                  >
                    {pendingRequestsCount}
                  </Badge>
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;