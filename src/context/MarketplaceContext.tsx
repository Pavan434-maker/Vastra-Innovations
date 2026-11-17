import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  DEMO_ADMIN_PROFILE,
  DEMO_BUYER_PROFILE,
  DEMO_SUPPLIER_PROFILE,
  DEMO_SUPPLIERS,
  INITIAL_ACTIVITIES,
  INITIAL_FABRICS,
  INITIAL_ORDERS,
  INITIAL_SAMPLE_REQUESTS,
} from '../data/demoData';
import {
  ActivityEvent,
  AppRoute,
  CartItem,
  DemoOrder,
  DemoSupplier,
  DemoUserSession,
  FabricListing,
  SampleRequest,
  SampleStatus,
  SupplierApplication,
  UserRole,
} from '../types/marketplace';

const STORAGE_KEY = 'vastra_innovations_prototype_v1';

interface PersistedState {
  fabrics: FabricListing[];
  sampleRequests: SampleRequest[];
  orders: DemoOrder[];
  cart: CartItem[];
  savedFabricIds: string[];
  activities: ActivityEvent[];
  supplierApplications: SupplierApplication[];
  user: DemoUserSession;
}

const DEFAULT_PERSISTED_STATE: PersistedState = {
  fabrics: INITIAL_FABRICS,
  sampleRequests: INITIAL_SAMPLE_REQUESTS,
  orders: INITIAL_ORDERS,
  cart: [{ fabricId: 'fab-01', meters: 50 }],
  savedFabricIds: ['fab-02', 'fab-05', 'fab-09'],
  activities: INITIAL_ACTIVITIES,
  supplierApplications: [],
  user: {
    role: 'guest',
    name: 'Guest Visitor',
    company: 'Prototype Session',
    city: 'Bengaluru',
    email: '',
  },
};

function loadInitialState(): PersistedState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PERSISTED_STATE;
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    return {
      fabrics: parsed.fabrics?.length ? parsed.fabrics : DEFAULT_PERSISTED_STATE.fabrics,
      sampleRequests: parsed.sampleRequests ?? DEFAULT_PERSISTED_STATE.sampleRequests,
      orders: parsed.orders ?? DEFAULT_PERSISTED_STATE.orders,
      cart: parsed.cart ?? DEFAULT_PERSISTED_STATE.cart,
      savedFabricIds: parsed.savedFabricIds ?? DEFAULT_PERSISTED_STATE.savedFabricIds,
      activities: parsed.activities ?? DEFAULT_PERSISTED_STATE.activities,
      supplierApplications: parsed.supplierApplications ?? [],
      user: parsed.user ?? DEFAULT_PERSISTED_STATE.user,
    };
  } catch {
    return DEFAULT_PERSISTED_STATE;
  }
}

interface NewSamplePayload {
  fabricId: string;
  buyerName: string;
  companyName: string;
  buyerCity: string;
  garmentCategory: string;
  sampleFormat: SampleRequest['sampleFormat'];
  deliveryAddress: string;
  notes: string;
}

interface NewOrderPayload {
  buyerName: string;
  companyName: string;
  city: string;
  address: string;
  paymentMethod: DemoOrder['paymentMethod'];
}

interface NewFabricPayload {
  name: string;
  type: FabricListing['type'];
  color: FabricListing['color'];
  gsm: number;
  widthInches: number;
  composition: string;
  weave: string;
  finish: string;
  pricePerMeter: number;
  moqMeters: number;
  stockMeters: number;
  description: string;
}

interface MarketplaceContextValue {
  route: AppRoute;
  selectedFabricId: string;
  searchQueryPrefill: string;
  navigate: (route: AppRoute, options?: { fabricId?: string; search?: string }) => void;
  user: DemoUserSession;
  switchRole: (role: UserRole, customName?: string, customCompany?: string) => void;
  fabrics: FabricListing[];
  suppliers: DemoSupplier[];
  sampleRequests: SampleRequest[];
  orders: DemoOrder[];
  cart: CartItem[];
  savedFabricIds: string[];
  activities: ActivityEvent[];
  supplierApplications: SupplierApplication[];
  cartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;
  toastMessage: string | null;
  dismissToast: () => void;
  addToCart: (fabricId: string, meters: number) => void;
  updateCartMeters: (fabricId: string, meters: number) => void;
  removeFromCart: (fabricId: string) => void;
  clearCart: () => void;
  toggleSavedFabric: (fabricId: string) => void;
  submitSampleRequest: (payload: NewSamplePayload) => SampleRequest | null;
  updateSampleStatus: (sampleId: string, status: SampleStatus) => void;
  placeDemoOrder: (payload: NewOrderPayload) => DemoOrder | null;
  addSupplierFabric: (payload: NewFabricPayload) => FabricListing;
  toggleFabricActive: (fabricId: string) => void;
  toggleFabricFeatured: (fabricId: string) => void;
  submitSupplierApplication: (app: Omit<SupplierApplication, 'id' | 'submittedAt' | 'status'>) => SupplierApplication;
  resetDemoState: () => void;
}

