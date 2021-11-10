import { rgbaToArgbHex, RGB } from "@ctrl/tinycolor";
import { css } from "lit";

export const darkStyles = {
  "primary-background-color": "#f0f0f0", //background color
  "primary-color": "#f01616",
  "card-background-color": "rgba(37, 37, 39, 0.7)", //adiconado isto
  //"card-background-color": "rgba(255, 255, 255, 0.7)",
  "ha-card-border-radius": "10px",
  "ha-card-box-shadow": "1px 1px 5px 0px rgb(230, 230, 230)",
  "paper-dialog-background-color": "var(--card-background-color)",
  "paper-listbox-background-color": "var(--card-background-color)",
  "paper-card-background-color": "var(--card-background-color)",
  "secondary-background-color": "#202020",
  "primary-text-color": "#828386",
  "secondary-text-color": "#9b9b9b",
  "disabled-text-color": "#6f6f6f",
  "app-header-text-color": "#5f6368",//"#e1e1e1",
  "app-header-background-color": "#f8f8f8", //"#828386",
  "switch-checked-button-color": "#f01616",
  "switch-checked-track-color": "#f01616",
  "switch-unchecked-button-color": "#999999",
  "switch-unchecked-track-color": "#9b9b9b",
  "paper-toggle-button-checked-button-color": "var(--switch-checked-button-color)",
  "paper-toggle-button-checked-bar-color": "var(--switch-checked-track-color)",
  "paper-toggle-button-unchecked-button-color": "var(--switch-unchecked-button-color)",
  "paper-toggle-button-unchecked-bar-color": "var(--switch-unchecked-track-color)",
  "divider-color": "rgba(225, 225, 225, .12)",
  "mdc-ripple-color": "#AAAAAA",
  "codemirror-keyword": "#C792EA",
  "codemirror-operator": "#89DDFF",
  "codemirror-variable": "#f07178",
  "codemirror-variable-2": "#EEFFFF",
  "codemirror-variable-3": "#DECB6B",
  "codemirror-builtin": "#FFCB6B",
  "codemirror-atom": "#F78C6C",
  "codemirror-number": "#FF5370",
  "codemirror-def": "#82AAFF",
  "codemirror-string": "#C3E88D",
  "codemirror-string-2": "#f07178",
  "codemirror-comment": "#545454",
  "codemirror-tag": "#FF5370",
  "codemirror-meta": "#FFCB6B",
  "codemirror-attribute": "#C792EA",
  "codemirror-property": "#C792EA",
  "codemirror-qualifier": "#DECB6B",
  "codemirror-type": "#DECB6B",
  "energy-grid-return-color": "#b39bdb",
};

