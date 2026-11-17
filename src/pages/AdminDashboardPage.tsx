import { RotateCcw } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { TextileCluster } from '../types/marketplace';

const CLUSTERS: TextileCluster[] = [
  'Surat',
  'Ahmedabad',
  'Tiruppur',
  'Bengaluru',
  'Mumbai',
  'Hyderabad',
];

export function AdminDashboardPage() {
  const {
    fabrics,
    suppliers,
    sampleRequests,
    orders,
    supplierApplications,
    toggleFabricFeatured,
    resetDemoState,
    navigate,
  } = useMarketplace();

  const totalDemoGmv = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const activeLots = fabrics.filter((f) => f.active).length;
  const approvedSamples = sampleRequests.filter(
    (s) => s.status === 'Approved' || s.status === 'Dispatched'
  ).length;
  const sampleApprovalRate = sampleRequests.length
    ? Math.round((approvedSamples / sampleRequests.length) * 100)
    : 0;

  const clusterStats = CLUSTERS.map((city) => {
    const lots = fabrics.filter((f) => f.cluster === city);
    const totalStock = lots.reduce((s, f) => s + f.stockMeters, 0);
    return { city, count: lots.length, totalStock };
  });

  const maxClusterLots = Math.max(...clusterStats.map((c) => c.count), 1);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#0F1F3D]/10">
        <div>
          <p className="text-xs font-medium text-[#1B4D3E]">
            Admin Operations Console · Academic Prototype Demo Statistics
          </p>
          <h1 className="font-display text-3xl font-semibold text-[#0F1F3D] mt-1">
            Marketplace Analytics & Oversight
          </h1>
          <p className="text-xs text-[#435066] mt-1">
            All metrics, suppliers, and transactions below reflect simulated
            LocalStorage prototype records.
          </p>
        </div>

        <button
          type="button"
          onClick={resetDemoState}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium border border-[#0F1F3D]/20 rounded-lg text-[#0F1F3D] bg-white hover:bg-[#F3EDE2] cursor-pointer self-start lg:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Dataset</span>
        </button>
      </div>

      {/* 4 Tabular KPIs */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-[#0F1F3D]/10 p-5">
          <p className="text-xs text-[#435066]">Demo Order Volume (GMV)</p>
          <p className="font-display text-2xl font-semibold text-[#0F1F3D] mt-1 tabular-nums">
            ₹{totalDemoGmv.toLocaleString('en-IN')}
          </p>
          <p className="text-xs text-[#435066] mt-1 tabular-nums">
            Across {orders.length} demo transactions
          </p>
        </div>

        <div className="bg-white rounded-xl border border-[#0F1F3D]/10 p-5">
          <p className="text-xs text-[#435066]">Demo Mill Partners</p>
          <p className="font-display text-2xl font-semibold text-[#0F1F3D] mt-1 tabular-nums">
            {suppliers.length}
          </p>
          <p className="text-xs text-[#435066] mt-1 tabular-nums">
            +{supplierApplications.length} new demo applications
          </p>
        </div>

        <div className="bg-white rounded-xl border border-[#0F1F3D]/10 p-5">
          <p className="text-xs text-[#435066]">Active Fabric Lots</p>
          <p className="font-display text-2xl font-semibold text-[#0F1F3D] mt-1 tabular-nums">
            {activeLots}
          </p>
          <p className="text-xs text-[#435066] mt-1 tabular-nums">
            {fabrics.filter((f) => f.featured).length} featured on home
          </p>
        </div>

        <div className="bg-white rounded-xl border border-[#0F1F3D]/10 p-5">
          <p className="text-xs text-[#435066]">Sample Approval Rate (Demo)</p>
          <p className="font-display text-2xl font-semibold text-[#1B4D3E] mt-1 tabular-nums">
            {sampleApprovalRate}%
          </p>
          <p className="text-xs text-[#435066] mt-1 tabular-nums">
            {approvedSamples} of {sampleRequests.length} enquiries
          </p>
        </div>
      </section>

      {/* Cluster Breakdown + Recent Demo Transactions */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#0F1F3D]/10 p-6 space-y-5">
          <div>
            <h2 className="font-display text-xl font-semibold text-[#0F1F3D]">
              Inventory by Textile Cluster
            </h2>
            <p className="text-xs text-[#435066] mt-0.5">
              Active fabric lots and simulated mill stock across India
            </p>
          </div>

          <div className="space-y-4">
            {clusterStats.map((item) => {
              const widthPct = Math.max(12, Math.round((item.count / maxClusterLots) * 100));
              return (
                <div key={item.city} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#0F1F3D]">
                      {item.city}
                    </span>
                    <span className="text-[#435066] tabular-nums">
                      {item.count} lots ·{' '}
                      {item.totalStock.toLocaleString('en-IN')}m
                    </span>
                  </div>
                  <div className="h-2 bg-[#F3EDE2] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1B4D3E] rounded-full transition-all duration-300"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-7 bg-white rounded-xl border border-[#0F1F3D]/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-[#0F1F3D]/10">
            <h2 className="font-display text-xl font-semibold text-[#0F1F3D]">
              Recent Demo Transactions
            </h2>
            <p className="text-xs text-[#435066]">
              Simulated mock-checkout orders recorded on platform
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#FAF7F2] text-xs text-[#435066] border-b border-[#0F1F3D]/10">
                <tr>
                  <th className="py-3 px-4 font-medium">Order ID</th>
                  <th className="py-3 px-4 font-medium">Buyer (Demo)</th>
                  <th className="py-3 px-4 font-medium">Settlement</th>
                  <th className="py-3 px-4 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0F1F3D]/8">
                {orders.map((ord) => (
                  <tr key={ord.id}>
                    <td className="py-3 px-4 font-mono-tabular text-xs text-[#0F1F3D]">
                      {ord.id}
                    </td>
                    <td className="py-3 px-4 text-xs">
                      <p className="font-medium text-[#0F1F3D]">
                        {ord.companyName}
                      </p>
                      <p className="text-[#435066]">
                        {ord.city} · {ord.createdAt}
                      </p>
                    </td>
                    <td className="py-3 px-4 text-xs text-[#435066]">
                      {ord.paymentMethod}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-[#0F1F3D] tabular-nums">
                      ₹{ord.totalAmount.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Catalog Curation Table */}
      <section className="bg-white rounded-xl border border-[#0F1F3D]/10 overflow-hidden">
        <div className="px-6 py-4 border-b border-[#0F1F3D]/10">
          <h2 className="font-display text-xl font-semibold text-[#0F1F3D]">
            Catalog Curation & Featured Placement
          </h2>
          <p className="text-xs text-[#435066]">
            Control which demo lots appear in the Featured section
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FAF7F2] text-xs text-[#435066] border-b border-[#0F1F3D]/10">
              <tr>
                <th className="py-3 px-4 font-medium">SKU</th>
                <th className="py-3 px-4 font-medium">Fabric</th>
                <th className="py-3 px-4 font-medium">Cluster & Supplier</th>
                <th className="py-3 px-4 font-medium text-right">Price</th>
                <th className="py-3 px-4 font-medium text-right">Featured</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0F1F3D]/8">
              {fabrics.map((f) => (
                <tr key={f.id} className="hover:bg-[#FAF7F2]/60">
                  <td className="py-2.5 px-4 font-mono-tabular text-xs text-[#435066]">
                    {f.sku}
                  </td>
                  <td className="py-2.5 px-4">
                    <button
                      type="button"
                      onClick={() =>
                        navigate('product-detail', { fabricId: f.id })
                      }
                      className="text-xs font-medium text-[#0F1F3D] hover:text-[#1B4D3E] cursor-pointer text-left"
                    >
                      {f.name}
                    </button>
                  </td>
                  <td className="py-2.5 px-4 text-xs text-[#435066]">
                    {f.cluster} · {f.supplierName}
                  </td>
                  <td className="py-2.5 px-4 text-right text-xs font-medium text-[#0F1F3D] tabular-nums">
                    ₹{f.pricePerMeter}/m
                  </td>
                  <td className="py-2.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => toggleFabricFeatured(f.id)}
                      className={`px-2.5 py-1 text-xs font-medium rounded cursor-pointer ${
                        f.featured
                          ? 'bg-[#1B4D3E] text-white'
                          : 'border border-[#0F1F3D]/20 text-[#0F1F3D] hover:bg-[#F3EDE2]'
                      }`}
                    >
                      {f.featured ? 'Featured' : 'Feature'}
                    </button>
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