const MarketplaceContext = createContext<MarketplaceContextValue | null>(null);

export function MarketplaceProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PersistedState>(() => loadInitialState());
  const [route, setRoute] = useState<AppRoute>('home');
  const [selectedFabricId, setSelectedFabricId] = useState<string>('fab-01');
  const [searchQueryPrefill, setSearchQueryPrefill] = useState<string>('');
  const [cartDrawerOpen, setCartDrawerOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors in restricted sandboxes
    }
  }, [state]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 3800);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const showToast = (msg: string) => setToastMessage(msg);

  const navigate = (
    nextRoute: AppRoute,
    options?: { fabricId?: string; search?: string }
  ) => {
    if (options?.fabricId) {
      setSelectedFabricId(options.fabricId);
    }
    if (options?.search !== undefined) {
      setSearchQueryPrefill(options.search);
    } else if (nextRoute !== 'marketplace') {
      setSearchQueryPrefill('');
    }
    setRoute(nextRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchRole = (role: UserRole, customName?: string, customCompany?: string) => {
    let nextUser: DemoUserSession;
    if (role === 'buyer') {
      nextUser = {
        ...DEMO_BUYER_PROFILE,
        name: customName?.trim() || DEMO_BUYER_PROFILE.name,
        company: customCompany?.trim() || DEMO_BUYER_PROFILE.company,
      };
    } else if (role === 'supplier') {
      nextUser = {
        ...DEMO_SUPPLIER_PROFILE,
        name: customName?.trim() || DEMO_SUPPLIER_PROFILE.name,
        company: customCompany?.trim() || DEMO_SUPPLIER_PROFILE.company,
      };
    } else if (role === 'admin') {
      nextUser = {
        ...DEMO_ADMIN_PROFILE,
        name: customName?.trim() || DEMO_ADMIN_PROFILE.name,
      };
    } else {
      nextUser = {
        role: 'guest',
        name: 'Guest Visitor',
        company: 'Browsing Mode',
        city: 'India',
        email: '',
      };
    }
    setState((prev) => ({ ...prev, user: nextUser }));
    showToast(`Signed in as ${nextUser.company}`);
  };

  const addToCart = (fabricId: string, meters: number) => {
    const fabric = state.fabrics.find((f) => f.id === fabricId);
    if (!fabric) return;
    const safeMeters = Math.max(fabric.moqMeters, meters);
    setState((prev) => {
      const existing = prev.cart.find((item) => item.fabricId === fabricId);
      const updatedCart = existing
        ? prev.cart.map((item) =>
            item.fabricId === fabricId
              ? { ...item, meters: item.meters + safeMeters }
              : item
          )
        : [...prev.cart, { fabricId, meters: safeMeters }];
      return { ...prev, cart: updatedCart };
    });
    showToast(`Added ${safeMeters}m of ${fabric.name} to cart`);
    setCartDrawerOpen(true);
  };

  const updateCartMeters = (fabricId: string, meters: number) => {
    const fabric = state.fabrics.find((f) => f.id === fabricId);
    const min = fabric?.moqMeters ?? 10;
    const safeMeters = Math.max(min, meters);
    setState((prev) => ({
      ...prev,
      cart: prev.cart.map((item) =>
        item.fabricId === fabricId ? { ...item, meters: safeMeters } : item
      ),
    }));
  };

  const removeFromCart = (fabricId: string) => {
    setState((prev) => ({
      ...prev,
      cart: prev.cart.filter((item) => item.fabricId !== fabricId),
    }));
  };

  const clearCart = () => {
    setState((prev) => ({ ...prev, cart: [] }));
  };

  const toggleSavedFabric = (fabricId: string) => {
    const fabric = state.fabrics.find((f) => f.id === fabricId);
    setState((prev) => {
      const exists = prev.savedFabricIds.includes(fabricId);
      const nextSaved = exists
        ? prev.savedFabricIds.filter((id) => id !== fabricId)
        : [fabricId, ...prev.savedFabricIds];

      const nextActivities =
        !exists && fabric
          ? [
              {
                id: `act-${Date.now()}`,
                type: 'saved' as const,
                title: `Saved ${fabric.name} to swatch shortlist`,
                detail: `${fabric.supplierName} · ${fabric.cluster}`,
                timestamp: 'Just now',
              },
              ...prev.activities,
            ]
          : prev.activities;

      return { ...prev, savedFabricIds: nextSaved, activities: nextActivities };
    });
  };

  const submitSampleRequest = (payload: NewSamplePayload): SampleRequest | null => {
    const fabric = state.fabrics.find((f) => f.id === payload.fabricId);
    if (!fabric) return null;
    const newReq: SampleRequest = {
      id: `SMP-2026-${Math.floor(100 + Math.random() * 899)}`,
      fabricId: fabric.id,
      fabricName: fabric.name,
      fabricSku: fabric.sku,
      supplierName: fabric.supplierName,
      cluster: fabric.cluster,
      buyerName: payload.buyerName,
      companyName: payload.companyName,
      buyerCity: payload.buyerCity,
      garmentCategory: payload.garmentCategory,
      sampleFormat: payload.sampleFormat,
      deliveryAddress: payload.deliveryAddress,
      notes: payload.notes,
      status: 'Pending Review',
      requestedAt: new Date().toISOString().slice(0, 10),
      isDemo: true,
    };

    const newActivity: ActivityEvent = {
      id: `act-${Date.now()}`,
      type: 'sample',
      title: `Sample requested: ${fabric.name}`,
      detail: `${fabric.supplierName} · ${payload.sampleFormat}`,
      timestamp: 'Just now',
    };

    setState((prev) => ({
      ...prev,
      sampleRequests: [newReq, ...prev.sampleRequests],
      activities: [newActivity, ...prev.activities],
    }));

    showToast(`Sample request ${newReq.id} submitted`);
    return newReq;
  };

  const updateSampleStatus = (sampleId: string, status: SampleStatus) => {
    setState((prev) => ({
      ...prev,
      sampleRequests: prev.sampleRequests.map((s) =>
        s.id === sampleId ? { ...s, status } : s
      ),
    }));
    showToast(`Sample ${sampleId} marked as ${status}`);
  };

  const placeDemoOrder = (payload: NewOrderPayload): DemoOrder | null => {
    if (state.cart.length === 0) return null;
    const orderItems = state.cart
      .map((cartItem) => {
        const fabric = state.fabrics.find((f) => f.id === cartItem.fabricId);
        if (!fabric) return null;
        // Apply bulk tier pricing if applicable
        const sortedTiers = [...fabric.bulkTiers].sort(
          (a, b) => b.minMeters - a.minMeters
        );
        const matchedTier = sortedTiers.find(
          (t) => cartItem.meters >= t.minMeters
        );
        const unitPrice = matchedTier
          ? matchedTier.pricePerMeter
          : fabric.pricePerMeter;
        return {
          fabricId: fabric.id,
          sku: fabric.sku,
          name: fabric.name,
          supplierName: fabric.supplierName,
          meters: cartItem.meters,
          pricePerMeter: unitPrice,
          lineTotal: unitPrice * cartItem.meters,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);

    if (orderItems.length === 0) return null;

    const subtotal = orderItems.reduce((sum, item) => sum + item.lineTotal, 0);
    const gstAmount = Math.round(subtotal * 0.05);
    const shippingFee = subtotal >= 25000 ? 0 : 850;
    const totalAmount = subtotal + gstAmount + shippingFee;

    const newOrder: DemoOrder = {
      id: `VI-ORD-2026-${Math.floor(1050 + Math.random() * 8900)}`,
      buyerName: payload.buyerName,
      companyName: payload.companyName,
      city: payload.city,
      address: payload.address,
      paymentMethod: payload.paymentMethod,
      items: orderItems,
      subtotal,
      gstAmount,
      shippingFee,
      totalAmount,
      status: 'Demo Confirmed',
      createdAt: new Date().toISOString().slice(0, 10),
      isDemo: true,
    };

    const newActivity: ActivityEvent = {
      id: `act-${Date.now()}`,
      type: 'order',
      title: `Demo order ${newOrder.id} confirmed`,
      detail: `${orderItems.length} fabric lot(s) · ₹${totalAmount.toLocaleString('en-IN')} (Demo)`,
      timestamp: 'Just now',
    };

    setState((prev) => ({
      ...prev,
      orders: [newOrder, ...prev.orders],
      cart: [],
      activities: [newActivity, ...prev.activities],
    }));

    showToast(`Demo order ${newOrder.id} placed`);
    return newOrder;
  };

  const addSupplierFabric = (payload: NewFabricPayload): FabricListing => {
    const supplier =
      DEMO_SUPPLIERS.find((s) => s.id === state.user.supplierId) ??
      DEMO_SUPPLIERS[0];

    const fallbackImageByType: Record<FabricListing['type'], string> = {
      Cotton: '/src/assets/images/fabric_cotton_poplin_1794922118080.jpg',
      Silk: '/src/assets/images/fabric_chanderi_weave_1794922121364.jpg',
      Linen: '/src/assets/images/fabric_handloom_linen_1794922120123.jpg',
      Knit: '/src/assets/images/fabric_forest_jersey_1794922120014.jpg',
      'Denim & Twill': '/src/assets/images/fabric_brushed_twill_1794922121574.jpg',
      'Viscose & Blends': '/src/assets/images/fabric_viscose_georgette_1794922120510.jpg',
    };

    const newListing: FabricListing = {
      id: `fab-${Date.now()}`,
      sku: `VI-${supplier.city.slice(0, 3).toUpperCase()}-${Math.floor(700 + Math.random() * 299)}`,
      name: payload.name,
      type: payload.type,
      color: payload.color,
      gsm: payload.gsm,
      widthInches: payload.widthInches,
      composition: payload.composition,
      weave: payload.weave,
      finish: 'Mill Standard Finish (Demo)',
      careInstructions: 'Standard garment care per fibre test report',
      pricePerMeter: payload.pricePerMeter,
      moqMeters: payload.moqMeters,
      stockMeters: payload.stockMeters,
      leadTimeDays: supplier.leadTimeDays,
      cluster: supplier.city,
      supplierId: supplier.id,
      supplierName: supplier.name,
      imageUrl: fallbackImageByType[payload.type],
      featured: false,
      active: true,
      description: payload.description,
      applications: ['Apparel Production', 'Boutique Capsule'],
      bulkTiers: [
        { minMeters: payload.moqMeters, pricePerMeter: payload.pricePerMeter },
        {
          minMeters: payload.moqMeters * 3,
          pricePerMeter: Math.round(payload.pricePerMeter * 0.92),
        },
        {
          minMeters: payload.moqMeters * 8,
          pricePerMeter: Math.round(payload.pricePerMeter * 0.85),
        },
      ],
    };

    const newActivity: ActivityEvent = {
      id: `act-${Date.now()}`,
      type: 'listing',
      title: `New fabric published: ${newListing.name}`,
      detail: `${supplier.name} · ₹${newListing.pricePerMeter}/m`,
      timestamp: 'Just now',
    };

    setState((prev) => ({
      ...prev,
      fabrics: [newListing, ...prev.fabrics],
      activities: [newActivity, ...prev.activities],
    }));

    showToast(`Published "${newListing.name}" to marketplace`);
    return newListing;
  };

  const toggleFabricActive = (fabricId: string) => {
    setState((prev) => ({
      ...prev,
      fabrics: prev.fabrics.map((f) =>
        f.id === fabricId ? { ...f, active: !f.active } : f
      ),
    }));
  };

  const toggleFabricFeatured = (fabricId: string) => {
    setState((prev) => ({
      ...prev,
      fabrics: prev.fabrics.map((f) =>
        f.id === fabricId ? { ...f, featured: !f.featured } : f
      ),
    }));
  };

  const submitSupplierApplication = (
    app: Omit<SupplierApplication, 'id' | 'submittedAt' | 'status'>
  ): SupplierApplication => {
    const created: SupplierApplication = {
      ...app,
      id: `SUP-APP-${Math.floor(100 + Math.random() * 899)}`,
      submittedAt: new Date().toISOString().slice(0, 10),
      status: 'Demo Application Logged',
    };
    setState((prev) => ({
      ...prev,
      supplierApplications: [created, ...prev.supplierApplications],
    }));
    showToast(`Demo supplier application ${created.id} logged`);
    return created;
  };

  const resetDemoState = () => {
    setState(DEFAULT_PERSISTED_STATE);
    window.localStorage.removeItem(STORAGE_KEY);
    showToast('Prototype demo data reset to initial defaults');
  };

  return (
    <MarketplaceContext.Provider
      value={{
        route,
        selectedFabricId,
        searchQueryPrefill,
        navigate,
        user: state.user,
        switchRole,
        fabrics: state.fabrics,
        suppliers: DEMO_SUPPLIERS,
        sampleRequests: state.sampleRequests,
        orders: state.orders,
        cart: state.cart,
        savedFabricIds: state.savedFabricIds,
        activities: state.activities,
        supplierApplications: state.supplierApplications,
        cartDrawerOpen,
        setCartDrawerOpen,
        toastMessage,
        dismissToast: () => setToastMessage(null),
        addToCart,
        updateCartMeters,
        removeFromCart,
        clearCart,
        toggleSavedFabric,
        submitSampleRequest,
        updateSampleStatus,
        placeDemoOrder,
        addSupplierFabric,
        toggleFabricActive,
        toggleFabricFeatured,
        submitSupplierApplication,
        resetDemoState,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const ctx = useContext(MarketplaceContext);
  if (!ctx) {
    throw new Error('useMarketplace must be used inside MarketplaceProvider');
  }
  return ctx;
}
