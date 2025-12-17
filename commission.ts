import { Category } from '../types';

/**
 * Calculate the commission rate based on category and price.
 * 
 * Logic:
 * Electronics: < 200 MAD -> 8%, >= 200 MAD -> 12%
 * Clothing (Men, Women, Kids): < 200 MAD -> 15%, >= 200 MAD -> 20%
 * Furniture: < 200 MAD -> 8%, >= 200 MAD -> 10%
 * Sports: < 200 MAD -> 10%, >= 200 MAD -> 15%
 * Other: Fixed 10%
 */
export const calculateCommissionRate = (category: Category, price: number): number => {
  if (price <= 0) return 0;

  switch (category) {
    case Category.ELECTRONICS:
      return price < 200 ? 8 : 12;
    
    case Category.CLOTHING_MEN:
    case Category.CLOTHING_WOMEN:
    case Category.CLOTHING_KIDS:
      return price < 200 ? 15 : 20;

    case Category.HOME_FURNITURE:
      return price < 200 ? 8 : 10;

    case Category.SPORTS:
      return price < 200 ? 10 : 15;

    default:
      return 10;
  }
};

export const calculateNetProfit = (price: number, commissionRate: number) => {
  const commissionAmount = (price * commissionRate) / 100;
  const netEarnings = price - commissionAmount;
  return {
    commissionAmount,
    netEarnings
  };
};