import { Plus, X } from 'lucide-react';
import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { FabricColor, FabricType } from '../types/marketplace';

export function SupplierDashboardPage() {
  const {
    user,
    fabrics,
    sampleRequests,
    addSupplierFabric,
    toggleFabricActive,
    updateSampleStatus,
    navigate,
    switchRole,
  } = useMarketplace();

  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState<FabricType>('Cotton');
  const [color, setColor] = useState<FabricColor>('Ivory');
  const [gsm, setGsm] = useState(145);
  const [widthInches, setWidthInches] = useState(56);
  const [composition, setComposition] = useState('100% Combed Organic Cotton');
  const [weave, setWeave] = useState('Plain Poplin');
  const [pricePerMeter, setPricePerMeter] = useState(290);
  const [moqMeters, setMoqMeters] = useState(40);
  const [stockMeters, setStockMeters] = useState(1800);
  const [description, setDescription] = useState('');

  const activeSupplierId = user.supplierId ?? 'sup-surat-1';
  const supplierFabrics = fabrics.filter(
    (f) => f.supplierId === activeSupplierId
  );

  // Show all enquiries to demonstrate real-time workflow when buyer submits on any fabric
  const relevantEnquiries = sampleRequests;

  const handleCreateFabric = (e: React.FormEvent) => {
    e.preventDefault();
    addSupplierFabric({
      name,
      type,
      color,
      gsm,
      widthInches,
      composition,
      weave,
      finish: 'Mill Standard Finish (Demo)',
      pricePerMeter,
      moqMeters,
      stockMeters,
      description:
        description ||
        'Demo mill listing added through Supplier Hub prototype workflow.',
    });
    setName('');
    setDescription('');
    setShowAddForm(false);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#0F1F3D]/10">
        <div>
          <p className="text-xs font-medium text-[#1B4D3E]">
            Supplier Mill Dashboard · Prototype Demo Data
          </p>
          <h1 className="font-display text-3xl font-semibold text-[#0F1F3D] mt-1">
            Narmada Loom Works (Demo)
          </h1>
          <p className="text-xs text-[#435066] mt-1">
            Surat Textile Cluster · Rapier & Air-Jet Mill · Managing{' '}
            {supplierFabrics.length} mill listings
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setShowAddForm((prev) => !prev)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-[#1B4D3E] hover:bg-[#143B2F] text-white rounded-lg cursor-pointer whitespace-nowrap"
          >
            {showAddForm ? (
              <>
                <X className="w-4 h-4" />
                <span>Cancel Listing</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Add New Fabric Lot</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              switchRole('buyer');
              navigate('buyer-dashboard');
            }}
            className="px-3.5 py-2.5 text-xs font-medium border border-[#0F1F3D]/15 rounded-lg text-[#0F1F3D] bg-white hover:bg-[#F3EDE2] cursor-pointer whitespace-nowrap"
          >
            Switch to Buyer Hub
          </button>
        </div>
      </div>

      {/* Add New Fabric Form */}
      {showAddForm && (
        <section className="bg-white rounded-2xl border border-[#1B4D3E]/25 p-6 sm:p-8">
          <h2 className="font-display text-xl font-semibold text-[#0F1F3D] mb-1">
            Publish New Demo Fabric Listing
          </h2>
          <p className="text-xs text-[#435066] mb-5">
            New lots appear immediately in the live Marketplace and persist in
            LocalStorage.
          </p>

          <form onSubmit={handleCreateFabric} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                  Fabric Title
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Surat Matte Viscose Organza"
                  className="w-full px-3.5 py-2 text-sm bg-[#FAF7F2] border border-[#0F1F3D]/15 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                  Fabric Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as FabricType)}
                  className="w-full px-3.5 py-2 text-sm bg-[#FAF7F2] border border-[#0F1F3D]/15 rounded-lg"
                >
                  <option value="Cotton">Cotton</option>
                  <option value="Silk">Silk</option>
                  <option value="Linen">Linen</option>
                  <option value="Knit">Knit</option>
                  <option value="Denim & Twill">Denim & Twill</option>
                  <option value="Viscose & Blends">Viscose & Blends</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                  Colourway
                </label>
                <select
                  value={color}
                  onChange={(e) => setColor(e.target.value as FabricColor)}
                  className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#0F1F3D]/15 rounded-lg"
                >
                  <option value="Ivory">Ivory</option>
                  <option value="Navy">Navy</option>
                  <option value="Forest">Forest</option>
                  <option value="Indigo">Indigo</option>
                  <option value="Terracotta">Terracotta</option>
                  <option value="Charcoal">Charcoal</option>
                  <option value="Oatmeal">Oatmeal</option>
                  <option value="Sage">Sage</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                  GSM
                </label>
                <input
                  type="number"
                  required
                  min={40}
                  max={600}
                  value={gsm}
                  onChange={(e) => setGsm(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm tabular-nums bg-[#FAF7F2] border border-[#0F1F3D]/15 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                  Width (in)
                </label>
                <input
                  type="number"
                  required
                  min={28}
                  max={80}
                  value={widthInches}
                  onChange={(e) => setWidthInches(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm tabular-nums bg-[#FAF7F2] border border-[#0F1F3D]/15 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                  Price (₹/m)
                </label>
                <input
                  type="number"
                  required
                  min={50}
                  value={pricePerMeter}
                  onChange={(e) => setPricePerMeter(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm tabular-nums bg-[#FAF7F2] border border-[#0F1F3D]/15 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                  MOQ (m)
                </label>
                <input
                  type="number"
                  required
                  min={10}
                  value={moqMeters}
                  onChange={(e) => setMoqMeters(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm tabular-nums bg-[#FAF7F2] border border-[#0F1F3D]/15 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                  Stock (m)
                </label>
                <input
                  type="number"
                  required
                  min={50}
                  value={stockMeters}
                  onChange={(e) => setStockMeters(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm tabular-nums bg-[#FAF7F2] border border-[#0F1F3D]/15 rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                  Composition
                </label>
                <input
                  type="text"
                  required
                  value={composition}
                  onChange={(e) => setComposition(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-[#FAF7F2] border border-[#0F1F3D]/15 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                  Weave / Knit Structure
                </label>
                <input
                  type="text"
                  required
                  value={weave}
                  onChange={(e) => setWeave(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-[#FAF7F2] border border-[#0F1F3D]/15 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                Fabric Notes & Garment Suitability
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe handfeel, drape, and recommended apparel categories..."
                className="w-full px-3.5 py-2 text-sm bg-[#FAF7F2] border border-[#0F1F3D]/15 rounded-lg"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 text-sm font-medium bg-[#1B4D3E] hover:bg-[#143B2F] text-white rounded-lg cursor-pointer"
              >
                Publish to Marketplace
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Supplier Listings Table */}
      <section className="bg-white rounded-xl border border-[#0F1F3D]/10 overflow-hidden">
        <div className="px-6 py-4 border-b border-[#0F1F3D]/10 flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold text-[#0F1F3D]">
              Mill Fabric Listings
            </h2>
            <p className="text-xs text-[#435066]">
              Manage active catalog visibility and inspect pricing tiers
            </p>
          </div>
          <span className="text-xs text-[#435066] tabular-nums">
            {supplierFabrics.length} lots
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FAF7F2] text-xs text-[#435066] border-b border-[#0F1F3D]/10">
              <tr>
                <th className="py-3 px-4 font-medium">SKU</th>
                <th className="py-3 px-4 font-medium">Fabric Name</th>
                <th className="py-3 px-4 font-medium">Spec</th>
                <th className="py-3 px-4 font-medium text-right">Price</th>
                <th className="py-3 px-4 font-medium text-right">MOQ</th>
                <th className="py-3 px-4 font-medium text-right">Stock</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0F1F3D]/8">
              {supplierFabrics.map((f) => (
                <tr key={f.id} className="hover:bg-[#FAF7F2]/60">
                  <td className="py-3 px-4 font-mono-tabular text-xs text-[#435066]">
                    {f.sku}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      type="button"
                      onClick={() =>
                        navigate('product-detail', { fabricId: f.id })
                      }
                      className="font-medium text-[#0F1F3D] hover:text-[#1B4D3E] text-left cursor-pointer"
                    >
                      {f.name}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-xs text-[#435066] tabular-nums">
                    {f.type} · {f.gsm} GSM · {f.color}
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-[#0F1F3D] tabular-nums">
                    ₹{f.pricePerMeter}/m
                  </td>
                  <td className="py-3 px-4 text-right text-xs text-[#435066] tabular-nums">
                    {f.moqMeters}m
                  </td>
                  <td className="py-3 px-4 text-right text-xs text-[#0F1F3D] tabular-nums">
                    {f.stockMeters.toLocaleString('en-IN')}m
                  </td>
                  <td className="py-3 px-4 text-xs font-medium">
                    <span
                      className={
                        f.active ? 'text-[#1B4D3E]' : 'text-[#435066]'
                      }
                    >
                      {f.active ? 'Active' : 'Paused'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => toggleFabricActive(f.id)}
                      className="text-xs font-medium text-[#0F1F3D] hover:text-[#1B4D3E] underline cursor-pointer"
                    >
                      {f.active ? 'Pause' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Incoming Sample Enquiries Queue */}
      <section className="bg-white rounded-xl border border-[#0F1F3D]/10 overflow-hidden">
        <div className="px-6 py-4 border-b border-[#0F1F3D]/10">
          <h2 className="font-display text-xl font-semibold text-[#0F1F3D]">
            Sample Enquiries Queue (Demo)
          </h2>
          <p className="text-xs text-[#435066]">
            Approve or mark incoming buyer swatch requests as dispatched
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FAF7F2] text-xs text-[#435066] border-b border-[#0F1F3D]/10">
              <tr>
                <th className="py-3 px-4 font-medium">ID</th>
                <th className="py-3 px-4 font-medium">Buyer Studio</th>
                <th className="py-3 px-4 font-medium">Requested Fabric</th>
                <th className="py-3 px-4 font-medium">Format & Use</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium text-right">
                  Workflow Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0F1F3D]/8">
              {relevantEnquiries.map((req) => (
                <tr key={req.id} className="hover:bg-[#FAF7F2]/60">
                  <td className="py-3 px-4 font-mono-tabular text-xs text-[#435066]">
                    {req.id}
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-medium text-[#0F1F3D] text-xs">
                      {req.companyName}
                    </p>
                    <p className="text-xs text-[#435066]">
                      {req.buyerName} · {req.buyerCity}
                    </p>
                  </td>
                  <td className="py-3 px-4 text-xs text-[#0F1F3D]">
                    <p className="font-medium">{req.fabricName}</p>
                    <p className="text-[#435066]">{req.supplierName}</p>
                  </td>
                  <td className="py-3 px-4 text-xs text-[#435066]">
                    <p>{req.sampleFormat}</p>
                    <p>{req.garmentCategory}</p>
                  </td>
                  <td className="py-3 px-4 text-xs font-medium">
                    <span
                      className={
                        req.status === 'Dispatched' || req.status === 'Approved'
                          ? 'text-[#1B4D3E]'
                          : req.status === 'Declined'
                            ? 'text-red-700'
                            : 'text-amber-700'
                      }
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                    {req.status === 'Pending Review' && (
                      <>
                        <button
                          type="button"
                          onClick={() => updateSampleStatus(req.id, 'Approved')}
                          className="px-2.5 py-1 text-xs font-medium bg-[#1B4D3E] text-white rounded hover:bg-[#143B2F] cursor-pointer"
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => updateSampleStatus(req.id, 'Declined')}
                          className="px-2.5 py-1 text-xs font-medium border border-[#0F1F3D]/20 text-[#0F1F3D] rounded hover:bg-[#F3EDE2] cursor-pointer"
                        >
                          Decline
                        </button>
                      </>
                    )}
                    {req.status === 'Approved' && (
                      <button
                        type="button"
                        onClick={() => updateSampleStatus(req.id, 'Dispatched')}
                        className="px-2.5 py-1 text-xs font-medium bg-[#0F1F3D] text-white rounded hover:bg-[#1B4D3E] cursor-pointer"
                      >
                        Mark Dispatched
                      </button>
                    )}
                    {(req.status === 'Dispatched' ||
                      req.status === 'Declined') && (
                      <span className="text-xs text-[#435066]">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
