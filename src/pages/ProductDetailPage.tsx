import {
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  PackageCheck,
  ShoppingBag,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { FabricImage } from '../components/FabricImage';
import { useMarketplace } from '../context/MarketplaceContext';
import { SampleFormat, SampleRequest } from '../types/marketplace';

export function ProductDetailPage() {
  const {
    fabrics,
    suppliers,
    selectedFabricId,
    navigate,
    addToCart,
    savedFabricIds,
    toggleSavedFabric,
    submitSampleRequest,
    user,
  } = useMarketplace();

  const fabric =
    fabrics.find((f) => f.id === selectedFabricId) ?? fabrics[0];
  const supplier = suppliers.find((s) => s.id === fabric.supplierId);
  const isSaved = savedFabricIds.includes(fabric.id);

  const [meters, setMeters] = useState(fabric.moqMeters);
  const [sampleOpen, setSampleOpen] = useState(true);
  const [confirmedSample, setConfirmedSample] = useState<SampleRequest | null>(
    null
  );

  // Sample form state
  const [buyerName, setBuyerName] = useState(
    user.role === 'buyer' ? user.name : 'Meera Nair'
  );
  const [companyName, setCompanyName] = useState(
    user.role === 'buyer' ? user.company : 'Aarav Atelier (Demo Buyer)'
  );
  const [buyerCity, setBuyerCity] = useState(user.city || 'Bengaluru');
  const [garmentCategory, setGarmentCategory] = useState(
    fabric.applications[0] || 'Apparel Capsule'
  );
  const [sampleFormat, setSampleFormat] =
    useState<SampleFormat>('A4 Swatch Card');
  const [deliveryAddress, setDeliveryAddress] = useState(
    '42 Indiranagar 12th Main, Bengaluru 560038'
  );
  const [notes, setNotes] = useState('');

  useEffect(() => {
    setMeters(fabric.moqMeters);
    setConfirmedSample(null);
    setGarmentCategory(fabric.applications[0] || 'Apparel Capsule');
  }, [fabric.id, fabric.moqMeters, fabric.applications]);

  const sortedTiers = [...fabric.bulkTiers].sort(
    (a, b) => b.minMeters - a.minMeters
  );
  const activeTier = sortedTiers.find((t) => meters >= t.minMeters);
  const effectivePrice = activeTier
    ? activeTier.pricePerMeter
    : fabric.pricePerMeter;

  const handleSampleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = submitSampleRequest({
      fabricId: fabric.id,
      buyerName,
      companyName,
      buyerCity,
      garmentCategory,
      sampleFormat,
      deliveryAddress,
      notes,
    });
    if (created) {
      setConfirmedSample(created);
      setNotes('');
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#435066] mb-6">
        <button
          type="button"
          onClick={() => navigate('marketplace')}
          className="inline-flex items-center gap-1.5 font-medium text-[#0F1F3D] hover:text-[#1B4D3E] cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Marketplace</span>
        </button>
        <span aria-hidden="true">/</span>
        <span>{fabric.type}</span>
        <span aria-hidden="true">/</span>
        <span className="truncate text-[#0F1F3D]">{fabric.name}</span>
      </div>

      {/* Main 2-column Contiguous Purchase Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Image + Technical Specs + Supplier Info */}
        <div className="lg:col-span-6 space-y-8">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#0F1F3D]/10 bg-[#F3EDE2]">
            <FabricImage
              src={fabric.imageUrl}
              alt={fabric.name}
              className="w-full h-full"
            />
          </div>

          {/* Technical Specifications Table */}
          <div className="bg-white rounded-xl border border-[#0F1F3D]/10 p-6">
            <h2 className="font-display text-xl font-semibold text-[#0F1F3D] mb-4">
              Technical Specifications
            </h2>
            <dl className="divide-y divide-[#0F1F3D]/8 text-sm">
              <div className="py-2.5 flex justify-between gap-4">
                <dt className="text-[#435066]">Fibre Composition</dt>
                <dd className="font-medium text-[#0F1F3D] text-right">
                  {fabric.composition}
                </dd>
              </div>
              <div className="py-2.5 flex justify-between gap-4">
                <dt className="text-[#435066]">Fabric Weight</dt>
                <dd className="font-medium text-[#0F1F3D] tabular-nums">
                  {fabric.gsm} GSM
                </dd>
              </div>
              <div className="py-2.5 flex justify-between gap-4">
                <dt className="text-[#435066]">Usable Width</dt>
                <dd className="font-medium text-[#0F1F3D] tabular-nums">
                  {fabric.widthInches} inches
                </dd>
              </div>
              <div className="py-2.5 flex justify-between gap-4">
                <dt className="text-[#435066]">Weave / Knit Structure</dt>
                <dd className="font-medium text-[#0F1F3D] text-right">
                  {fabric.weave}
                </dd>
              </div>
              <div className="py-2.5 flex justify-between gap-4">
                <dt className="text-[#435066]">Mill Finish</dt>
                <dd className="font-medium text-[#0F1F3D] text-right">
                  {fabric.finish}
                </dd>
              </div>
              <div className="py-2.5 flex justify-between gap-4">
                <dt className="text-[#435066]">Care Instructions</dt>
                <dd className="font-medium text-[#0F1F3D] text-right">
                  {fabric.careInstructions}
                </dd>
              </div>
              <div className="py-2.5 flex justify-between gap-4">
                <dt className="text-[#435066]">Ready Mill Stock (Demo)</dt>
                <dd className="font-medium text-[#1B4D3E] tabular-nums">
                  {fabric.stockMeters.toLocaleString('en-IN')} meters
                </dd>
              </div>
            </dl>
          </div>

          {/* Demo Supplier Information */}
          <div className="bg-[#F3EDE2]/80 rounded-xl border border-[#0F1F3D]/10 p-6 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-[#1B4D3E]">
                  Demo Mill Partner · {fabric.cluster} Textile Cluster
                </p>
                <h2 className="font-display text-xl font-semibold text-[#0F1F3D] mt-0.5">
                  {fabric.supplierName}
                </h2>
              </div>
              <span className="text-xs text-[#435066] tabular-nums">
                Est. {supplier?.establishedYear ?? 2012}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
              <div>
                <p className="text-[#435066]">Facility Type</p>
                <p className="font-medium text-[#0F1F3D] mt-0.5">
                  {supplier?.millType ?? 'Integrated Weaving Mill'}
                </p>
              </div>
              <div>
                <p className="text-[#435066]">Monthly Capacity (Demo)</p>
                <p className="font-medium text-[#0F1F3D] mt-0.5 tabular-nums">
                  {(supplier?.monthlyCapacityMeters ?? 50000).toLocaleString(
                    'en-IN'
                  )}{' '}
                  meters/mo
                </p>
              </div>
              <div>
                <p className="text-[#435066]">Standard Dispatch Lead Time</p>
                <p className="font-medium text-[#0F1F3D] mt-0.5">
                  {fabric.leadTimeDays}
                </p>
              </div>
              <div>
                <p className="text-[#435066]">Process Note</p>
                <p className="font-medium text-[#0F1F3D] mt-0.5">
                  {supplier?.sustainabilityNote ?? 'Prototype partner profile'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Purchase Module & Sample Request Form */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl border border-[#0F1F3D]/10 p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#435066]">
                <span className="font-mono-tabular">{fabric.sku}</span>
                <span aria-hidden="true">·</span>
                <span>{fabric.type}</span>
                <span aria-hidden="true">·</span>
                <span>{fabric.color}</span>
              </div>

              <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#0F1F3D] mt-2 leading-snug">
                {fabric.name}
              </h1>

              <p className="text-sm text-[#435066] mt-3 leading-relaxed">
                {fabric.description}
              </p>

              <p className="text-xs text-[#435066] mt-3">
                Recommended Applications:{' '}
                <span className="text-[#0F1F3D] font-medium">
                  {fabric.applications.join(' · ')}
                </span>
              </p>
            </div>

            {/* Pricing & MOQ */}
            <div className="pt-5 border-t border-[#0F1F3D]/10 flex items-baseline justify-between gap-4">
              <div>
                <p className="text-3xl font-semibold text-[#0F1F3D] tabular-nums">
                  ₹{effectivePrice.toLocaleString('en-IN')}
                  <span className="text-sm font-normal text-[#435066]">
                    {' '}
                    / meter
                  </span>
                </p>
                <p className="text-xs text-[#435066] mt-1 tabular-nums">
                  Minimum Order Quantity (MOQ): {fabric.moqMeters} meters
                </p>
              </div>
              <button
                type="button"
                onClick={() => toggleSavedFabric(fabric.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                  isSaved
                    ? 'bg-[#1B4D3E]/10 border-[#1B4D3E]/30 text-[#1B4D3E]'
                    : 'border-[#0F1F3D]/15 text-[#0F1F3D] hover:bg-[#FAF7F2]'
                }`}
              >
                <Bookmark
                  className="w-3.5 h-3.5"
                  fill={isSaved ? 'currentColor' : 'none'}
                />
                <span>{isSaved ? 'Saved Swatch' : 'Save Swatch'}</span>
              </button>
            </div>

            {/* Bulk Price Tiers */}
            <div>
              <p className="text-xs font-medium text-[#435066] mb-2">
                Volume Tier Pricing (Click tier to select yardage)
              </p>
              <div className="grid grid-cols-3 gap-2.5">
                {fabric.bulkTiers.map((tier) => {
                  const selected = effectivePrice === tier.pricePerMeter;
                  return (
                    <button
                      key={tier.minMeters}
                      type="button"
                      onClick={() => setMeters(tier.minMeters)}
                      className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                        selected
                          ? 'border-[#1B4D3E] bg-[#1B4D3E]/5'
                          : 'border-[#0F1F3D]/12 hover:border-[#0F1F3D]/30'
                      }`}
                    >
                      <p className="text-xs text-[#435066] tabular-nums">
                        {tier.minMeters}+ meters
                      </p>
                      <p className="text-sm font-semibold text-[#0F1F3D] mt-0.5 tabular-nums">
                        ₹{tier.pricePerMeter}/m
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Yardage input & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <div className="sm:w-40">
                <label
                  htmlFor="order-meters"
                  className="block text-xs font-medium text-[#435066] mb-1"
                >
                  Quantity (Meters)
                </label>
                <input
                  id="order-meters"
                  type="number"
                  min={fabric.moqMeters}
                  step={10}
                  value={meters}
                  onChange={(e) =>
                    setMeters(
                      Math.max(fabric.moqMeters, Number(e.target.value) || fabric.moqMeters)
                    )
                  }
                  className="w-full px-3.5 py-2.5 text-sm font-medium tabular-nums bg-[#FAF7F2] border border-[#0F1F3D]/15 rounded-lg text-[#0F1F3D] focus:outline-none focus:border-[#1B4D3E]"
                />
              </div>
              <div className="flex-1 flex items-end">
                <button
                  type="button"
                  onClick={() => addToCart(fabric.id, meters)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium bg-[#1B4D3E] hover:bg-[#143B2F] text-white rounded-lg transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span className="tabular-nums">
                    Add {meters}m to Cart · ₹
                    {(meters * effectivePrice).toLocaleString('en-IN')}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Request Sample Form Card */}
          <div className="bg-white rounded-2xl border border-[#0F1F3D]/10 p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="font-display text-xl font-semibold text-[#0F1F3D]">
                  Request Physical Sample
                </h2>
                <p className="text-xs text-[#435066] mt-0.5">
                  Evaluate handfeel, drape, and shade before committing to MOQ
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSampleOpen((prev) => !prev)}
                className="text-xs font-medium text-[#1B4D3E] hover:underline cursor-pointer shrink-0"
              >
                {sampleOpen ? 'Collapse' : 'Expand Form'}
              </button>
            </div>

            {confirmedSample ? (
              <div className="bg-[#FAF7F2] rounded-xl border border-[#1B4D3E]/25 p-5 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#1B4D3E] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-[#1B4D3E]">
                      Demo Sample Enquiry Confirmed
                    </p>
                    <h3 className="font-display text-lg font-semibold text-[#0F1F3D] tabular-nums">
                      {confirmedSample.id}
                    </h3>
                    <p className="text-sm text-[#435066] mt-1">
                      Your request for{' '}
                      <strong className="text-[#0F1F3D]">
                        {confirmedSample.sampleFormat}
                      </strong>{' '}
                      has been logged with {confirmedSample.supplierName}.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => navigate('buyer-dashboard')}
                    className="px-4 py-2 text-xs font-medium bg-[#1B4D3E] text-white rounded-lg hover:bg-[#143B2F] cursor-pointer"
                  >
                    Track in Buyer Dashboard
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmedSample(null)}
                    className="px-4 py-2 text-xs font-medium border border-[#0F1F3D]/20 text-[#0F1F3D] rounded-lg hover:bg-white cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              sampleOpen && (
                <form onSubmit={handleSampleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm bg-[#FAF7F2] border border-[#0F1F3D]/15 rounded-lg focus:outline-none focus:border-[#1B4D3E]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                        Brand / Boutique Name
                      </label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm bg-[#FAF7F2] border border-[#0F1F3D]/15 rounded-lg focus:outline-none focus:border-[#1B4D3E]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={buyerCity}
                        onChange={(e) => setBuyerCity(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm bg-[#FAF7F2] border border-[#0F1F3D]/15 rounded-lg focus:outline-none focus:border-[#1B4D3E]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                        Sample Format
                      </label>
                      <select
                        value={sampleFormat}
                        onChange={(e) =>
                          setSampleFormat(e.target.value as SampleFormat)
                        }
                        className="w-full px-3.5 py-2 text-sm bg-[#FAF7F2] border border-[#0F1F3D]/15 rounded-lg focus:outline-none focus:border-[#1B4D3E]"
                      >
                        <option value="A4 Swatch Card">
                          A4 Swatch Card (Free Demo)
                        </option>
                        <option value="2-Meter Yardage Cut">
                          2-Meter Yardage Cut (Sampling)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                      Intended Garment Category
                    </label>
                    <input
                      type="text"
                      required
                      value={garmentCategory}
                      onChange={(e) => setGarmentCategory(e.target.value)}
                      placeholder="e.g., Resort Shirts, Festive Kurtas"
                      className="w-full px-3.5 py-2 text-sm bg-[#FAF7F2] border border-[#0F1F3D]/15 rounded-lg focus:outline-none focus:border-[#1B4D3E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                      Studio / Sampling Delivery Address
                    </label>
                    <input
                      type="text"
                      required
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-[#FAF7F2] border border-[#0F1F3D]/15 rounded-lg focus:outline-none focus:border-[#1B4D3E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                      Notes for Mill (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Specify Pantone reference, shrinkage test needs, or target bulk volume..."
                      className="w-full px-3.5 py-2 text-sm bg-[#FAF7F2] border border-[#0F1F3D]/15 rounded-lg focus:outline-none focus:border-[#1B4D3E]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium bg-[#0F1F3D] hover:bg-[#1B4D3E] text-white rounded-lg transition-colors cursor-pointer"
                  >
                    <PackageCheck className="w-4 h-4" />
                    <span>Submit Sample Request</span>
                  </button>
                </form>
              )
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
