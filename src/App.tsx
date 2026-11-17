import { CheckCircle2, X } from 'lucide-react';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { MarketplaceProvider, useMarketplace } from './context/MarketplaceContext';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { BuyerDashboardPage } from './pages/BuyerDashboardPage';
import { ForSuppliersPage } from './pages/ForSuppliersPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { SupplierDashboardPage } from './pages/SupplierDashboardPage';

function ToastBanner() {
  const { toastMessage, dismissToast } = useMarketplace();
  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 max-w-sm bg-[#0F1F3D] text-white px-4 py-3 rounded-xl shadow-lg border border-white/15 flex items-center gap-3"
    >
      <CheckCircle2 className="w-4 h-4 text-[#A7D7C5] shrink-0" />
      <p className="text-xs sm:text-sm font-medium flex-1">{toastMessage}</p>
      <button
        type="button"
        onClick={dismissToast}
        aria-label="Dismiss notification"
        className="text-white/70 hover:text-white cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

function AppShell() {
  const { route } = useMarketplace();

  const renderPage = () => {
    switch (route) {
      case 'home':
        return <LandingPage />;
      case 'marketplace':
        return <MarketplacePage />;
      case 'how-it-works':
        return <HowItWorksPage />;
      case 'for-suppliers':
        return <ForSuppliersPage />;
      case 'login':
        return <LoginPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'buyer-dashboard':
        return <BuyerDashboardPage />;
      case 'supplier-dashboard':
        return <SupplierDashboardPage />;
      case 'admin-dashboard':
        return <AdminDashboardPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#0F1F3D]">
      <Navbar />
      <div className="flex-1">{renderPage()}</div>
      <Footer />
      <CartDrawer />
      <ToastBanner />
    </div>
  );
}

export default function App() {
  return (
    <MarketplaceProvider>
      <AppShell />
    </MarketplaceProvider>
  );
}
