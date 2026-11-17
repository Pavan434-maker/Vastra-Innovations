import { RotateCcw, Search, SlidersHorizontal } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { FabricCard } from '../components/FabricCard';
import { useMarketplace } from '../context/MarketplaceContext';
import { FabricColor, FabricType, TextileCluster } from '../types/marketplace';

const FABRIC_TYPES: ('All' | FabricType)[] = [
  'All',
  'Cotton',
  'Silk',
  'Linen',
  'Knit',
  'Denim & Twill',
  'Viscose & Blends',
];

const COLORS: ('All' | FabricColor)[] = [
  'All',
  'Ivory',
  'Navy',
  'Forest',
  'Indigo',
  'Terracotta',
  'Charcoal',
  'Oatmeal',
  'Sage',
];

const CLUSTERS: ('All' | TextileCluster)[] = [
  'All',
  'Surat',
  'Ahmedabad',
  'Tiruppur',
  'Bengaluru',
  'Mumbai',
  'Hyderabad',
];

type GsmRange = 'all' | 'light' | 'mid' | 'heavy';
type PriceRange = 'all' | 'under300' | '300to600' | 'above600';
type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'moq-asc';

export function MarketplacePage() {
  const { fabrics, searchQueryPrefill } = useMarketplace();

  const [search, setSearch] = useState(searchQueryPrefill);
  const [selectedType, setSelectedType] = useState<'All' | FabricType>('All');
  const [selectedGsm, setSelectedGsm] = useState<GsmRange>('all');
  const [selectedColor, setSelectedColor] = useState<'All' | FabricColor>('All');
  const [selectedPrice, setSelectedPrice] = useState<PriceRange>('all');
  const [selectedCluster, setSelectedCluster] = useState<'All' | TextileCluster>(
    'All'
  );
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  useEffect(() => {
    if (searchQueryPrefill) {
      setSearch(searchQueryPrefill);
    }
  }, [searchQueryPrefill]);

  const activeFabrics = useMemo(
    () => fabrics.filter((f) => f.active),
    [fabrics]
  );

  const filteredFabrics = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = activeFabrics.filter((f) => {
      if (q) {
        const hay =
          `${f.name} ${f.sku} ${f.type} ${f.cluster} ${f.supplierName} ${f.color} ${f.weave} ${f.composition} ${f.gsm}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (selectedType !== 'All' && f.type !== selectedType) return false;
      if (selectedColor !== 'All' && f.color !== selectedColor) return false;
      if (selectedCluster !== 'All' && f.cluster !== selectedCluster)
        return false;

      if (selectedGsm === 'light' && f.gsm >= 120) return false;
      if (selectedGsm === 'mid' && (f.gsm < 120 || f.gsm > 220)) return false;
      if (selectedGsm === 'heavy' && f.gsm <= 220) return false;

      if (selectedPrice === 'under300' && f.pricePerMeter >= 300) return false;
      if (
        selectedPrice === '300to600' &&
        (f.pricePerMeter < 300 || f.pricePerMeter > 600)
      )
        return false;
      if (selectedPrice === 'above600' && f.pricePerMeter <= 600) return false;

      return true;
    });

    const sorted = [...list];
    if (sortBy === 'price-asc') {
      sorted.sort((a, b) => a.pricePerMeter - b.pricePerMeter);
    } else if (sortBy === 'price-desc') {
      sorted.sort((a, b) => b.pricePerMeter - a.pricePerMeter);
    } else if (sortBy === 'moq-asc') {
      sorted.sort((a, b) => a.moqMeters - b.moqMeters);
    } else {
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return sorted;
  }, [
    activeFabrics,
    search,
    selectedType,
    selectedGsm,
    selectedColor,
    selectedPrice,
    selectedCluster,
    sortBy,
  ]);

  const hasActiveFilters =
    search.trim() !== '' ||
    selectedType !== 'All' ||
    selectedGsm !== 'all' ||
    selectedColor !== 'All' ||
    selectedPrice !== 'all' ||
    selectedCluster !== 'All';

  const resetFilters = () => {
    setSearch('');
    setSelectedType('All');
    setSelectedGsm('all');
    setSelectedColor('All');
    setSelectedPrice('all');
    setSelectedCluster('All');
    setSortBy('featured');
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#0F1F3D]/10">
        <div>
          <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#1B4D3E]">
            B2B Mill Catalog · Prototype Demo Data
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#0F1F3D] mt-1">
            Fabric Marketplace
          </h1>
          <p className="text-sm text-[#435066] mt-1.5">
            Showing{' '}
            <span className="font-semibold text-[#0F1F3D] tabular-nums">
              {filteredFabrics.length}
            </span>{' '}
            of{' '}
            <span className="tabular-nums">{activeFabrics.length}</span>{' '}
            mill-direct textile lots across 6 Indian clusters
          </p>
        </div>

        <div className="w-full md:w-80 relative">
          <Search className="w-4 h-4 text-[#435066] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search fabric, SKU, GSM, city..."
            aria-label="Search marketplace fabrics"
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-[#0F1F3D]/15 rounded-lg text-[#0F1F3D] placeholder:text-[#435066]/70 focus:outline-none focus:border-[#1B4D3E]"
          />
        </div>
      </div>

      {/* Category segmented filter bar */}
      <div className="py-5 flex flex-wrap items-center gap-2 border-b border-[#0F1F3D]/10">
        {FABRIC_TYPES.map((type) => {
          const active = selectedType === type;
          return (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                active
                  ? 'bg-[#0F1F3D] text-white'
                  : 'bg-white text-[#435066] border border-[#0F1F3D]/12 hover:text-[#0F1F3D] hover:border-[#0F1F3D]/30'
              }`}
            >
              {type}
            </button>
          );
        })}
      </div>

      {/* Technical Filter Controls */}
      <div className="py-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 items-end">
        <div>
          <label
            htmlFor="filter-gsm"
            className="block text-xs font-medium text-[#435066] mb-1"
          >
            GSM Weight
          </label>
          <select
            id="filter-gsm"
            value={selectedGsm}
            onChange={(e) => setSelectedGsm(e.target.value as GsmRange)}
            className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#0F1F3D]/15 rounded-lg text-[#0F1F3D] focus:outline-none focus:border-[#1B4D3E]"
          >
            <option value="all">All GSM Weights</option>
            <option value="light">Lightweight (&lt; 120 GSM)</option>
            <option value="mid">Midweight (120–220 GSM)</option>
            <option value="heavy">Heavyweight (&gt; 220 GSM)</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="filter-color"
            className="block text-xs font-medium text-[#435066] mb-1"
          >
            Colourway
          </label>
          <select
            id="filter-color"
            value={selectedColor}
            onChange={(e) =>
              setSelectedColor(e.target.value as 'All' | FabricColor)
            }
            className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#0F1F3D]/15 rounded-lg text-[#0F1F3D] focus:outline-none focus:border-[#1B4D3E]"
          >
            {COLORS.map((c) => (
              <option key={c} value={c}>
                {c === 'All' ? 'All Colours' : c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="filter-price"
            className="block text-xs font-medium text-[#435066] mb-1"
          >
            Price / Meter (₹)
          </label>
          <select
            id="filter-price"
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value as PriceRange)}
            className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#0F1F3D]/15 rounded-lg text-[#0F1F3D] focus:outline-none focus:border-[#1B4D3E]"
          >
            <option value="all">All Prices</option>
            <option value="under300">Under ₹300 / m</option>
            <option value="300to600">₹300 – ₹600 / m</option>
            <option value="above600">Above ₹600 / m</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="filter-cluster"
            className="block text-xs font-medium text-[#435066] mb-1"
          >
            Textile Cluster
          </label>
          <select
            id="filter-cluster"
            value={selectedCluster}
            onChange={(e) =>
              setSelectedCluster(e.target.value as 'All' | TextileCluster)
            }
            className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#0F1F3D]/15 rounded-lg text-[#0F1F3D] focus:outline-none focus:border-[#1B4D3E]"
          >
            {CLUSTERS.map((city) => (
              <option key={city} value={city}>
                {city === 'All' ? 'All Clusters' : city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="filter-sort"
            className="block text-xs font-medium text-[#435066] mb-1"
          >
            Sort By
          </label>
          <select
            id="filter-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#0F1F3D]/15 rounded-lg text-[#0F1F3D] focus:outline-none focus:border-[#1B4D3E]"
          >
            <option value="featured">Featured Lots</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="moq-asc">Lowest MOQ First</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={resetFilters}
            disabled={!hasActiveFilters}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium border border-[#0F1F3D]/15 rounded-lg text-[#0F1F3D] bg-white hover:bg-[#F3EDE2] disabled:opacity-40 cursor-pointer whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>

      {/* Product Grid or Empty State */}
      {filteredFabrics.length === 0 ? (
        <div className="my-12 bg-white rounded-2xl border border-[#0F1F3D]/10 p-12 text-center max-w-lg mx-auto">
          <SlidersHorizontal className="w-8 h-8 text-[#0F1F3D]/35 mx-auto mb-3" />
          <h2 className="font-display text-xl font-semibold text-[#0F1F3D]">
            No fabric lots match these filters
          </h2>
          <p className="text-sm text-[#435066] mt-1.5">
            Try clearing one of your GSM, colourway, or price filters to view
            more Indian mill inventory.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-5 px-5 py-2.5 text-sm font-medium bg-[#1B4D3E] text-white rounded-lg hover:bg-[#143B2F] cursor-pointer"
          >
            Show All Fabrics
          </button>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredFabrics.map((fabric) => (
            <FabricCard key={fabric.id} fabric={fabric} />
          ))}
        </div>
      )}
    </main>
  );
}
