import { ArrowRight, Building2, ShieldCheck, UserCheck } from 'lucide-react';
import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { UserRole } from '../types/marketplace';

export function LoginPage() {
  const { user, switchRole, navigate } = useMarketplace();
  const [selectedRole, setSelectedRole] = useState<Exclude<UserRole, 'guest'>>(
    user.role === 'guest' ? 'buyer' : user.role
  );
  const [customName, setCustomName] = useState('');
  const [customCompany, setCustomCompany] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    switchRole(selectedRole, customName, customCompany);
    if (selectedRole === 'buyer') navigate('buyer-dashboard');
    else if (selectedRole === 'supplier') navigate('supplier-dashboard');
    else navigate('admin-dashboard');
  };

  const quickEnter = (role: Exclude<UserRole, 'guest'>) => {
    switchRole(role);
    if (role === 'buyer') navigate('buyer-dashboard');
    else if (role === 'supplier') navigate('supplier-dashboard');
    else navigate('admin-dashboard');
  };

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mb-10">
        <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#1B4D3E]">
          Prototype Access Portal
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#0F1F3D] mt-1.5">
          Sign in to a Vastra Innovations workspace
        </h1>
        <p className="text-sm text-[#435066] mt-2 leading-relaxed">
          Select a demo persona below for instant single-click access, or
          customize your studio name. No real passwords or external OAuth calls
          are used in this academic prototype.
        </p>
      </div>

      {/* 3 Quick-Launch Role Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl border border-[#0F1F3D]/10 p-6 flex flex-col justify-between gap-5">
          <div>
            <UserCheck className="w-6 h-6 text-[#1B4D3E] mb-3" strokeWidth={1.75} />
            <h2 className="font-display text-xl font-semibold text-[#0F1F3D]">
              Apparel Buyer
            </h2>
            <p className="text-xs text-[#435066] mt-1">
              Aarav Atelier (Demo Buyer) · Bengaluru
            </p>
            <p className="text-sm text-[#435066] mt-3 leading-relaxed">
              Search mills, bookmark fabric swatches, track sample enquiries,
              and review demo yardage orders.
            </p>
          </div>
          <button
            type="button"
            onClick={() => quickEnter('buyer')}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium bg-[#1B4D3E] hover:bg-[#143B2F] text-white rounded-lg transition-colors cursor-pointer"
          >
            <span>Enter Buyer Hub</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-white rounded-xl border border-[#0F1F3D]/10 p-6 flex flex-col justify-between gap-5">
          <div>
            <Building2 className="w-6 h-6 text-[#1B4D3E] mb-3" strokeWidth={1.75} />
            <h2 className="font-display text-xl font-semibold text-[#0F1F3D]">
              Textile Supplier
            </h2>
            <p className="text-xs text-[#435066] mt-1">
              Narmada Loom Works (Demo) · Surat
            </p>
            <p className="text-sm text-[#435066] mt-3 leading-relaxed">
              Publish new fabric lots to the marketplace, manage active stock,
              and approve or dispatch sample enquiries.
            </p>
          </div>
          <button
            type="button"
            onClick={() => quickEnter('supplier')}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium bg-[#0F1F3D] hover:bg-[#1B4D3E] text-white rounded-lg transition-colors cursor-pointer"
          >
            <span>Enter Supplier Hub</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-white rounded-xl border border-[#0F1F3D]/10 p-6 flex flex-col justify-between gap-5">
          <div>
            <ShieldCheck className="w-6 h-6 text-[#1B4D3E] mb-3" strokeWidth={1.75} />
            <h2 className="font-display text-xl font-semibold text-[#0F1F3D]">
              Platform Admin
            </h2>
            <p className="text-xs text-[#435066] mt-1">
              Vastra Operations (Demo) · All Clusters
            </p>
            <p className="text-sm text-[#435066] mt-3 leading-relaxed">
              Inspect demo GMV statistics, cluster distribution across India,
              sample conversion metrics, and demo ledger entries.
            </p>
          </div>
          <button
            type="button"
            onClick={() => quickEnter('admin')}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium border border-[#0F1F3D]/25 text-[#0F1F3D] hover:bg-[#F3EDE2] rounded-lg transition-colors cursor-pointer"
          >
            <span>Enter Admin Hub</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Custom Demo Sign-in Form */}
      <div className="bg-white rounded-2xl border border-[#0F1F3D]/10 p-6 sm:p-8 max-w-xl">
        <h2 className="font-display text-xl font-semibold text-[#0F1F3D]">
          Custom Prototype Sign-In
        </h2>
        <p className="text-xs text-[#435066] mt-1 mb-5">
          Current session: <strong className="text-[#0F1F3D]">{user.company}</strong> ({user.role})
        </p>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
              Workspace Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) =>
                setSelectedRole(e.target.value as Exclude<UserRole, 'guest'>)
              }
              className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#0F1F3D]/15 rounded-lg"
            >
              <option value="buyer">Buyer (Apparel Brand / Boutique)</option>
              <option value="supplier">Supplier (Textile Mill)</option>
              <option value="admin">Admin (Marketplace Operations)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                Your Name (Optional)
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Leave blank for demo default"
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#0F1F3D]/15 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                Company / Mill Name (Optional)
              </label>
              <input
                type="text"
                value={customCompany}
                onChange={(e) => setCustomCompany(e.target.value)}
                placeholder="Leave blank for demo default"
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#0F1F3D]/15 rounded-lg"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 text-sm font-medium bg-[#1B4D3E] hover:bg-[#143B2F] text-white rounded-lg cursor-pointer"
          >
            Launch Workspace
          </button>
        </form>
      </div>
    </main>
  );
}
