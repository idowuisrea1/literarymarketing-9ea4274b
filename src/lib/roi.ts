export type RoiInput = { price: number; royaltyPct: number; extraCopies: number; packageCost: number };

/** Simple royalty maths. Not a forecast: the visitor supplies every number. */
export function calcRoi({ price, royaltyPct, extraCopies, packageCost }: RoiInput) {
  const perCopy = Math.max(0, price) * (Math.min(100, Math.max(0, royaltyPct)) / 100);
  const extraRoyalties = perCopy * Math.max(0, extraCopies);
  const net = extraRoyalties - Math.max(0, packageCost);
  const breakEven = perCopy > 0 ? Math.ceil(Math.max(0, packageCost) / perCopy) : null;
  return { perCopy, extraRoyalties, net, breakEven };
}
