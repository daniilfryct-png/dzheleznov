export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  oldPrice?: number;
  currency: string;
  description: string;
  fabric: string;
  construction: string;
  care: string;
  sizes: string[];
  color: string;
  colors: string[];
  images: string[];
  collection: string;
  featured: boolean;
  isNew: boolean;
  inStock: boolean;
  category: string;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  year: number;
  season: string;
  description: string;
  statement: string;
  coverImage: string;
  campaignImages: string[];
  lookbook: string[];
  designNotes: string[];
  behindTheScenes: string[];
  featured: boolean;
}

export interface ArchiveItem {
  id: string;
  title: string;
  category: "collections" | "sketches" | "prototypes" | "experiments" | "runway" | "process";
  year: number;
  image: string;
  description: string;
  aspectRatio: "portrait" | "landscape" | "square";
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export type DeliveryMethod = "sdek" | "pochta" | "pickup";
export type PaymentMethod = "yukassa" | "sbp" | "card";
export type SortOption = "default" | "price-asc" | "price-desc" | "name-asc";

export interface CatalogFilters {
  search?: string;
  category?: string;
  collection?: string;
  size?: string;
  priceMin?: number;
  priceMax?: number;
  sort?: SortOption;
  inStockOnly?: boolean;
}

export interface DeliveryOption {
  id: DeliveryMethod;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

export interface PaymentOption {
  id: PaymentMethod;
  name: string;
  description: string;
}

export interface CheckoutForm {
  name: string;
  phone: string;
  email: string;
  city?: string;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  pickupPoint?: string;
  pickupAddress?: string;
  address?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  form: CheckoutForm;
  total: number;
  createdAt: string;
  status: "pending" | "paid" | "shipped" | "delivered";
}
