import React, { useState } from 'react';
import { AutoComplete } from 'antd';

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

const App: React.FC = () => {
  const [options, setOptions] = useState<{ value: string }[]>([]);

  const getPanelValue = (searchText: string) =>
    !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  return (
    <AutoComplete
      options={options}
      style={{ width: 200 }}
      placeholder="Borderless"
      onSearch={(text) => setOptions(getPanelValue(text))}
      onSelect={globalThis.console.log}
      variant="borderless"
    />
  );
};

export default App;
