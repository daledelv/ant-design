import React, { useState } from 'react';
import { ColorPicker, Space } from 'antd';
import type { ColorPickerProps } from 'antd/es/color-picker';

const HexCase: React.FC = () => {
  const [colorHex, setColorHex] = useState<ColorPickerProps['value']>('#1677ff');
  const [formatHex, setFormatHex] = useState<ColorPickerProps['format']>('hex');

  const hexString = React.useMemo(
    () => (typeof colorHex === 'string' ? colorHex : colorHex?.toHexString()),
    [colorHex],
  );

  return (
    <Space>
      <ColorPicker
        format={formatHex}
        value={colorHex}
        onChange={setColorHex}
        onFormatChange={setFormatHex}
      />
      <span>HEX: {hexString}</span>
    </Space>
  );
};

const HsbCase: React.FC = () => {
  const [colorHsb, setColorHsb] = useState<ColorPickerProps['value']>('hsb(215, 91%, 100%)');
  const [formatHsb, setFormatHsb] = useState<ColorPickerProps['format']>('hsb');

  const hsbString = React.useMemo(
    () => (typeof colorHsb === 'string' ? colorHsb : colorHsb?.toHsbString()),
    [colorHsb],
  );

  return (
    <Space>
      <ColorPicker
        format={formatHsb}
        value={colorHsb}
        onChange={setColorHsb}
        onFormatChange={setFormatHsb}
      />
      <span>HSB: {hsbString}</span>
    </Space>
  );
};

const RgbCase: React.FC = () => {
  const [colorRgb, setColorRgb] = useState<ColorPickerProps['value']>('rgb(22, 119, 255)');
  const [formatRgb, setFormatRgb] = useState<ColorPickerProps['format']>('rgb');

  const rgbString = React.useMemo(
    () => (typeof colorRgb === 'string' ? colorRgb : colorRgb?.toRgbString()),
    [colorRgb],
  );

  return (
    <Space>
      <ColorPicker
        format={formatRgb}
        value={colorRgb}
        onChange={setColorRgb}
        onFormatChange={setFormatRgb}
      />
      <span>RGB: {rgbString}</span>
    </Space>
  );
};

const Demo: React.FC = () => (
  <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
    <HexCase />
    <HsbCase />
    <RgbCase />
  </Space>
);

export default Demo;
