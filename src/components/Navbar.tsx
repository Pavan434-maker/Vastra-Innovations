import { Menu, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { AppRoute } from '../types/marketplace';

export function Navbar() {
  const { route, navigate, cart, setCartDrawerOpen, user } = useMarketplace();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItems = cart.length;

  const navItems: { label: string; target: AppRoute }[] = [
    { label: 'Home', target: 'home' },
    { label: 'Marketplace', target: 'marketplace' },
    { label: 'How It Works', target: 'how-it-works' },
    { label: 'For Suppliers', target: 'for-suppliers' },
    {
      label:
        user.role === 'guest'
          ? 'Login'
          : user.role === 'buyer'
            ? 'Buyer Hub'
            : user.role === 'supplier'
              ? 'Supplier Hub'
              : 'Admin Hub',
      target:
        user.role === 'guest'
          ? 'login'
          : user.role === 'buyer'
            ? 'buyer-dashboard'
            : user.role === 'supplier'
              ? 'supplier-dashboard'
              : 'admin-dashboard',
    },
  ];

  const handleNav = (target: AppRoute) => {
    navigate(target);
    setMobileMenuOpen(false);
  };

  const isNavActive = (target: AppRoute) => {
    if (target === 'marketplace' && route === 'product-detail') return true;
    return route === target;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-sm border-b border-[#0F1F3D]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark only */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="font-display text-xl font-semibold tracking-tight text-[#0F1F3D] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B4D3E]"
        >
          Vastra Innovations
        </button>

        {/* Zone 2: 5 concise single-line text links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#435066]"
        >
          {navItems.map((item) => {
            const active = isNavActive(item.target);
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNav(item.target)}
                className={`whitespace-nowrap shrink-0 py-1 border-b transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B4D3E] ${
                  active
                    ? 'text-[#0F1F3D] border-[#1B4D3E] font-semibold'
                    : 'border-transparent hover:text-[#0F1F3D] hover:border-[#0F1F3D]/30'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setCartDrawerOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-white bg-[#1B4D3E] hover:bg-[#143B2F] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F1F3D]"
          >
            <ShoppingBag className="w-4 h-4" strokeWidth={1.75} />
            <span className="tabular-nums">Cart ({totalItems})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#0F1F3D]/15 text-[#0F1F3D] hover:bg-[#F3EDE2] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#0F1F3D]/10 bg-[#FAF7F2] px-4 py-3 space-y-1">
          {navItems.map((item) => {
            const active = isNavActive(item.target);
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNav(item.target)}
                className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-[#1B4D3E]/10 text-[#1B4D3E] font-semibold'
                    : 'text-[#0F1F3D] hover:bg-[#F3EDE2]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => handleNav('login')}
            className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-[#435066] hover:bg-[#F3EDE2]"
          >
            Switch Prototype Role / Login
          </button>
        </div>
      )}
    </header>
  );
}
