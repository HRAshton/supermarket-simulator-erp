import type { Item } from './item';
import { useEffect, useState } from 'react';
import { FocusProvider } from './hooks/FocusContext';
import { Panel } from './Panel.jsx';
import { calculateCounts } from './helpers/countsCalculator';
import { UnlistedItems } from './UnlistedItems';

export default function App() {
  const [fetchedData, setFetchedData] = useState<Item[] | null>(null);
  const [saveData, setSaveData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const url = 'https://script.google.com/macros/s/AKfycbxPQgfbuUeLjxqZAN6x1xePdOIBzEw0YJzBtQ5Z1IHa40urt1zDr2cw8-RQvQW5BnenHw/exec';
      const response = await fetch(url);
      const data = await response.json();
      setFetchedData(data);
    })();
  }, [setFetchedData]);

  useEffect(() => {
    (async () => {
      const url = 'https://raw.githubusercontent.com/HRAshton/supermarket-simulator-erp/refs/heads/save1/Supermarket%20Simulator/slot_1.es3';
      const response = await fetch(url);
      const saveDataJson = await response.text();
      const fixedJson = saveDataJson.replaceAll(/\b(\d+)\s*:/g, '"$1":');
      const saveData = JSON.parse(fixedJson);
      setSaveData(saveData);
    })();
  }, [setSaveData]);

  if (!fetchedData || !saveData) {
    return <div>Loading...</div>;
  }

  const countsPerId = calculateCounts(saveData);

  return (
    <div className="ss-root">
      <UnlistedItems knownItems={fetchedData}
                     saveData={saveData}
                     countsPerId={countsPerId}/>

      <FocusProvider>
        <div className="ss-grid-3cols ss-even-odd-grid">
          {fetchedData.map((item) => (
            <Panel key={item.item}
                   data={item}
                   initialCount={countsPerId[item.id]}/>
          ))}
        </div>
      </FocusProvider>
    </div>
  );
}
