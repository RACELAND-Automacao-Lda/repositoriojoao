import "@material/mwc-ripple";
import type { Ripple } from "@material/mwc-ripple";
import { RippleHandlers } from "@material/mwc-ripple/ripple-handlers";
import { HassEntity } from "home-assistant-js-websocket";
import {
  css,
  CSSResultGroup,
  html,
  LitElement,
  PropertyValues,
  TemplateResult,
} from "lit";
import {
  customElement,
  eventOptions,
  property,
  queryAsync,
  state,
} from "lit/decorators";
import { ifDefined } from "lit/directives/if-defined";
import { styleMap } from "lit/directives/style-map";
import { DOMAINS_TOGGLE } from "../../../common/const";
import { applyThemesOnElement } from "../../../common/dom/apply_themes_on_element";
import { computeActiveState } from "../../../common/entity/compute_active_state";
import { computeDomain } from "../../../common/entity/compute_domain";
import { computeStateDisplay } from "../../../common/entity/compute_state_display";
import { computeStateDomain } from "../../../common/entity/compute_state_domain";
import { computeStateName } from "../../../common/entity/compute_state_name";
import { stateIcon } from "../../../common/entity/state_icon";
import { isValidEntityId } from "../../../common/entity/valid_entity_id";
import { iconColorCSS } from "../../../common/style/icon_color_css";
import "../../../components/ha-card";
import { LightEntity } from "../../../data/light";
import { ActionHandlerEvent } from "../../../data/lovelace";
import { HomeAssistant } from "../../../types";
import { actionHandler } from "../common/directives/action-handler-directive";
import { findEntities } from "../common/find-entities";
import { handleAction } from "../common/handle-action";
import { hasAction } from "../common/has-action";
import { createEntityNotFoundWarning } from "../components/hui-warning";
import { LovelaceCard, LovelaceCardEditor } from "../types";
import { ButtonCardConfig } from "./types";

