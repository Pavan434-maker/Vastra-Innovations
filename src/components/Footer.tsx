import { RotateCcw } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export function Footer() {
  const { navigate, resetDemoState } = useMarketplace();

  return (
    <footer className="border-t border-[#0F1F3D]/10 bg-[#F3EDE2]/60 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2 space-y-3">
            <p className="font-display text-xl font-semibold text-[#0F1F3D]">
              Vastra Innovations
            </p>
            <p className="text-sm text-[#435066] max-w-md leading-relaxed">
              Discover. Source. Create. Academic B2B textile marketplace prototype
              connecting Indian weaving clusters in Surat, Ahmedabad, Tiruppur,
              Bengaluru, Mumbai, and Hyderabad with independent apparel studios.
            </p>
            <p className="text-xs text-[#435066]/90">
              Prototype Notice: All supplier profiles, mill capacities, sample
              dispatches, and transactions displayed are simulated demo data stored
              in browser LocalStorage.
            </p>
          </div>

          <div className="space-y-2.5 text-sm">
            <p className="font-semibold text-[#0F1F3D]">Platform</p>
            <ul className="space-y-2 text-[#435066]">
              <li>
                <button
                  type="button"
                  onClick={() => navigate('marketplace')}
                  className="hover:text-[#0F1F3D] cursor-pointer"
                >
                  Fabric Marketplace
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('how-it-works')}
                  className="hover:text-[#0F1F3D] cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('for-suppliers')}
                  className="hover:text-[#0F1F3D] cursor-pointer"
                >
                  For Textile Suppliers
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2.5 text-sm">
            <p className="font-semibold text-[#0F1F3D]">Prototype Portals</p>
            <ul className="space-y-2 text-[#435066]">
              <li>
                <button
                  type="button"
                  onClick={() => navigate('buyer-dashboard')}
                  className="hover:text-[#0F1F3D] cursor-pointer"
                >
                  Buyer Dashboard
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('supplier-dashboard')}
                  className="hover:text-[#0F1F3D] cursor-pointer"
                >
                  Supplier Dashboard
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('admin-dashboard')}
                  className="hover:text-[#0F1F3D] cursor-pointer"
                >
                  Admin Analytics (Demo)
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#0F1F3D]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#435066]">
          <p>
            © 2026 Vastra Innovations · Academic Startup Prototype · Demo Data Only
          </p>
          <button
            type="button"
            onClick={resetDemoState}
            className="inline-flex items-center gap-1.5 text-[#0F1F3D] hover:text-[#1B4D3E] font-medium cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Prototype LocalStorage Data</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
