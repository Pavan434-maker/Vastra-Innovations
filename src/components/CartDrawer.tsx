import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { DemoOrder } from '../types/marketplace';
import { FabricImage } from './FabricImage';

export function CartDrawer() {
  const {
    cartDrawerOpen,
    setCartDrawerOpen,
    cart,
    fabrics,
    updateCartMeters,
    removeFromCart,
    placeDemoOrder,
    user,
    navigate,
  } = useMarketplace();

  const [showCheckout, setShowCheckout] = useState(false);
  const [buyerName, setBuyerName] = useState(
    user.role === 'buyer' ? user.name : 'Meera Nair'
  );
  const [companyName, setCompanyName] = useState(
    user.role === 'buyer' ? user.company : 'Aarav Atelier (Demo Buyer)'
  );
  const [city, setCity] = useState(user.city || 'Bengaluru');
  const [address, setAddress] = useState(
    '42 Indiranagar 12th Main, HAL 2nd Stage, Bengaluru 560038'
  );
  const [paymentMethod, setPaymentMethod] = useState<DemoOrder['paymentMethod']>(
    'Demo Proforma Invoice'
  );
  const [confirmedOrder, setConfirmedOrder] = useState<DemoOrder | null>(null);

  if (!cartDrawerOpen) return null;

  const detailedItems = cart
    .map((item) => {
      const fabric = fabrics.find((f) => f.id === item.fabricId);
      if (!fabric) return null;
      const sortedTiers = [...fabric.bulkTiers].sort(
        (a, b) => b.minMeters - a.minMeters
      );
      const activeTier = sortedTiers.find((t) => item.meters >= t.minMeters);
      const unitPrice = activeTier
        ? activeTier.pricePerMeter
        : fabric.pricePerMeter;
      return {
        fabric,
        meters: item.meters,
        unitPrice,
        lineTotal: unitPrice * item.meters,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const subtotal = detailedItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const gstAmount = Math.round(subtotal * 0.05);
  const shippingFee = subtotal === 0 ? 0 : subtotal >= 25000 ? 0 : 850;
  const totalAmount = subtotal + gstAmount + shippingFee;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const order = placeDemoOrder({
      buyerName,
      companyName,
      city,
      address,
      paymentMethod,
    });
    if (order) {
      setConfirmedOrder(order);
      setShowCheckout(false);
    }
  };

  const handleClose = () => {
    setCartDrawerOpen(false);
    setConfirmedOrder(null);
    setShowCheckout(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#0F1F3D]/40 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Fabric Sourcing Cart and Mock Checkout"
    >
      <div className="w-full max-w-lg bg-[#FAF7F2] h-full flex flex-col border-l border-[#0F1F3D]/15 shadow-2xl">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#0F1F3D]/10 flex items-center justify-between bg-white">
          <div>
            <h2 className="font-display text-xl font-semibold text-[#0F1F3D]">
              {confirmedOrder
                ? 'Demo Order Confirmed'
                : showCheckout
                  ? 'Prototype Checkout'
                  : 'Sourcing Cart'}
            </h2>
            <p className="text-xs text-[#435066] mt-0.5">
              Academic prototype · No real payment processed
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close cart drawer"
            className="w-9 h-9 rounded-lg border border-[#0F1F3D]/15 flex items-center justify-center text-[#0F1F3D] hover:bg-[#F3EDE2] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {confirmedOrder ? (
            <div className="bg-white rounded-xl border border-[#1B4D3E]/25 p-6 space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#1B4D3E] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-[#1B4D3E]">
                    Prototype Order Recorded (LocalStorage)
                  </p>
                  <h3 className="font-display text-lg font-semibold text-[#0F1F3D] mt-0.5 tabular-nums">
                    {confirmedOrder.id}
                  </h3>
                  <p className="text-sm text-[#435066] mt-1">
                    Assigned to {confirmedOrder.companyName}, {confirmedOrder.city}.
                    No real funds were charged.
                  </p>
                </div>
              </div>

              <div className="border-t border-[#0F1F3D]/10 pt-4 space-y-2 text-sm">
                {confirmedOrder.items.map((item) => (
                  <div
                    key={item.fabricId}
                    className="flex justify-between gap-4 text-[#0F1F3D]"
                  >
                    <span className="truncate">
                      {item.name} ({item.meters}m)
                    </span>
                    <span className="tabular-nums font-medium shrink-0">
                      ₹{item.lineTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
                <div className="border-t border-[#0F1F3D]/10 pt-2 flex justify-between font-semibold text-[#0F1F3D]">
                  <span>Total (incl. 5% demo GST)</span>
                  <span className="tabular-nums">
                    ₹{confirmedOrder.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    navigate('buyer-dashboard');
                  }}
                  className="px-4 py-2.5 text-sm font-medium bg-[#1B4D3E] text-white rounded-lg hover:bg-[#143B2F] cursor-pointer"
                >
                  View in Buyer Hub
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    navigate('marketplace');
                  }}
                  className="px-4 py-2.5 text-sm font-medium border border-[#0F1F3D]/20 text-[#0F1F3D] rounded-lg hover:bg-[#F3EDE2] cursor-pointer"
                >
                  Continue Sourcing
                </button>
              </div>
            </div>
          ) : detailedItems.length === 0 ? (
            <div className="text-center py-14 px-4">
              <ShoppingBag
                className="w-10 h-10 text-[#0F1F3D]/30 mx-auto mb-3"
                strokeWidth={1.5}
              />
              <h3 className="font-display text-lg font-semibold text-[#0F1F3D]">
                Your sourcing cart is empty
              </h3>
              <p className="text-sm text-[#435066] mt-1.5 max-w-xs mx-auto">
                Browse Indian mill lots across cotton, silk, linen, and knits to
                build a demo yardage order.
              </p>
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  navigate('marketplace');
                }}
                className="mt-5 px-5 py-2.5 text-sm font-medium bg-[#1B4D3E] text-white rounded-lg hover:bg-[#143B2F] cursor-pointer"
              >
                Browse Marketplace
              </button>
            </div>
          ) : showCheckout ? (
            <form
              id="mock-checkout-form"
              onSubmit={handleCheckoutSubmit}
              className="space-y-4"
            >
              <div className="bg-[#F3EDE2] rounded-lg p-3.5 text-xs text-[#0F1F3D] border border-[#0F1F3D]/10">
                Demo Notice: This prototype checkout records a simulated B2B order
                in browser LocalStorage. No real payment gateway or mill dispatch is
                triggered.
              </div>

              <div>
                <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                  Buyer Contact Name
                </label>
                <input
                  type="text"
                  required
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#0F1F3D]/15 rounded-lg focus:outline-none focus:border-[#1B4D3E]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                  Apparel Brand / Boutique Name
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#0F1F3D]/15 rounded-lg focus:outline-none focus:border-[#1B4D3E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                    Delivery City
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#0F1F3D]/15 rounded-lg focus:outline-none focus:border-[#1B4D3E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                    Demo Settlement Mode
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value as DemoOrder['paymentMethod']
                      )
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#0F1F3D]/15 rounded-lg focus:outline-none focus:border-[#1B4D3E]"
                  >
                    <option value="Demo Proforma Invoice">
                      Demo Proforma Invoice
                    </option>
                    <option value="Mock NEFT Reference">
                      Mock NEFT Reference
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#0F1F3D] mb-1">
                  Warehouse / Studio Delivery Address
                </label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#0F1F3D]/15 rounded-lg focus:outline-none focus:border-[#1B4D3E]"
                />
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              {detailedItems.map(({ fabric, meters, unitPrice, lineTotal }) => (
                <div
                  key={fabric.id}
                  className="bg-white rounded-xl border border-[#0F1F3D]/10 p-4 flex gap-4"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#F3EDE2] shrink-0">
                    <FabricImage
                      src={fabric.imageUrl}
                      alt={fabric.name}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-semibold text-[#0F1F3D] truncate">
                          {fabric.name}
                        </h3>
                        <p className="text-xs text-[#435066] truncate">
                          {fabric.supplierName} · {fabric.cluster}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(fabric.id)}
                        aria-label={`Remove ${fabric.name}`}
                        className="text-[#435066] hover:text-red-700 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="inline-flex items-center border border-[#0F1F3D]/15 rounded-lg bg-[#FAF7F2]">
                        <button
                          type="button"
                          onClick={() =>
                            updateCartMeters(fabric.id, meters - 10)
                          }
                          disabled={meters <= fabric.moqMeters}
                          aria-label="Decrease meters by 10"
                          className="w-8 h-8 flex items-center justify-center text-[#0F1F3D] disabled:opacity-35 cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-medium tabular-nums text-[#0F1F3D]">
                          {meters}m
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateCartMeters(fabric.id, meters + 10)
                          }
                          aria-label="Increase meters by 10"
                          className="w-8 h-8 flex items-center justify-center text-[#0F1F3D] cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-semibold text-[#0F1F3D] tabular-nums">
                          ₹{lineTotal.toLocaleString('en-IN')}
                        </p>
                        <p className="text-[11px] text-[#435066] tabular-nums">
                          ₹{unitPrice}/m · MOQ {fabric.moqMeters}m
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Totals & Action */}
        {!confirmedOrder && detailedItems.length > 0 && (
          <div className="border-t border-[#0F1F3D]/10 bg-white px-6 py-5 space-y-3">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-[#435066]">
                <span>Fabric Subtotal</span>
                <span className="tabular-nums text-[#0F1F3D]">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-[#435066]">
                <span>Estimated Textile GST (5% Demo)</span>
                <span className="tabular-nums text-[#0F1F3D]">
                  ₹{gstAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-[#435066]">
                <span>Cluster Freight (Free over ₹25,000)</span>
                <span className="tabular-nums text-[#0F1F3D]">
                  {shippingFee === 0 ? 'Free' : `₹${shippingFee}`}
                </span>
              </div>
              <div className="pt-2 border-t border-[#0F1F3D]/10 flex justify-between font-semibold text-base text-[#0F1F3D]">
                <span>Estimated Total</span>
                <span className="tabular-nums">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {showCheckout ? (
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowCheckout(false)}
                  className="px-4 py-2.5 text-sm font-medium border border-[#0F1F3D]/20 text-[#0F1F3D] rounded-lg hover:bg-[#F3EDE2] cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="mock-checkout-form"
                  className="flex-1 py-2.5 px-4 text-sm font-medium bg-[#1B4D3E] hover:bg-[#143B2F] text-white rounded-lg transition-colors cursor-pointer"
                >
                  Confirm Demo Order (No Payment)
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowCheckout(true)}
                className="w-full py-3 px-4 text-sm font-medium bg-[#1B4D3E] hover:bg-[#143B2F] text-white rounded-lg transition-colors cursor-pointer"
              >
                Proceed to Mock Checkout
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
