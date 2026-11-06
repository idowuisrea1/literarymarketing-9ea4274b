import { describe, expect, it } from "vitest";
import { calcRoi } from "@/lib/roi";
import { suggestPackage } from "@/lib/enquiry";

describe("calcRoi", () => {
  it("break-even copies for $299 at $4.99 × 70%", () => expect(calcRoi({ price: 4.99, royaltyPct: 70, extraCopies: 0, packageCost: 299 }).breakEven).toBe(86));
  it("no break-even when royalty is zero", () => expect(calcRoi({ price: 0, royaltyPct: 70, extraCopies: 10, packageCost: 299 }).breakEven).toBeNull());
  it("net = extra royalties minus cost", () => expect(calcRoi({ price: 10, royaltyPct: 50, extraCopies: 100, packageCost: 299 }).net).toBe(201));
});

describe("suggestPackage", () => {
  it("$600–$1,200 budget → Bestseller", () => expect(suggestPackage({ services: [], budget: "$600 – $1,200" }).name).toBe("The Bestseller Tier"));
  it("$1,200+ → Empire", () => expect(suggestPackage({ services: [], budget: "$1,200+" }).name).toBe("The Publishing Empire Plan"));
  it("small budget + cover only → one-time cover", () => expect(suggestPackage({ services: ["Graphic & Cover Design"], budget: "Under $300" }).name).toBe("Book Cover Design"));
  it("not sure + Full Package → Empire", () => expect(suggestPackage({ services: ["Full Package"], budget: "Not sure yet" }).name).toBe("The Publishing Empire Plan"));
});
