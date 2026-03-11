export interface Product {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  price: number;
  color: string;
  whatsappMessage: string;
  category: string;
}

export const products: Product[] = [
  {
    id: "turmeric",
    name: "Turmeric Powder",
    description: "Pure organic turmeric, hand-ground from the finest roots. Known as the golden spice of Ayurveda.",
    benefits: ["Anti-inflammatory", "Boosts immunity", "Improves skin health", "Supports digestion"],
    price: 299,
    color: "#D4A017",
    whatsappMessage: "Hello, I would like to order Turmeric Powder. Please share details.",
    category: "Immunity",
  },
  {
    id: "moringa",
    name: "Moringa Powder",
    description: "Nutrient-dense moringa leaf powder, rich in vitamins and minerals. The miracle tree of wellness.",
    benefits: ["Rich in antioxidants", "Boosts energy", "Supports bone health", "Lowers blood sugar"],
    price: 349,
    color: "#4A7C59",
    whatsappMessage: "Hello, I would like to order Moringa Powder. Please share details.",
    category: "Energy",
  },
  {
    id: "ashwagandha",
    name: "Ashwagandha Powder",
    description: "Premium ashwagandha root powder for stress relief and vitality. Ancient adaptogen for modern life.",
    benefits: ["Reduces stress", "Improves sleep", "Boosts stamina", "Enhances focus"],
    price: 399,
    color: "#8B6914",
    whatsappMessage: "Hello, I would like to order Ashwagandha Powder. Please share details.",
    category: "Stress Relief",
  },
  {
    id: "neem",
    name: "Neem Powder",
    description: "Pure neem leaf powder for skin purification and detox. Nature's most powerful purifier.",
    benefits: ["Purifies blood", "Clears skin", "Antibacterial", "Supports liver health"],
    price: 249,
    color: "#2D5A27",
    whatsappMessage: "Hello, I would like to order Neem Powder. Please share details.",
    category: "Skin Care",
  },
  {
    id: "amla",
    name: "Amla Powder",
    description: "Vitamin C-rich amla powder for hair and immunity. The Indian gooseberry treasure.",
    benefits: ["Strengthens hair", "Boosts immunity", "Rich in Vitamin C", "Improves digestion"],
    price: 279,
    color: "#6B8E23",
    whatsappMessage: "Hello, I would like to order Amla Powder. Please share details.",
    category: "Hair Care",
  },
  {
    id: "hibiscus",
    name: "Hibiscus Powder",
    description: "Vibrant hibiscus flower powder for hair growth and skin radiance. The flower of beauty.",
    benefits: ["Promotes hair growth", "Anti-aging", "Lowers blood pressure", "Rich in antioxidants"],
    price: 329,
    color: "#C41E3A",
    whatsappMessage: "Hello, I would like to order Hibiscus Powder. Please share details.",
    category: "Hair Care",
  },
];

export const WHATSAPP_NUMBER = "919876543210";

export const getWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
