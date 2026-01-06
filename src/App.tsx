import type { Item } from './item';
import { useEffect, useState } from 'react';
import { FocusProvider } from './hooks/FocusContext';
import { Panel } from './Panel.jsx';

export default function App() {
  const [fetchedData, setFetchedData] = useState<Item[] | null>(null);

  useEffect(() => {
    (async () => {
      const url = 'https://script.google.com/macros/s/AKfycbxPQgfbuUeLjxqZAN6x1xePdOIBzEw0YJzBtQ5Z1IHa40urt1zDr2cw8-RQvQW5BnenHw/exec';
      const response = await fetch(url);
      const data = await response.json();
      setFetchedData(data);
    })();
  }, []);

  if (!fetchedData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ss-root">
      <FocusProvider>
        <div className="ss-grid-3cols ss-even-odd-grid">
          {fetchedData.map((item) => (
            <Panel key={item.item} data={item}/>
          ))}
        </div>
      </FocusProvider>
    </div>
  );
}