export const derivedStyles = {
  "state-icon-error-color": "var(--error-state-color, var(--error-color))",
  "state-unavailable-color": "var(--state-icon-unavailable-color, var(--disabled-text-color))",
  "sidebar-text-color": "var(--sidebar-icon-color)",
  "sidebar-background-color": "#ffffff",
  "sidebar-selected-background-color": "var(--primary-background-color)",
  "sidebar-selected-text-color": "var(--sidebar-selected-icon-color)",
  "sidebar-selected-icon-color": "#f01616",
  "sidebar-icon-color": "#5f6368",
  "switch-checked-color": "var(--primary-color)",
  "switch-checked-button-color": "var(--switch-checked-color, var(--primary-background-color))",
  "switch-checked-track-color": "var(--switch-checked-color, #000000)",
  "switch-unchecked-button-color": "var(--switch-unchecked-color, var(--primary-background-color))",
  "switch-unchecked-track-color": "var(--switch-unchecked-color, #000000)",
  "slider-color": "var(--primary-color)",
  "slider-secondary-color": "var(--light-primary-color)",
  "slider-track-color": "var(--scrollbar-thumb-color)",
  "label-badge-background-color": "#f8faf9",
  "label-badge-text-color": "#4d5575",
  // "paper-listbox-background-color": "var(--card-background-color)",
  "paper-item-icon-color": "#ffffff",//cor dos icons das cards
  "paper-item-icon-active-color": "#f01616",
  "table-row-background-color": "var(--card-background-color)",
  "table-row-alternative-background-color": "var(--primary-background-color)",
  "paper-slider-knob-color": "#f01616",
  "paper-slider-knob-start-color": "var(--paper-slider-knob-color)",
  "paper-slider-pin-color": "var(--paper-slider-knob-color)",
  "paper-slider-pin-start-color": "var(--slider-color)",
  "paper-slider-active-color": "var(--paper-slider-knob-color)",
  "paper-slider-secondary-color": "var(--light-primary-color)",
  "paper-slider-container-color": "var(--slider-track-color)",
  "data-table-background-color": "var(--primary-background-color)",
  "markdown-code-background-color": "#f2f2f2",
  "mdc-theme-primary": "var(--primary-color)",
  "mdc-theme-secondary": "#f01616", //cor do botão de add card
  "mdc-theme-background": "var(--primary-background-color)",
  "mdc-theme-surface": "var(--paper-card-background-color)",
  "mdc-theme-on-primary": "var(--text-primary-color)",
  "mdc-theme-on-secondary": "var(--text-primary-color)",
  "mdc-theme-on-surface": "var(--primary-text-color)",
  "mdc-theme-text-disabled-on-light": "var(--disabled-text-color)",
  "mdc-theme-text-primary-on-background": "var(--primary-text-color)",
  "mdc-theme-text-secondary-on-background": "var(--secondary-text-color)",
  "mdc-theme-text-icon-on-background": "var(--secondary-text-color)",
  "app-header-text-color": "#e1e1e1", //upper header text color "app-header-text-color": "var(--text-primary-color)",
  "app-header-background-color": "#828386", //upper header background color "app-header-background-color": "var(--primary-color)",
  "mdc-checkbox-unchecked-color": "rgba(var(--rgb-primary-text-color), 0.54)",
  "mdc-checkbox-disabled-color": "var(--disabled-text-color)",
  "mdc-radio-unchecked-color": "rgba(var(--rgb-primary-text-color), 0.54)",
  "mdc-radio-disabled-color": "var(--disabled-text-color)",
  "mdc-tab-text-label-color-default": "var(--primary-text-color)",
  "mdc-button-disabled-ink-color": "var(--disabled-text-color)",
  "mdc-button-outline-color": "var(--divider-color)",
  "mdc-dialog-scroll-divider-color": "var(--divider-color)",
  "chip-background-color": "rgba(var(--rgb-primary-text-color), 0.15)",
  // Vaadin
  "material-body-text-color": "var(--primary-text-color)",
  "material-background-color": "var(--card-background-color)",
  "material-secondary-background-color": "var(--primary-background-color)",
  "material-secondary-text-color": "var(--secondary-text-color)",
};

export const buttonLinkStyle = css`
  button.link {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    text-align: left;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const haStyle = css`
  :host {
    font-family: var(--paper-font-body1_-_font-family);
    -webkit-font-smoothing: var(--paper-font-body1_-_-webkit-font-smoothing);
    font-size: var(--paper-font-body1_-_font-size);
    font-weight: var(--paper-font-body1_-_font-weight);
    line-height: var(--paper-font-body1_-_line-height);
  }

  app-header-layout,
  ha-app-layout {
    background-color: var(--primary-background-color);
  }

  app-header,
  app-toolbar {
    background-color: var(--app-header-background-color);
    font-weight: 400;
    color: var(--app-header-text-color, white);
  }

  app-toolbar {
    height: var(--header-height);
  }

  app-header div[sticky] {
    height: 48px;
  }

  app-toolbar [main-title] {
    margin-left: 20px;
  }

  h1 {
    font-family: var(--paper-font-headline_-_font-family);
    -webkit-font-smoothing: var(--paper-font-headline_-_-webkit-font-smoothing);
    white-space: var(--paper-font-headline_-_white-space);
    overflow: var(--paper-font-headline_-_overflow);
    text-overflow: var(--paper-font-headline_-_text-overflow);
    font-size: var(--paper-font-headline_-_font-size);
    font-weight: var(--paper-font-headline_-_font-weight);
    line-height: var(--paper-font-headline_-_line-height);
  }

  h2 {
    font-family: var(--paper-font-title_-_font-family);
    -webkit-font-smoothing: var(--paper-font-title_-_-webkit-font-smoothing);
    white-space: var(--paper-font-title_-_white-space);
    overflow: var(--paper-font-title_-_overflow);
    text-overflow: var(--paper-font-title_-_text-overflow);
    font-size: var(--paper-font-title_-_font-size);
    font-weight: var(--paper-font-title_-_font-weight);
    line-height: var(--paper-font-title_-_line-height);
  }

  h3 {
    font-family: var(--paper-font-subhead_-_font-family);
    -webkit-font-smoothing: var(--paper-font-subhead_-_-webkit-font-smoothing);
    white-space: var(--paper-font-subhead_-_white-space);
    overflow: var(--paper-font-subhead_-_overflow);
    text-overflow: var(--paper-font-subhead_-_text-overflow);
    font-size: var(--paper-font-subhead_-_font-size);
    font-weight: var(--paper-font-subhead_-_font-weight);
    line-height: var(--paper-font-subhead_-_line-height);
  }

  a {
    color: var(--primary-color);
  }

  .secondary {
    color: var(--secondary-text-color);
  }

  .error {
    color: var(--error-color);
  }

  .warning {
    color: var(--error-color);
  }

  mwc-button.warning {
    --mdc-theme-primary: var(--error-color);
  }

  ${buttonLinkStyle}

  .card-actions a {
    text-decoration: none;
  }

  .card-actions .warning {
    --mdc-theme-primary: var(--error-color);
  }

  .layout.horizontal,
  .layout.vertical {
    display: flex;
  }
  .layout.inline {
    display: inline-flex;
  }
  .layout.horizontal {
    flex-direction: row;
  }
  .layout.vertical {
    flex-direction: column;
  }
  .layout.wrap {
    flex-wrap: wrap;
  }
  .layout.no-wrap {
    flex-wrap: nowrap;
  }
  .layout.center,
  .layout.center-center {
    align-items: center;
  }
  .layout.bottom {
    align-items: flex-end;
  }
  .layout.center-justified,
  .layout.center-center {
    justify-content: center;
  }
  .flex {
    flex: 1;
    flex-basis: 0.000000001px;
  }
  .flex-auto {
    flex: 1 1 auto;
  }
  .flex-none {
    flex: none;
  }
  .layout.justified {
    justify-content: space-between;
  }
