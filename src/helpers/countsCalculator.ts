export const calculateCounts = (saveData: any): { [id: number]: number } => {
  const p = saveData.Progression.value;

  // 1) BoxDatas
  const itemsInBoxes = p.BoxDatas
    .map((b: any) => [b.ProductID, b.ProductCount]);

  // 2) RackDatas -> RackSlots -> RackedBoxDatas
  const itemsInRacks = p.RackDatas
    .flatMap((rack: any) => rack.RackSlots)
    .flatMap((slot: any) => slot.RackedBoxDatas)
    .map((box: any) => [box.ProductID, box.ProductCount]);

  // 3) DisplayDatas[] -> DisplaySlots[] -> Products (key: id, value: count)
  const itemsInDisplays = p.DisplayDatas
    .flatMap((display: any) => display.DisplaySlots)
    .flatMap((slot: any) => Object.entries(slot.Products))
    .map(([idStr, count]: [string, any]) => [Number(idStr), count]);

  const aggregatedCounts: { [id: number]: number } = {};
  for (const [id, count] of [...itemsInBoxes, ...itemsInRacks, ...itemsInDisplays]) {
    aggregatedCounts[id] = (aggregatedCounts[id] || 0) + count;
  }

  return aggregatedCounts;
};
