import type { Item } from './item';
import { useState } from 'react';
import { useEnterToNext } from './hooks/useEnterToNext';

type Props = {
  data: Item;
  initialCount?: number;
};

export const Panel = (props: Props) => {
  const { data } = props;

  const [count, setCount] = useState(props.initialCount || 0);
  const focus = useEnterToNext<HTMLInputElement>();

  const boxesToBuy = data['max total, boxes'] - Math.ceil(count / data['ro, items/box']);

  return (
    <div className="ss-panel">
      <h3>{data['item']}</h3>
      <input className="ss-input" type="number" value={count} tabIndex={1}
             onChange={(e) => setCount(Number(e.target.value))}
             onFocus={(e) => e.target.select()}
             {...focus}
      />
      <label>
        To buy: {boxesToBuy}
      </label>
    </div>
  );
};
