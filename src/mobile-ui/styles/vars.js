const colorPrimary = '#155b4a';

const colorCanvas = '#f5f5f4';
const textColor = '#000';
const colorBg = '#ffffff';
const colorBgAlt = '#d9d9d9';

const widthPageConstrained = '800px';
const spacingVertical = 24;

export default {
  /* Colors */
  colorBrand: '#155b4a',
  colorPrimary,
  colorPrimaryLight: 'saturate(lighten(#155b4a, 50%), 20%)',
  colorLightAlt: 'hsl(hue(#155b4a), 15, 85)',
  colorDarkOverlay: 'rgba(32, 32, 32, 0.9)',
  colorHelp: 'rgba(0, 0, 0, 0.54)',
  colorNotice: '#8a6d3b',
  colorError: '#a94442',
  colorLoadScreenText: '#c3c3c3',
  colorMetaLight: '#505050',
  colorMoney: '#216c2a',
  colorDownload: 'rgba(0, 0, 0, 0.75)',
  colorCanvas,
  colorBg,
  colorBgAlt,
  widthPageConstrained,
  spacingVertical,

  /* Misc */
  contentMaxWidth: '1000px',
  nsfwBlurIntensity: '20px',
  heightVideoEmbedded: `${widthPageConstrained} * 9 / 16`,

  /* Font */
  fontSize: '16px',
  fontLineHeight: '1.3333',
  fontSizeSubtextMultiple: '0.82',

  /* Shadows */
  boxShadowLayer: '0 1px 2.5px rgba(0, 0, 0, 0.18)', // '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
  boxShadowFocus:
    '2px 4px 4px 0 rgba(0, 0, 0, 0.14), 2px 5px 3px -2px rgba(0, 0, 0, 0.2), 2px 3px 7px 0 rgba(0, 0, 0, 0.12)',

  /* Transition */
  transitionDuration: '0.225s',
  transitionType: 'ease',

  /* Text */
  textColor,
  defaultTextColor: '#888888',
  textHelpColor: '#eee',
  textMaxWidth: '660px',
  textLinkPadding: '4px',
  textSelectionBg: 'rgba(saturate(lighten(#155b4a, 20%), 20%), 1)', // temp color
  textSelectionColor: '#fff',

  /* Window */
  windowBg: colorCanvas,

  /* Form */
  formLabelColor: 'rgba(0, 0, 0, 0.54)',

  /* Input */
  inputBg: 'transparent',
  inputWidth: '330px',
  inputColor: textColor,
  inputBorderSize: '2px',
  inputBorderColor: 'rgba(0, 0, 0, 0.54)',

  /* input:active */
  inputActiveBg: 'transparent',

  /* input:disabled */
  inputDisabledBorderColor: 'rgba(0, 0, 0, 0.42)',
  inputDisabledColor: 'rgba(0, 0, 0, 0.54)',

  /* input:hover */
  inputHoverBorderColor: 'rgba(0, 0, 0, 0.87)',
  /* input:placeholder */
  inputPlaceholderColor: 'rgba(0, 0, 0, 0.42)',
  inputPlaceholderOpacity: '1',

  /* Select */
  selectBg: colorBgAlt,
  selectColor: textColor,
  selectHeight: '30px',

  /* Button */
  buttonBg: colorBgAlt,
  buttonColor: '#fff',
  buttonPrimaryBg: colorPrimary,
  buttonPrimaryColor: '#fff',
  buttonPadding: `${spacingVertical * 2 / 3}px`,
  buttonHeight: `${spacingVertical * 1.5}px`,
  buttonIntraMargin: `${spacingVertical}px`,
  buttonRadius: '3px',

  /* Header */
  headerBg: colorBg,
  headerColor: '#666',
  headerActiveColor: 'rgba(0, 0, 0, 0.85)',
  headerHeight: `${spacingVertical * 2.5}px`,
  headerButtonBg: 'transparent', //var('button-bg)',
  headerButtonHoverBg: 'rgba(100, 100, 100, 0.15)',

  /* Header -> search */
  searchBg: 'rgba(255, 255, 255, 0.7)',
  searchBorder: '1px solid #ccc',
  searchColor: '#666',
  // 'searchActiveColor': 'var('header-active-color)',
  // 'searchActiveShadow': '0 0 3px 0px var('text-selection-bg)',

  /* Tabs */
  tabBg: 'transparent',
  tabColor: 'rgba(0, 0, 0, 0.5)',
  tabActiveColor: colorPrimary,
  tabBorderSize: '2px',
  // 'tabBorder': 'var('tab-border-size) solid var('tab-active-color)',

  /* Table */
  tableBorder: '1px solid #e2e2e2',
  tableItemEven: 'white',
  tableItemOdd: '#f4f4f4',

  /* Card */
  cardBg: colorBg,
  cardHoverTranslate: '10px',
  cardMargin: `${spacingVertical * 2 / 3}px`,
  cardMaxWidth: widthPageConstrained,
  cardPadding: `${spacingVertical * 2 / 3}px`,
  cardRadius: '2px',
  cardLinkScaling: '1.1',
  cardSmallWidth: `${spacingVertical * 10}px`,

  /* Modal */
  modalWidth: '440px',
  modalBg: colorBg,
  modalOverlayBg: 'rgba(#f5f5f5, 0.75)', // 'colorCanvas': '#F5F5F5
  modalBorder: '1px solid rgb(204, 204, 204)',

  /* Menu */
  menuBg: colorBg,
  menuRadius: '2px',
  menuItemHoverBg: colorBgAlt,

  /* Tooltip */
  tooltipWidth: '300px',
  tooltipBg: colorBg,
  tooltipColor: textColor,
  tooltipBorder: '1px solid #aaa',

  /* Scrollbar */
  scrollbarRadius: '10px',
  scrollbarThumbBg: 'rgba(0, 0, 0, 0.2)',
  scrollbarThumbHoverBg: 'rgba(0, 0, 0, 0.35)',
  scrollbarThumbActiveBg: colorPrimary,
  scrollbarTrackBg: 'transparent',

  /* Divider */
  divider: '1px solid rgba(0, 0, 0, 0.12)',

  /* Animation :) */
  animationDuration: '0.3s',
  animationStyle: 'cubic-bezier(0.55, 0, 0.1, 1)',
};
