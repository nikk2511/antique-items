export interface AntiqueItem {
  id: string;
  name: string;
  price: number;
  category: string;
  era: string;
  description: string;
  history: string; // Detailed history for AI context
  image: string;
  isSold?: boolean;
}

export interface CartItem extends AntiqueItem {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum AppView {
  HOME = 'HOME',
  CATALOG = 'CATALOG',
  APPRAISAL = 'APPRAISAL',
}
