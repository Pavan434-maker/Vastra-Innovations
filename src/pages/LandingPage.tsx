import { ArrowRight, Search } from 'lucide-react';
import React, { useState } from 'react';
import { FabricCard } from '../components/FabricCard';
import { FabricImage } from '../components/FabricImage';
import { useMarketplace } from '../context/MarketplaceContext';
import { HERO_ATELIER_IMAGE } from '../data/demoData';
import { TextileCluster } from '../types/marketplace';

const CLUSTERS: { city: TextileCluster; specialty: string }[] = [
  { city: 'Surat', specialty: 'Viscose crepes, georgettes & sheer blends' },
  { city: 'Ahmedabad', specialty: 'Selvedge raw denim, poplin & heavy twill' },
  { city: 'Tiruppur', specialty: 'Combed single jersey, French terry & bamboo knits' },
  { city: 'Bengaluru', specialty: 'Mulberry silk jacquards & micro-velvets' },
  { city: 'Mumbai', specialty: 'Enzyme-washed flax linen & Tencel satin' },
  { city: 'Hyderabad', specialty: 'Pochampally double-ikat & handspun khadi' },
];

export function LandingPage() {
  const { fabrics, navigate } = useMarketplace();
  const [heroSearch, setHeroSearch] = useState('');

  const featuredFabrics = fabrics.filter((f) => f.active).slice(0, 6);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('marketplace', { search: heroSearch });
  };

  return (
    <main>
      {/* Section 1: Editorial Split Hero + Full-width Cluster Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div className="space-y-6">
              <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#1B4D3E]">
                Discover. Source. Create.
              </p>

              <h1
                className="font-display font-semibold text-[#0F1F3D] leading-[1.08] tracking-tight"
                style={{
                  fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
                  textWrap: 'balance',
                }}
              >
                Mill-direct Indian textiles for independent apparel brands.
              </h1>

              <p className="text-base sm:text-lg text-[#435066] leading-relaxed max-w-xl">
                Connect directly with weaving houses across Surat, Ahmedabad,
                Tiruppur, Bengaluru, Mumbai, and Hyderabad. Compare GSM specs,
                order physical swatches, and source low-MOQ yardage with clear
                demo pricing.
              </p>

              <form
                onSubmit={handleHeroSearch}
                className="flex flex-col sm:flex-row gap-3 pt-1 max-w-xl"
              >
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#435066] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    placeholder="Search poplin, silk, linen, 210 GSM, Surat..."
                    aria-label="Search fabrics"
                    className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-[#0F1F3D]/15 rounded-lg text-[#0F1F3D] placeholder:text-[#435066]/70 focus:outline-none focus:border-[#1B4D3E]"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium bg-[#1B4D3E] hover:bg-[#143B2F] text-white rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Explore Marketplace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            <div className="pt-8 mt-8 border-t border-[#0F1F3D]/10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#435066]">
              <button
                type="button"
                onClick={() => navigate('for-suppliers')}
                className="font-medium text-[#0F1F3D] hover:text-[#1B4D3E] underline underline-offset-4 cursor-pointer"
              >
                List your mill inventory
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => navigate('login')}
                className="font-medium text-[#0F1F3D] hover:text-[#1B4D3E] underline underline-offset-4 cursor-pointer"
              >
                Switch Buyer / Supplier / Admin Demo Role
              </button>
              <span aria-hidden="true">·</span>
              <span>Academic Prototype Demo Data</span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[16/11] lg:aspect-auto lg:h-full min-h-[320px] rounded-2xl overflow-hidden border border-[#0F1F3D]/10 bg-[#F3EDE2]">
              <FabricImage
                src={HERO_ATELIER_IMAGE}
                alt="Sunlit Indian textile sourcing studio displaying bolts of khadi cotton, indigo twill, and raw silk"
                className="w-full h-full lg:h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Full-width 4-column prototype KPI strip */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#0F1F3D]/10 rounded-xl overflow-hidden border border-[#0F1F3D]/10">
          <div className="bg-white p-5">
            <p className="font-display text-2xl font-semibold text-[#0F1F3D] tabular-nums">
              6 Hubs
            </p>
            <p className="text-xs text-[#435066] mt-1">
              Surat, Ahmedabad, Tiruppur, Bengaluru, Mumbai, Hyderabad
            </p>
          </div>
          <div className="bg-white p-5">
            <p className="font-display text-2xl font-semibold text-[#0F1F3D] tabular-nums">
              {fabrics.filter((f) => f.active).length} Mill Lots
            </p>
            <p className="text-xs text-[#435066] mt-1">
              Full GSM, weave, width & bulk tier specifications
            </p>
          </div>
          <div className="bg-white p-5">
            <p className="font-display text-2xl font-semibold text-[#0F1F3D] tabular-nums">
              20m MOQ
            </p>
            <p className="text-xs text-[#435066] mt-1">
              Boutique-friendly minimums starting at 20 meters
            </p>
          </div>
          <div className="bg-white p-5">
            <p className="font-display text-2xl font-semibold text-[#0F1F3D] tabular-nums">
              48h Swatch
            </p>
            <p className="text-xs text-[#435066] mt-1">
              Simulated A4 & 2-meter sample request workflow
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Featured Marketplace Collection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-[#0F1F3D]/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#1B4D3E]">
              Curated Mill Inventory (Demo)
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#0F1F3D] mt-1.5">
              Featured seasonal yardage
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate('marketplace')}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1B4D3E] hover:text-[#143B2F] cursor-pointer whitespace-nowrap"
          >
            <span>View all {fabrics.filter((f) => f.active).length} fabrics</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {featuredFabrics.map((fabric) => (
            <FabricCard key={fabric.id} fabric={fabric} />
          ))}
        </div>
      </section>

      {/* Section 3: How Vastra Works + Indian Cluster Directory */}
      <section className="bg-[#F3EDE2]/75 border-y border-[#0F1F3D]/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#1B4D3E]">
                Sourcing Workflow
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#0F1F3D] leading-snug">
                From swatch validation to loom-floor allocation.
              </h2>

              <div className="space-y-6 pt-2">
                <div>
                  <h3 className="font-display text-lg font-semibold text-[#0F1F3D]">
                    01. Filter by technical specification
                  </h3>
                  <p className="text-sm text-[#435066] mt-1 leading-relaxed">
                    Narrow down fabrics by fibre type, GSM weight, colourway,
                    price per meter, and regional weaving cluster.
                  </p>
                </div>
                <div className="pt-5 border-t border-[#0F1F3D]/10">
                  <h3 className="font-display text-lg font-semibold text-[#0F1F3D]">
                    02. Request physical swatches
                  </h3>
                  <p className="text-sm text-[#435066] mt-1 leading-relaxed">
                    Submit an A4 swatch card or 2-meter yardage request directly
                    to the demo mill and track dispatch status in your Buyer Hub.
                  </p>
                </div>
                <div className="pt-5 border-t border-[#0F1F3D]/10">
                  <h3 className="font-display text-lg font-semibold text-[#0F1F3D]">
                    03. Place low-MOQ production orders
                  </h3>
                  <p className="text-sm text-[#435066] mt-1 leading-relaxed">
                    Unlock automatic bulk tier pricing starting from 20–60
                    meters through our prototype checkout flow.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#0F1F3D]/10">
                <blockquote className="text-sm text-[#0F1F3D] italic leading-relaxed">
                  “Before Vastra, sourcing 40 meters of enzyme-washed flax linen
                  from Mumbai meant three broker calls. Now we compare GSM and
                  bulk tiers in minutes before cutting our resort capsule.”
                </blockquote>
                <p className="text-xs text-[#435066] mt-2 font-medium">
                  Meera Nair · Founder, Aarav Atelier, Bengaluru (Demo Buyer)
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-[#0F1F3D]/10 p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4 pb-5 border-b border-[#0F1F3D]/10">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-[#0F1F3D]">
                      Indian Textile Clusters
                    </h3>
                    <p className="text-xs text-[#435066] mt-0.5">
                      Select any cluster to filter live demo mill lots
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('how-it-works')}
                    className="text-xs font-medium text-[#1B4D3E] hover:underline cursor-pointer whitespace-nowrap"
                  >
                    Read sourcing guide
                  </button>
                </div>

                <div className="divide-y divide-[#0F1F3D]/10">
                  {CLUSTERS.map((cluster) => {
                    const count = fabrics.filter(
                      (f) => f.active && f.cluster === cluster.city
                    ).length;
                    return (
                      <button
                        key={cluster.city}
                        type="button"
                        onClick={() =>
                          navigate('marketplace', { search: cluster.city })
                        }
                        className="w-full py-4 flex items-center justify-between gap-4 text-left hover:bg-[#FAF7F2] px-2 -mx-2 rounded-lg transition-colors cursor-pointer group"
                      >
                        <div>
                          <p className="font-semibold text-sm text-[#0F1F3D] group-hover:text-[#1B4D3E]">
                            {cluster.city}
                          </p>
                          <p className="text-xs text-[#435066] mt-0.5">
                            {cluster.specialty}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs text-[#435066] tabular-nums">
                            {count} lots
                          </span>
                          <ArrowRight className="w-4 h-4 text-[#435066] group-hover:text-[#1B4D3E]" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Prototype Role Dashboards Entry */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-4">
        <div className="bg-[#0F1F3D] text-white rounded-2xl p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#A7D7C5]">
              Interactive Prototype Workspaces
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold leading-snug">
              Test every stakeholder workflow in one session.
            </h2>
            <p className="text-sm text-white/80 leading-relaxed">
              Switch seamlessly between the Buyer Hub, Supplier Mill Dashboard,
              and Admin Operations Analytics. All state persists in LocalStorage.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              type="button"
              onClick={() => navigate('buyer-dashboard')}
              className="px-4 py-2.5 text-sm font-medium bg-white text-[#0F1F3D] hover:bg-[#FAF7F2] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              Buyer Dashboard
            </button>
            <button
              type="button"
              onClick={() => navigate('supplier-dashboard')}
              className="px-4 py-2.5 text-sm font-medium bg-[#1B4D3E] text-white hover:bg-[#143B2F] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              Supplier Dashboard
            </button>
            <button
              type="button"
              onClick={() => navigate('admin-dashboard')}
              className="px-4 py-2.5 text-sm font-medium border border-white/30 text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              Admin Analytics
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
