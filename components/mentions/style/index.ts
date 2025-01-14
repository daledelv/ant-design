import type { SharedComponentToken, SharedInputToken } from '../../input/style/token';
import {
  genBasicInputStyle,
  genPlaceholderStyle,
  initComponentToken,
  initInputToken,
} from '../../input/style';
import { resetComponent, textEllipsis } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import { unit } from '@ant-design/cssinjs';
import {
  genBorderlessStyle,
  genDisabledStyle,
  genFilledStyle,
  genOutlinedStyle,
} from '../../input/style/variants';

export interface ComponentToken extends SharedComponentToken {
  /**
   * @desc 弹层 z-index
   * @descEN z-index of popup
   */
  zIndexPopup: number;
  /**
   * @desc 弹层高度
   * @descEN Height of popup
   */
  dropdownHeight: number;
  /**
   * @desc 菜单项高度
   * @descEN Height of menu item
   */
  controlItemWidth: number;
}

type MentionsToken = FullToken<'Mentions'> &
  SharedInputToken & {
    itemPaddingVertical: string | number;
  };

const genMentionsStyle: GenerateStyle<MentionsToken> = (token) => {
  const {
    componentCls,
    colorTextDisabled,
    controlItemBgHover,
    controlPaddingHorizontal,
    colorText,
    motionDurationSlow,
    lineHeight,
    controlHeight,
    paddingInline,
    paddingBlock,
    fontSize,
    colorBgElevated,
    paddingXXS,
    borderRadius,
    borderRadiusLG,
    boxShadowSecondary,
    itemPaddingVertical,
  } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),
      ...genBasicInputStyle(token),

      position: 'relative',
      display: 'inline-block',
      height: 'auto',
      padding: 0,
      overflow: 'hidden',
      lineHeight,
      whiteSpace: 'pre-wrap',
      verticalAlign: 'bottom',

      // Variants
      ...genOutlinedStyle(token),
      ...genFilledStyle(token),
      ...genBorderlessStyle(token),

      '&-affix-wrapper': {
        ...genBasicInputStyle(token),
        padding: 0,

        [`${componentCls}-suffix`]: {
          position: 'absolute',
          top: 0,
          insetInlineEnd: paddingInline,
          bottom: 0,
          zIndex: 1,
          display: 'inline-flex',
          alignItems: 'center',
          margin: 'auto',
        },
      },

      '&-disabled': {
        '> textarea': {
          ...genDisabledStyle(token),
        },
      },

      // ================= Input Area =================
      [`> textarea, ${componentCls}-measure`]: {
        color: colorText,
        boxSizing: 'border-box',
        minHeight: token.calc(controlHeight).sub(2),
        margin: 0,
        padding: `${unit(paddingBlock)} ${unit(paddingInline)}`,
        overflow: 'inherit',
        overflowX: 'hidden',
        overflowY: 'auto',
        fontWeight: 'inherit',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        fontStyle: 'inherit',
        fontVariant: 'inherit',
        fontSizeAdjust: 'inherit',
        fontStretch: 'inherit',
        lineHeight: 'inherit',
        direction: 'inherit',
        letterSpacing: 'inherit',
        whiteSpace: 'inherit',
        textAlign: 'inherit',
        verticalAlign: 'top',
        wordWrap: 'break-word',
        wordBreak: 'inherit',
        tabSize: 'inherit',
      },

      '> textarea': {
        width: '100%',
        border: 'none',
        outline: 'none',
        resize: 'none',
        backgroundColor: 'inherit',
        ...genPlaceholderStyle(token.colorTextPlaceholder),
      },

      [`${componentCls}-measure`]: {
        position: 'absolute',
        top: 0,
        insetInlineEnd: 0,
        bottom: 0,
        insetInlineStart: 0,
        zIndex: -1,
        color: 'transparent',
        pointerEvents: 'none',

        '> span': {
          display: 'inline-block',
          minHeight: '1em',
        },
      },

      // ================== Dropdown ==================
      '&-dropdown': {
        // Ref select dropdown style
        ...resetComponent(token),

        position: 'absolute',
        top: -9999,
        insetInlineStart: -9999,
        zIndex: token.zIndexPopup,
        boxSizing: 'border-box',
        fontSize,
        fontVariant: 'initial',
        padding: paddingXXS,
        backgroundColor: colorBgElevated,
        borderRadius: borderRadiusLG,
        outline: 'none',
        boxShadow: boxShadowSecondary,

        '&-hidden': {
          display: 'none',
        },

        [`${componentCls}-dropdown-menu`]: {
          maxHeight: token.dropdownHeight,
          margin: 0,
          paddingInlineStart: 0, // Override default ul/ol
          overflow: 'auto',
          listStyle: 'none',
          outline: 'none',

          '&-item': {
            ...textEllipsis,
            position: 'relative',
            display: 'block',
            minWidth: token.controlItemWidth,
            padding: `${unit(itemPaddingVertical)} ${unit(controlPaddingHorizontal)}`,
            color: colorText,
            borderRadius,
            fontWeight: 'normal',
            lineHeight,
            cursor: 'pointer',
            transition: `background ${motionDurationSlow} ease`,

            '&:hover': {
              backgroundColor: controlItemBgHover,
            },

            '&-disabled': {
              color: colorTextDisabled,
              cursor: 'not-allowed',

              '&:hover': {
                color: colorTextDisabled,
                backgroundColor: controlItemBgHover,
                cursor: 'not-allowed',
              },
            },

            '&-selected': {
              color: colorText,
              fontWeight: token.fontWeightStrong,
              backgroundColor: controlItemBgHover,
            },

            '&-active': {
              backgroundColor: controlItemBgHover,
            },
          },
        },
      },
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'Mentions'> = (token) => ({
  ...initComponentToken(token),
  dropdownHeight: 250,
  controlItemWidth: 100,
  zIndexPopup: token.zIndexPopupBase + 50,
  itemPaddingVertical: (token.controlHeight - token.fontHeight) / 2,
});

// ============================== Export ==============================
export default genStyleHooks(
  'Mentions',
  (token) => {
    const mentionsToken = mergeToken<MentionsToken>(token, initInputToken(token));
    return [genMentionsStyle(mentionsToken)];
  },
  prepareComponentToken,
);
