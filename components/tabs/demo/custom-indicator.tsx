import React from 'react';
import { Segmented, Tabs } from 'antd';
import type { TabsProps } from 'antd';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Tab 1',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: 'Tab 2',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Tab 3',
    children: 'Content of Tab Pane 3',
  },
];

const App: React.FC = () => {
  const [align, setAlign] = React.useState<TabsProps['indicatorAlign']>('center');
  return (
    <>
      <Segmented
        defaultValue="center"
        style={{ marginBottom: 8 }}
        onChange={(value) => setAlign(value as TabsProps['indicatorAlign'])}
        options={['start', 'center', 'end']}
      />
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        indicatorSize={(origin) => origin - 20}
        indicatorAlign={align}
      />
    </>
  );
};

export default App;
