export type AppRoute =
  | 'home'
  | 'marketplace'
  | 'how-it-works'
  | 'for-suppliers'
  | 'login'
  | 'product-detail'
  | 'buyer-dashboard'
  | 'supplier-dashboard'
  | 'admin-dashboard';

export type UserRole = 'guest' | 'buyer' | 'supplier' | 'admin';

export type TextileCluster =
  | 'Surat'
  | 'Ahmedabad'
  | 'Tiruppur'
  | 'Bengaluru'
  | 'Mumbai'
  | 'Hyderabad';

export type FabricType =
  | 'Cotton'
  | 'Silk'
  | 'Linen'
  | 'Knit'
  | 'Denim & Twill'
  | 'Viscose & Blends';

export type FabricColor =
  | 'Ivory'
  | 'Navy'
  | 'Forest'
  | 'Indigo'
  | 'Terracotta'
  | 'Charcoal'
  | 'Oatmeal'
  | 'Sage';

export interface DemoSupplier {
  id: string;
  name: string;
  city: TextileCluster;
  millType: string;
  establishedYear: number;
  monthlyCapacityMeters: number;
  leadTimeDays: string;
  sustainabilityNote: string;
  isDemo: true;
}

export interface BulkPriceTier {
  minMeters: number;
  pricePerMeter: number;
}

export interface FabricListing {
  id: string;
  sku: string;
  name: string;
  type: FabricType;
  color: FabricColor;
  gsm: number;
  widthInches: number;
  composition: string;
  weave: string;
  finish: string;
  careInstructions: string;
  pricePerMeter: number;
  moqMeters: number;
  stockMeters: number;
  leadTimeDays: string;
  cluster: TextileCluster;
  supplierId: string;
  supplierName: string;
  imageUrl: string;
  featured: boolean;
  active: boolean;
  description: string;
  applications: string[];
  bulkTiers: BulkPriceTier[];
}

export type SampleFormat = 'A4 Swatch Card' | '2-Meter Yardage Cut';

export type SampleStatus = 'Pending Review' | 'Approved' | 'Dispatched' | 'Declined';

export interface SampleRequest {
  id: string;
  fabricId: string;
  fabricName: string;
  fabricSku: string;
  supplierName: string;
  cluster: TextileCluster;
  buyerName: string;
  companyName: string;
  buyerCity: string;
  garmentCategory: string;
  sampleFormat: SampleFormat;
  deliveryAddress: string;
  notes: string;
  status: SampleStatus;
  requestedAt: string;
  isDemo: true;
}

export interface CartItem {
  fabricId: string;
  meters: number;
}

export interface DemoOrderItem {
  fabricId: string;
  sku: string;
  name: string;
  supplierName: string;
  meters: number;
  pricePerMeter: number;
  lineTotal: number;
}

export interface DemoOrder {
  id: string;
  buyerName: string;
  companyName: string;
  city: string;
  address: string;
  paymentMethod: 'Demo Proforma Invoice' | 'Mock NEFT Reference';
  items: DemoOrderItem[];
  subtotal: number;
  gstAmount: number;
  shippingFee: number;
  totalAmount: number;
  status: 'Demo Confirmed' | 'Mill Allocation (Demo)';
  createdAt: string;
  isDemo: true;
}

export interface SupplierApplication {
  id: string;
  millName: string;
  contactName: string;
  city: TextileCluster;
  primaryCategories: string;
  monthlyCapacity: string;
  submittedAt: string;
  status: 'Demo Application Logged';
}

export interface ActivityEvent {
  id: string;
  type: 'sample' | 'order' | 'saved' | 'listing';
  title: string;
  detail: string;
  timestamp: string;
}

export interface DemoUserSession {
  role: UserRole;
  name: string;
  company: string;
  city: string;
  email: string;
  supplierId?: string;
}
