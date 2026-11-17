import { ArrowRight, Calculator } from 'lucide-react';
import { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';

const WORKFLOW_STEPS = [
  {
    step: '01. Discover by Spec',
    title: 'Search across 6 Indian textile hubs',
    body: 'Filter mill-direct lots by exact GSM weight, weave structure, fibre composition, width, and colourway without intermediary broker markups.',
  },
  {
    step: '02. Sample Before Bulk',
    title: 'Request A4 swatches or 2m proto cuts',
    body: 'Validate handfeel, shrinkage, and colourfastness in your own sampling room. Track every enquiry from mill review to simulated dispatch.',
  },
  {
    step: '03. Low-MOQ Production',
    title: 'Start small at 20–60 meters',
    body: 'Boutique labels can place initial capsule orders directly at transparent per-meter rates, unlocking volume discounts as styles scale.',
  },
  {
    step: '04. Cluster Logistics',
    title: 'Direct dispatch from mill floor',
    body: 'Orders route directly to our partner cluster mills in Surat, Ahmedabad, Tiruppur, Bengaluru, Mumbai, and Hyderabad.',
  },
];

export function HowItWorksPage() {
  const { fabrics, navigate, addToCart } = useMarketplace();
  const [selectedId, setSelectedId] = useState(fabrics[0]?.id ?? 'fab-01');
  const [garmentCount, setGarmentCount] = useState(40);
  const [metersPerGarment, setMetersPerGarment] = useState(1.8);

  const selectedFabric =
    fabrics.find((f) => f.id === selectedId) ?? fabrics[0];

  const requiredMeters = Math.ceil(garmentCount * metersPerGarment);
  const orderableMeters = Math.max(
    selectedFabric.moqMeters,
    requiredMeters
  );

  const sortedTiers = [...selectedFabric.bulkTiers].sort(
    (a, b) => b.minMeters - a.minMeters
  );
  const matchedTier = sortedTiers.find((t) => orderableMeters >= t.minMeters);
  const unitPrice = matchedTier
    ? matchedTier.pricePerMeter
    : selectedFabric.pricePerMeter;
  const estimatedCost = orderableMeters * unitPrice;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <section className="max-w-3xl space-y-4">
        <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#1B4D3E]">
          How Vastra Innovations Works
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#0F1F3D] leading-tight">
          Transparent B2B fabric sourcing built for emerging Indian apparel
          labels.
        </h1>
        <p className="text-base text-[#435066] leading-relaxed">
          Small fashion studios and boutique manufacturers often struggle with
          high mill minimums and opaque broker pricing. Vastra Innovations
          standardizes fabric specifications, sample requests, and low-MOQ
          yardage ordering in one workspace.
        </p>
      </section>

      {/* 4-Stage Process Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {WORKFLOW_STEPS.map((item) => (
          <div
            key={item.step}
            className="bg-white rounded-xl border border-[#0F1F3D]/10 p-6 flex flex-col justify-between"
          >
            <div>
              <p className="text-xs font-semibold text-[#1B4D3E]">{item.step}</p>
              <h2 className="font-display text-xl font-semibold text-[#0F1F3D] mt-2">
                {item.title}
              </h2>
              <p className="text-sm text-[#435066] mt-2.5 leading-relaxed">
                {item.body}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Interactive Yardage & Cost Estimator */}
      <section className="bg-white rounded-2xl border border-[#0F1F3D]/10 p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 text-xs font-medium text-[#1B4D3E]">
              <Calculator className="w-4 h-4" />
              <span>Interactive Sourcing Estimator</span>
            </div>
            <h2 className="font-display text-2xl font-semibold text-[#0F1F3D]">
              Calculate fabric yardage & bulk tier pricing
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="sm:col-span-3">
                <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                  Select Demo Fabric Lot
                </label>
                <select
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#0F1F3D]/15 rounded-lg text-[#0F1F3D]"
                >
                  {fabrics
                    .filter((f) => f.active)
                    .map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name} ({f.cluster} · ₹{f.pricePerMeter}/m · MOQ{' '}
                        {f.moqMeters}m)
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                  Garment Units
                </label>
                <input
                  type="number"
                  min={5}
                  max={2000}
                  value={garmentCount}
                  onChange={(e) =>
                    setGarmentCount(Math.max(1, Number(e.target.value) || 1))
                  }
                  className="w-full px-3.5 py-2.5 text-sm tabular-nums bg-[#FAF7F2] border border-[#0F1F3D]/15 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                  Meters / Garment
                </label>
                <input
                  type="number"
                  min={0.5}
                  max={8}
                  step={0.1}
                  value={metersPerGarment}
                  onChange={(e) =>
                    setMetersPerGarment(
                      Math.max(0.5, Number(e.target.value) || 1)
                    )
                  }
                  className="w-full px-3.5 py-2.5 text-sm tabular-nums bg-[#FAF7F2] border border-[#0F1F3D]/15 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                  Mill MOQ
                </label>
                <div className="px-3.5 py-2.5 text-sm tabular-nums bg-[#F3EDE2] border border-[#0F1F3D]/10 rounded-lg text-[#0F1F3D]">
                  {selectedFabric.moqMeters} meters
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#FAF7F2] rounded-xl border border-[#0F1F3D]/10 p-6 space-y-4">
            <p className="text-xs font-medium text-[#435066]">
              Estimated Production Allocation
            </p>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-[#435066]">Calculated Consumption</span>
                <span className="font-medium text-[#0F1F3D] tabular-nums">
                  {requiredMeters} meters
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#435066]">
                  MOQ-Adjusted Order Quantity
                </span>
                <span className="font-semibold text-[#0F1F3D] tabular-nums">
                  {orderableMeters} meters
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#435066]">Applicable Tier Rate</span>
                <span className="font-semibold text-[#1B4D3E] tabular-nums">
                  ₹{unitPrice}/meter
                </span>
              </div>
              <div className="pt-3 border-t border-[#0F1F3D]/10 flex justify-between text-base font-semibold text-[#0F1F3D]">
                <span>Estimated Fabric Cost</span>
                <span className="tabular-nums">
                  ₹{estimatedCost.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={() => addToCart(selectedFabric.id, orderableMeters)}
                className="flex-1 py-2.5 px-4 text-xs sm:text-sm font-medium bg-[#1B4D3E] hover:bg-[#143B2F] text-white rounded-lg cursor-pointer"
              >
                Add {orderableMeters}m to Cart
              </button>
              <button
                type="button"
                onClick={() =>
                  navigate('product-detail', { fabricId: selectedFabric.id })
                }
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs sm:text-sm font-medium border border-[#0F1F3D]/20 text-[#0F1F3D] rounded-lg hover:bg-white cursor-pointer"
              >
                <span>Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
