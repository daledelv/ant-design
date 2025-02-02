import type { SharedComponentToken, SharedInputToken } from '../../input/style/token';
import { initComponentToken } from '../../input/style/token';
import type { FullToken, GetDefaultToken, FormatComponentToken } from '../../theme/internal';
import { TinyColor } from '@ctrl/tinycolor';

export interface ComponentToken extends SharedComponentToken {
  /**
   * @desc 输入框宽度
   * @descEN Width of input
   */
  controlWidth: number;
  /**
   * @desc 操作按钮宽度
   * @descEN Width of control button
   */
  handleWidth: number;
  /**
   * @desc 操作按钮图标大小
   * @descEN Icon size of control button
   */
  handleFontSize: number;
  /**
   * Default `auto`. Set `true` will always show the handle
   * @desc 操作按钮可见性
   * @descEN Handle visible
   */
  handleVisible: 'auto' | true;
  /**
   * @desc 操作按钮背景色
   * @descEN Background color of handle
   */
  handleBg: string;
  /**
   * @desc 操作按钮激活背景色
   * @descEN Active background color of handle
   */
  handleActiveBg: string;
  /**
   * @desc 操作按钮悬浮颜色
   * @descEN Hover color of handle
   */
  handleHoverColor: string;
  /**
   * @desc 操作按钮边框颜色
   * @descEN Border color of handle
   */
  handleBorderColor: string;
  /**
   * @desc 面性变体操作按钮背景色
   * @descEN Background color of handle in filled variant
   */
  filledHandleBg: string;
  /**
   * @internal
   */
  handleOpacity: number;
}

export type InputNumberToken = FullToken<'InputNumber'> & SharedInputToken;

export const prepareComponentToken: GetDefaultToken<'InputNumber'> = (token) => ({
  ...initComponentToken(token),
  controlWidth: 90,
  handleWidth: token.controlHeightSM - token.lineWidth * 2,
  handleFontSize: token.fontSize / 2,
  handleVisible: 'auto',
  handleActiveBg: token.colorFillAlter,
  handleBg: token.colorBgContainer,
  filledHandleBg: new TinyColor(token.colorFillSecondary)
    .onBackground(token.colorBgContainer)
    .toHexString(),
  handleHoverColor: token.colorPrimary,
  handleBorderColor: token.colorBorder,
  handleOpacity: 0,
});

export const formatComponentToken: FormatComponentToken<'InputNumber'> = (token) => ({
  ...token,
  handleOpacity: token.handleVisible === true ? 1 : 0,
});
