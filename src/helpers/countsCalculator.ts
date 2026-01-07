export const calculateCounts = (saveData: any): { [id: number]: number } => {
  const totals: { [id: number]: number } = {};

  const add = (id: number, count: number) => {
    totals[id] = (totals[id] ?? 0) + count;
  };

  const p = saveData?.Progression?.value;
  if (!p) return totals;

  // 1) BoxDatas
  if (Array.isArray(p.BoxDatas)) {
    for (const b of p.BoxDatas) {
      if (typeof b?.ProductID === "number" && typeof b?.ProductCount === "number") {
        add(b.ProductID, b.ProductCount);
      }
    }
  }

  // 2) RackDatas -> RackSlots -> RackedBoxDatas
  if (Array.isArray(p.RackDatas)) {
    for (const rack of p.RackDatas) {
      if (!Array.isArray(rack?.RackSlots)) continue;
      for (const slot of rack.RackSlots) {
        if (!Array.isArray(slot?.RackedBoxDatas)) continue;
        for (const box of slot.RackedBoxDatas) {
          if (typeof box?.ProductID === "number" && typeof box?.ProductCount === "number") {
            add(box.ProductID, box.ProductCount);
          }
        }
      }
    }
  }

  // 3) DisplaySlots -> Products
  if (p.displayData && Array.isArray(p.displayData.DisplaySlots)) {
    for (const slot of p.displayData.DisplaySlots) {
      const products = slot?.Products;
      if (!products || typeof products !== "object") continue;
      for (const id in products) {
        add(Number(id), products[id]);
      }
    }
  }

  return totals;
};
