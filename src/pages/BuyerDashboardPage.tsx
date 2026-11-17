import { ArrowRight, Bookmark, Search } from 'lucide-react';
import React, { useState } from 'react';
import { FabricCard } from '../components/FabricCard';
import { useMarketplace } from '../context/MarketplaceContext';

export function BuyerDashboardPage() {
  const {
    user,
    fabrics,
    savedFabricIds,
    sampleRequests,
    orders,
    activities,
    navigate,
    switchRole,
  } = useMarketplace();

  const [quickSearch, setQuickSearch] = useState('');

  const featuredFabrics = fabrics.filter((f) => f.active && f.featured).slice(0, 3);
  const savedFabrics = fabrics.filter((f) => savedFabricIds.includes(f.id));
  const totalMetersOrdered = orders.reduce(
    (sum, ord) => sum + ord.items.reduce((s, i) => s + i.meters, 0),
    0
  );

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('marketplace', { search: quickSearch });
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Workspace Header & Role Switcher Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#0F1F3D]/10">
        <div>
          <p className="text-xs font-medium text-[#1B4D3E]">
            Buyer Sourcing Hub · Prototype Demo Session
          </p>
          <h1 className="font-display text-3xl font-semibold text-[#0F1F3D] mt-1">
            Welcome back, {user.role === 'buyer' ? user.name : 'Meera Nair'}
          </h1>
          <p className="text-xs text-[#435066] mt-1">
            {user.role === 'buyer' ? user.company : 'Aarav Atelier (Demo Buyer)'} ·{' '}
            {user.city || 'Bengaluru'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              switchRole('supplier');
              navigate('supplier-dashboard');
            }}
            className="px-3.5 py-2 text-xs font-medium border border-[#0F1F3D]/15 rounded-lg text-[#0F1F3D] bg-white hover:bg-[#F3EDE2] cursor-pointer whitespace-nowrap"
          >
            Switch to Supplier Hub
          </button>
          <button
            type="button"
            onClick={() => {
              switchRole('admin');
              navigate('admin-dashboard');
            }}
            className="px-3.5 py-2 text-xs font-medium border border-[#0F1F3D]/15 rounded-lg text-[#0F1F3D] bg-white hover:bg-[#F3EDE2] cursor-pointer whitespace-nowrap"
          >
            Switch to Admin View
          </button>
        </div>
      </div>

      {/* Buyer Quick Search Bar */}
      <form
        onSubmit={handleQuickSearch}
        className="bg-white rounded-xl border border-[#0F1F3D]/10 p-4 flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#435066] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={quickSearch}
            onChange={(e) => setQuickSearch(e.target.value)}
            placeholder="Search fabrics by GSM, mill city (Surat, Tiruppur), or weave..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#FAF7F2] border border-[#0F1F3D]/12 rounded-lg focus:outline-none focus:border-[#1B4D3E]"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 text-sm font-medium bg-[#1B4D3E] hover:bg-[#143B2F] text-white rounded-lg cursor-pointer whitespace-nowrap"
        >
          Search Marketplace
        </button>
      </form>

      {/* 4 Tabular KPI Metrics */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-[#0F1F3D]/10 p-5">
          <p className="text-xs text-[#435066]">Sample Enquiries</p>
          <p className="font-display text-2xl font-semibold text-[#0F1F3D] mt-1 tabular-nums">
            {sampleRequests.length}
          </p>
          <p className="text-xs text-[#1B4D3E] mt-1">
            {
              sampleRequests.filter(
                (s) => s.status === 'Approved' || s.status === 'Dispatched'
              ).length
            }{' '}
            approved or dispatched
          </p>
        </div>

        <div className="bg-white rounded-xl border border-[#0F1F3D]/10 p-5">
          <p className="text-xs text-[#435066]">Saved Swatches</p>
          <p className="font-display text-2xl font-semibold text-[#0F1F3D] mt-1 tabular-nums">
            {savedFabrics.length}
          </p>
          <p className="text-xs text-[#435066] mt-1">Shortlisted mill lots</p>
        </div>

        <div className="bg-white rounded-xl border border-[#0F1F3D]/10 p-5">
          <p className="text-xs text-[#435066]">Demo Orders</p>
          <p className="font-display text-2xl font-semibold text-[#0F1F3D] mt-1 tabular-nums">
            {orders.length}
          </p>
          <p className="text-xs text-[#435066] mt-1">LocalStorage history</p>
        </div>

        <div className="bg-white rounded-xl border border-[#0F1F3D]/10 p-5">
          <p className="text-xs text-[#435066]">Yardage Sourced (Demo)</p>
          <p className="font-display text-2xl font-semibold text-[#0F1F3D] mt-1 tabular-nums">
            {totalMetersOrdered.toLocaleString('en-IN')} m
          </p>
          <p className="text-xs text-[#435066] mt-1">Across Indian clusters</p>
        </div>
      </section>

      {/* Featured Fabrics */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-[#0F1F3D]">
            Featured for your studio
          </h2>
          <button
            type="button"
            onClick={() => navigate('marketplace')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1B4D3E] hover:underline cursor-pointer"
          >
            <span>Browse all</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredFabrics.map((fabric) => (
            <FabricCard key={fabric.id} fabric={fabric} />
          ))}
        </div>
      </section>

      {/* Two-Column Activity & Sample Tracker */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sample Requests Table */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#0F1F3D]/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-[#0F1F3D]/10 flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold text-[#0F1F3D]">
                Sample Requests (Demo)
              </h2>
              <p className="text-xs text-[#435066]">
                Updates automatically when suppliers review enquiries
              </p>
            </div>
          </div>

          {sampleRequests.length === 0 ? (
            <div className="p-8 text-center text-sm text-[#435066]">
              No sample requests yet. Open any fabric page to request a swatch.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#FAF7F2] text-xs text-[#435066] border-b border-[#0F1F3D]/10">
                  <tr>
                    <th className="py-3 px-4 font-medium">Request ID</th>
                    <th className="py-3 px-4 font-medium">Fabric & Cluster</th>
                    <th className="py-3 px-4 font-medium">Format</th>
                    <th className="py-3 px-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0F1F3D]/8">
                  {sampleRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-[#FAF7F2]/60">
                      <td className="py-3 px-4 font-mono-tabular text-xs text-[#0F1F3D]">
                        {req.id}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          type="button"
                          onClick={() =>
                            navigate('product-detail', {
                              fabricId: req.fabricId,
                            })
                          }
                          className="font-medium text-[#0F1F3D] hover:text-[#1B4D3E] text-left cursor-pointer"
                        >
                          {req.fabricName}
                        </button>
                        <p className="text-xs text-[#435066]">
                          {req.supplierName} · {req.cluster}
                        </p>
                      </td>
                      <td className="py-3 px-4 text-xs text-[#435066]">
                        {req.sampleFormat}
                      </td>
                      <td className="py-3 px-4 text-xs font-medium">
                        <span
                          className={
                            req.status === 'Dispatched' ||
                            req.status === 'Approved'
                              ? 'text-[#1B4D3E]'
                              : req.status === 'Declined'
                                ? 'text-red-700'
                                : 'text-amber-700'
                          }
                        >
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Activity & Saved Swatches */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-xl border border-[#0F1F3D]/10 p-6">
            <h2 className="font-display text-lg font-semibold text-[#0F1F3D] mb-4">
              Recent Activity
            </h2>
            <ul className="divide-y divide-[#0F1F3D]/8">
              {activities.slice(0, 5).map((act) => (
                <li key={act.id} className="py-3 first:pt-0 last:pb-0">
                  <p className="text-sm font-medium text-[#0F1F3D]">
                    {act.title}
                  </p>
                  <p className="text-xs text-[#435066] mt-0.5">
                    {act.detail} · {act.timestamp}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl border border-[#0F1F3D]/10 p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display text-lg font-semibold text-[#0F1F3D]">
                Saved Swatches
              </h2>
              <Bookmark className="w-4 h-4 text-[#1B4D3E]" />
            </div>
            {savedFabrics.length === 0 ? (
              <p className="text-sm text-[#435066]">
                No saved fabrics yet. Click the bookmark icon on any fabric card.
              </p>
            ) : (
              <ul className="divide-y divide-[#0F1F3D]/8">
                {savedFabrics.map((f) => (
                  <li
                    key={f.id}
                    className="py-2.5 flex items-center justify-between gap-3"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        navigate('product-detail', { fabricId: f.id })
                      }
                      className="text-left min-w-0 cursor-pointer"
                    >
                      <p className="text-sm font-medium text-[#0F1F3D] hover:text-[#1B4D3E] truncate">
                        {f.name}
                      </p>
                      <p className="text-xs text-[#435066] tabular-nums">
                        {f.cluster} · {f.gsm} GSM · ₹{f.pricePerMeter}/m
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        navigate('product-detail', { fabricId: f.id })
                      }
                      className="text-xs font-medium text-[#1B4D3E] hover:underline shrink-0 cursor-pointer"
                    >
                      View
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* Demo Orders History */}
      <section className="bg-white rounded-xl border border-[#0F1F3D]/10 overflow-hidden">
        <div className="px-6 py-4 border-b border-[#0F1F3D]/10">
          <h2 className="font-display text-lg font-semibold text-[#0F1F3D]">
            Demo Yardage Orders
          </h2>
          <p className="text-xs text-[#435066]">
            Simulated B2B transactions stored locally (no real payment processed)
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FAF7F2] text-xs text-[#435066] border-b border-[#0F1F3D]/10">
              <tr>
                <th className="py-3 px-4 font-medium">Order ID</th>
                <th className="py-3 px-4 font-medium">Date</th>
                <th className="py-3 px-4 font-medium">Buyer / Studio</th>
                <th className="py-3 px-4 font-medium">Items</th>
                <th className="py-3 px-4 font-medium text-right">
                  Demo Total (₹)
                </th>
                <th className="py-3 px-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0F1F3D]/8">
              {orders.map((ord) => (
                <tr key={ord.id}>
                  <td className="py-3 px-4 font-mono-tabular text-xs text-[#0F1F3D]">
                    {ord.id}
                  </td>
                  <td className="py-3 px-4 text-xs text-[#435066] tabular-nums">
                    {ord.createdAt}
                  </td>
                  <td className="py-3 px-4 text-xs text-[#0F1F3D]">
                    {ord.companyName} · {ord.city}
                  </td>
                  <td className="py-3 px-4 text-xs text-[#435066]">
                    {ord.items
                      .map((i) => `${i.name} (${i.meters}m)`)
                      .join(', ')}
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-[#0F1F3D] tabular-nums">
                    ₹{ord.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-xs font-medium text-[#1B4D3E]">
                    {ord.status}
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