`;

export const haStyleDialog = css`
  /* prevent clipping of positioned elements */
  paper-dialog-scrollable {
    --paper-dialog-scrollable: {
      -webkit-overflow-scrolling: auto;
    }
  }

  /* force smooth scrolling for iOS 10 */
  paper-dialog-scrollable.can-scroll {
    --paper-dialog-scrollable: {
      -webkit-overflow-scrolling: touch;
    }
  }

  .paper-dialog-buttons {
    align-items: flex-end;
    padding: 8px;
    padding-bottom: max(env(safe-area-inset-bottom), 8px);
  }

  @media all and (min-width: 450px) and (min-height: 500px) {
    ha-paper-dialog {
      min-width: 400px;
    }
  }

  @media all and (max-width: 450px), all and (max-height: 500px) {
    paper-dialog,
    ha-paper-dialog {
      margin: 0;
      width: calc(
        100% - env(safe-area-inset-right) - env(safe-area-inset-left)
      ) !important;
      min-width: calc(
        100% - env(safe-area-inset-right) - env(safe-area-inset-left)
      ) !important;
      max-width: calc(
        100% - env(safe-area-inset-right) - env(safe-area-inset-left)
      ) !important;
      max-height: calc(100% - var(--header-height));

      position: fixed !important;
      bottom: 0px;
      left: env(safe-area-inset-left);
      right: env(safe-area-inset-right);
      overflow: scroll;
      border-bottom-left-radius: 25px;
      border-bottom-right-radius: 25px;
    }
  }

  /* mwc-dialog (ha-dialog) styles */
  ha-dialog {
    --mdc-dialog-min-width: 400px;
    --mdc-dialog-max-width: 600px;
    --mdc-dialog-heading-ink-color: var(--primary-text-color);
    --mdc-dialog-content-ink-color: var(--primary-text-color);
    --justify-action-buttons: space-between;
  }

  ha-dialog .form {
    padding-bottom: 24px;
    color: var(--primary-text-color);
  }

  a {
    color: var(--primary-color);
  }

  /* make dialog fullscreen on small screens */
  @media all and (max-width: 450px), all and (max-height: 500px) {
    ha-dialog {
      --mdc-dialog-min-width: calc(
        100vw - env(safe-area-inset-right) - env(safe-area-inset-left)
      );
      --mdc-dialog-max-width: calc(
        100vw - env(safe-area-inset-right) - env(safe-area-inset-left)
      );
      --mdc-dialog-min-height: 100%;
      --mdc-dialog-max-height: 100%;
      --mdc-shape-medium: 0px;
      --vertial-align-dialog: flex-end;
    }
  }
  mwc-button.warning {
    --mdc-theme-primary: var(--error-color);
  }
  .error {
    color: var(--error-color);
  }
`;

export const haStyleScrollbar = css`
  .ha-scrollbar::-webkit-scrollbar {
    width: 0.4rem;
    height: 0.4rem;
  }

  .ha-scrollbar::-webkit-scrollbar-thumb {
    -webkit-border-radius: 25px;
    border-radius: 25px;
    background: var(--scrollbar-thumb-color);
  }

  .ha-scrollbar {
    overflow-y: auto;
    scrollbar-color: var(--scrollbar-thumb-color) transparent;
    scrollbar-width: thin;
  }
`;

export const baseEntrypointStyles = css`
  body {
    background-color: var(--primary-background-color);
    color: var(--primary-text-color);
    height: calc(100vh - 32px);
    width: 100vw;
    border-radius: 25px;
  }
`;
