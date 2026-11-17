import { ArrowRight, CheckCircle2 } from 'lucide-react';
import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { SupplierApplication, TextileCluster } from '../types/marketplace';

export function ForSuppliersPage() {
  const { submitSupplierApplication, navigate, switchRole, suppliers } =
    useMarketplace();

  const [millName, setMillName] = useState('');
  const [contactName, setContactName] = useState('');
  const [city, setCity] = useState<TextileCluster>('Surat');
  const [primaryCategories, setPrimaryCategories] = useState(
    'Cotton Poplin, Viscose Crepe'
  );
  const [monthlyCapacity, setMonthlyCapacity] = useState('45,000 meters');
  const [submittedApp, setSubmittedApp] = useState<SupplierApplication | null>(
    null
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = submitSupplierApplication({
      millName,
      contactName,
      city,
      primaryCategories,
      monthlyCapacity,
    });
    setSubmittedApp(created);
    setMillName('');
    setContactName('');
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-6 space-y-6">
          <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#1B4D3E]">
            For Indian Weaving Mills & Dye Houses
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#0F1F3D] leading-tight">
            Turn spare loom capacity into recurring D2C & boutique apparel
            orders.
          </h1>
          <p className="text-base text-[#435066] leading-relaxed">
            Vastra Innovations connects mills in Surat, Ahmedabad, Tiruppur,
            Bengaluru, Mumbai, and Hyderabad directly with verified garment
            makers and independent fashion labels seeking 20–500 meter runs.
          </p>

          <div className="space-y-4 pt-2 border-t border-[#0F1F3D]/10">
            <div>
              <h2 className="font-display text-lg font-semibold text-[#0F1F3D]">
                Structured GSM & weave specifications
              </h2>
              <p className="text-sm text-[#435066] mt-1">
                Eliminate repetitive WhatsApp enquiries by listing width,
                shrinkage, MOQ, and bulk price tiers once.
              </p>
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-[#0F1F3D]">
                Qualified sample enquiries
              </h2>
              <p className="text-sm text-[#435066] mt-1">
                Every swatch request arrives with intended garment category,
                buyer city, and target volume context.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                switchRole('supplier');
                navigate('supplier-dashboard');
              }}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium bg-[#0F1F3D] hover:bg-[#1B4D3E] text-white rounded-lg transition-colors cursor-pointer"
            >
              <span>Open Demo Supplier Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Demo Mill Onboarding Application Form */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-[#0F1F3D]/10 p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-[#0F1F3D]">
            Supplier Onboarding Interest (Demo)
          </h2>
          <p className="text-xs text-[#435066] mt-1 mb-6">
            Prototype form · No real verification or GST check is performed
          </p>

          {submittedApp ? (
            <div className="bg-[#FAF7F2] rounded-xl border border-[#1B4D3E]/25 p-6 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#1B4D3E] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-[#1B4D3E]">
                    Demo Application Logged
                  </p>
                  <h3 className="font-display text-lg font-semibold text-[#0F1F3D] tabular-nums">
                    {submittedApp.id} — {submittedApp.millName}
                  </h3>
                  <p className="text-sm text-[#435066] mt-1">
                    Logged for {submittedApp.city} cluster in browser
                    LocalStorage.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    switchRole('supplier');
                    navigate('supplier-dashboard');
                  }}
                  className="px-4 py-2 text-xs font-medium bg-[#1B4D3E] text-white rounded-lg cursor-pointer"
                >
                  Preview Supplier Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => setSubmittedApp(null)}
                  className="px-4 py-2 text-xs font-medium border border-[#0F1F3D]/20 text-[#0F1F3D] rounded-lg cursor-pointer"
                >
                  Submit Another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                  Mill / Weaving House Name
                </label>
                <input
                  type="text"
                  required
                  value={millName}
                  onChange={(e) => setMillName(e.target.value)}
                  placeholder="e.g., Tapi Valley Textile Mills"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#0F1F3D]/15 rounded-lg focus:outline-none focus:border-[#1B4D3E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                    Primary Contact Person
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g., Rajeshbhai Desai"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#0F1F3D]/15 rounded-lg focus:outline-none focus:border-[#1B4D3E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                    Textile Cluster City
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value as TextileCluster)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#0F1F3D]/15 rounded-lg focus:outline-none focus:border-[#1B4D3E]"
                  >
                    <option value="Surat">Surat</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Tiruppur">Tiruppur</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Hyderabad">Hyderabad</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                    Primary Fabric Categories
                  </label>
                  <input
                    type="text"
                    required
                    value={primaryCategories}
                    onChange={(e) => setPrimaryCategories(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#0F1F3D]/15 rounded-lg focus:outline-none focus:border-[#1B4D3E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                    Monthly Output Capacity
                  </label>
                  <input
                    type="text"
                    required
                    value={monthlyCapacity}
                    onChange={(e) => setMonthlyCapacity(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#0F1F3D]/15 rounded-lg focus:outline-none focus:border-[#1B4D3E]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 text-sm font-medium bg-[#1B4D3E] hover:bg-[#143B2F] text-white rounded-lg transition-colors cursor-pointer"
              >
                Submit Demo Mill Application
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Active Demo Mills Directory */}
      <section className="pt-8 border-t border-[#0F1F3D]/10">
        <h2 className="font-display text-2xl font-semibold text-[#0F1F3D] mb-6">
          Active Prototype Mill Partners (Demo Data)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suppliers.map((sup) => (
            <div
              key={sup.id}
              className="bg-white rounded-xl border border-[#0F1F3D]/10 p-5 space-y-2"
            >
              <div className="flex items-center justify-between text-xs text-[#435066]">
                <span>{sup.city} Cluster</span>
                <span className="tabular-nums">Est. {sup.establishedYear}</span>
              </div>
              <h3 className="font-display text-lg font-semibold text-[#0F1F3D]">
                {sup.name}
              </h3>
              <p className="text-xs text-[#435066]">{sup.millType}</p>
              <div className="pt-2 border-t border-[#0F1F3D]/8 flex justify-between text-xs text-[#0F1F3D] tabular-nums">
                <span>
                  Capacity:{' '}
                  {(sup.monthlyCapacityMeters / 1000).toFixed(0)}k m/mo
                </span>
                <span>Lead: {sup.leadTimeDays}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
