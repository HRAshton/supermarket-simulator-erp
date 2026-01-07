import { Item } from './item';

export const UnlistedItems = (props: {
  knownItems: Item[],
  countsPerId: { [id: number]: number },
  saveData: any,
}) => {
  const { knownItems, countsPerId, saveData } = props;

  const knownIds = new Set(knownItems.map((item) => Number(item.id)));
  const existingIds = new Set(
    Object.keys(countsPerId)
      .map((idStr) => Number(idStr))
      .filter((id) => countsPerId[id] > 0),
  );
  const unknownIds = existingIds.difference(knownIds);

  if (unknownIds.size <= 0) {
    return null;
  }

  const unlistedItems = saveData?.Price.value.PricingDatas
      ?.filter((item: any) => unknownIds.has(item.ProductID))
      ?.sort((a: any, b: any) => a.Price - b.Price)
    || [];

  return (
    <>
      <h2>
        These items are in your inventory but not listed in the known items
        database:
      </h2>

      <table>
        <thead>
        <tr>
          <th>id</th>
          <th>price</th>
          <th>days</th>
        </tr>
        </thead>
        <tbody>
        {unlistedItems.map((item: any) => (
          <tr key={item.ItemID}>
            <td>{item.ProductID}</td>
            <td>{Math.round(item.Price * 100) / 100}</td>
            <td>{item.LastChangeDate}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  );
};