@customElement("hui-button-card")
export class HuiButtonCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("../editor/config-elements/hui-button-card-editor");
    return document.createElement("hui-button-card-editor");
  }

  public static getStubConfig(
    hass: HomeAssistant,
    entities: string[],
    entitiesFallback: string[]
  ): ButtonCardConfig {
    const maxEntities = 1;
    const foundEntities = findEntities(
      hass,
      maxEntities,
      entities,
      entitiesFallback,
      ["switch"]
    );

    return {
      type: "button",
      tap_action: {
        action: "toggle",
      },
      entity: foundEntities[0] || "",
    };
  }

  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: ButtonCardConfig;

  @queryAsync("mwc-ripple") private _ripple!: Promise<Ripple | null>;

  @state() private _shouldRenderRipple = false;

  public getCardSize(): number {
    return (
      (this._config?.show_icon ? 4 : 0) + (this._config?.show_name ? 1 : 0)
    );
  }

  public setConfig(config: ButtonCardConfig): void {
    if (config.entity && !isValidEntityId(config.entity)) {
      throw new Error("Invalid entity");
    }

    this._config = {
      tap_action: {
        action:
          config.entity && DOMAINS_TOGGLE.has(computeDomain(config.entity))
            ? "toggle"
            : "more-info",
      },
      hold_action: { action: "more-info" },
      show_icon: true,
      show_name: true,
      state_color: true,
      ...config,
    };
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has("_config")) {
      return true;
    }

    const oldHass = changedProps.get("hass") as HomeAssistant | undefined;

    if (
      !oldHass ||
      oldHass.themes !== this.hass!.themes ||
      oldHass.locale !== this.hass!.locale
    ) {
      return true;
    }

    return (
      Boolean(this._config!.entity) &&
      oldHass.states[this._config!.entity!] !==
        this.hass!.states[this._config!.entity!]
    );
  }

  protected render(): TemplateResult {
    if (!this._config || !this.hass) {
      return html``;
    }
    const stateObj = this._config.entity
      ? this.hass.states[this._config.entity]
      : undefined;

    if (this._config.entity && !stateObj) {
      return html`
        <hui-warning>
          ${createEntityNotFoundWarning(this.hass, this._config.entity)}
        </hui-warning>
      `;
    }

    return html`
      <ha-card
        @action=${this._handleAction}
        @focus=${this.handleRippleFocus}
        @blur=${this.handleRippleBlur}
        @mousedown=${this.handleRippleActivate}
        @mouseup=${this.handleRippleDeactivate}
        @touchstart=${this.handleRippleActivate}
        @touchend=${this.handleRippleDeactivate}
        @touchcancel=${this.handleRippleDeactivate}
        .actionHandler=${actionHandler({
          hasHold: hasAction(this._config!.hold_action),
          hasDoubleClick: hasAction(this._config!.double_tap_action),
        })}
        tabindex=${ifDefined(
          hasAction(this._config.tap_action) ? "0" : undefined
        )}
      >
        ${this._config.show_icon
          ? html`
              <ha-icon
                tabindex="-1"
                data-domain=${ifDefined(
                  this._config.state_color && stateObj
                    ? computeStateDomain(stateObj)
                    : undefined
                )}
                data-state=${ifDefined(
                  stateObj ? computeActiveState(stateObj) : undefined
                )}
                .icon=${this._config.icon ||
                (stateObj ? stateIcon(stateObj) : "")}
                style=${styleMap({
                  filter: stateObj ? this._computeBrightness(stateObj) : "",
                  color: stateObj ? this._computeColor(stateObj) : "",
                  height: this._config.icon_height
                    ? this._config.icon_height
                    : "",
                })}
              ></ha-icon>
            `
          : ""}
        ${this._config.show_name
          ? html`
              <span tabindex="-1">
                ${this._config.name ||
                (stateObj ? computeStateName(stateObj) : "")}
              </span>
            `
          : ""}
        ${this._config.show_state && stateObj
          ? html`<span class="state">
              ${computeStateDisplay(
                this.hass.localize,
                stateObj,
                this.hass.locale
              )}
            </span>`
          : ""}
        ${this._shouldRenderRipple ? html`<mwc-ripple></mwc-ripple>` : ""}
      </ha-card>
    `;
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (!this._config || !this.hass) {
      return;
    }
    const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
    const oldConfig = changedProps.get("_config") as
      | ButtonCardConfig
      | undefined;

    if (
      !oldHass ||
      !oldConfig ||
      oldHass.themes !== this.hass.themes ||
      oldConfig.theme !== this._config.theme
    ) {
      applyThemesOnElement(this, this.hass.themes, this._config.theme);
    }
  }

  private _rippleHandlers: RippleHandlers = new RippleHandlers(() => {
    this._shouldRenderRipple = true;
    return this._ripple;
  });

  @eventOptions({ passive: true })
  private handleRippleActivate(evt?: Event) {
    this._rippleHandlers.startPress(evt);
  }

  private handleRippleDeactivate() {
    this._rippleHandlers.endPress();
  }

  private handleRippleFocus() {
    this._rippleHandlers.startFocus();
  }

  private handleRippleBlur() {
    this._rippleHandlers.endFocus();
  }

  static get styles(): CSSResultGroup {
    return [
      iconColorCSS,
      css`
      ha-card {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 0px 0px 0px 0px;
        overflow: hidden;
        text-align: center;
        font-size: 1.2rem;
        height: 100%;
        width: 75%; //100% hui-card-options
        box-sizing: border-box;
        justify-content: center;
        position: relative;
        border-radius: 25px;
        background: rgba(53,53,56,0.7);
        color:white;
      }

      ha-icon {
        width: 40%;
        height: auto;
        color: var(--paper-item-icon-color, #fdd835);
        --mdc-icon-size: 100%;
        margin: 0% 45% 0% 0%;
        padding: 5% 10% 0% 0%;
      }

      span {
        margin: 5% 50% 0% 0%;
        padding: 0%; 100% 0% 0%;
      }

      ha-icon + span {
        text-align: left;
      }

      ha-icon,
      span {
        outline: none;
      }

      .state {
        margin: 0% 50% 5% 0%;
        padding: 0%; 100% 5% 0%;
        text-align: left;
      }

      .hassbut.state-on {
        background: rgba(255,255,255,0.7);
        color: black;
      }

      .hassbut {
        display: grid;
        grid-template-columns: 50% 50%;
      }
    `,
  ];
}
  private _computeBrightness(stateObj: HassEntity | LightEntity): string {
    if (!stateObj.attributes.brightness || !this._config?.state_color) {
      return "";
    }
    const brightness = stateObj.attributes.brightness;
    return `brightness(${(brightness + 245) / 5}%)`;
  }

  private _computeColor(stateObj: HassEntity | LightEntity): string {
    if (this._config?.state_color && stateObj.attributes.rgb_color) {
      return `rgb(${stateObj.attributes.rgb_color.join(",")})`;
    }
    return "";
  }

  private _handleAction(ev: ActionHandlerEvent) {
    handleAction(this, this.hass!, this._config!, ev.detail.action!);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hui-button-card": HuiButtonCard;
  }
}
