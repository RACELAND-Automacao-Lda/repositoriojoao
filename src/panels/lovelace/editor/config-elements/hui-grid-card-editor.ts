import { mdiConsoleNetworkOutline } from "@mdi/js";
import { html, TemplateResult } from "lit";
import { customElement } from "lit/decorators";
import {
  any,
  array,
  assert,
  assign,
  boolean,
  number,
  object,
  optional,
  string,
} from "superstruct";
import { fireEvent } from "../../../../common/dom/fire_event";
import { computeRTLDirection } from "../../../../common/util/compute_rtl";
import { GridCardConfig } from "../../cards/types";
import { baseLovelaceCardConfig } from "../structs/base-card-struct";
import { HuiStackCardEditor } from "./hui-stack-card-editor";

const cardConfigStruct = assign(
  baseLovelaceCardConfig,
  object({
    cards: array(any()),
    title: optional(string()),
    square: optional(boolean()),
    columns: optional(number()),
  })
);

@customElement("hui-grid-card-editor")
export class HuiGridCardEditor extends HuiStackCardEditor {
  public setConfig(config: Readonly<GridCardConfig>): void {
    assert(config, cardConfigStruct);
    this._config = config;
  }

  get _columns(): number {
    return this._config!.columns || 3;
  }

  get _square(): boolean {
    return this._config!.square ?? true;
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    return html`
      <div class="card-config">
        <div class="side-by-side">
        <paper-dropdown-menu

        .label="${this.hass.localize(
          "ui.panel.lovelace.editor.card.grid.columns"
        )} (${this.hass.localize(
          "ui.panel.lovelace.editor.card.config.optional"
        )})">
        <paper-listbox
        @iron-select=${this._handleColumnsChanged}
        slot="dropdown-content"
        attr-for-selected="value"
        .configValue=${"columns"}
        selected='1'
        >

        <paper-item .value=${2}>2 Colunas
        </paper-item>
        <paper-item .value=${3}>3 Colunas
        </paper-item>
        </paper-listbox>
        </paper-dropdown-menu>

        <!--<paper-input
            .label="${this.hass.localize(
              "ui.panel.lovelace.editor.card.grid.columns"
            )} (${this.hass.localize(
              "ui.panel.lovelace.editor.card.config.optional"
            )})"
            type="number"
            .value=${this._columns}
            .configValue=${"columns"}
            @value-changed=${this._handleColumnsChanged}
          ></paper-input>-->
          <ha-formfield
            .label=${this.hass.localize(
              "ui.panel.lovelace.editor.card.grid.square"
            )}
            .dir=${computeRTLDirection(this.hass)}
          >
            <ha-switch
              .checked=${this._square}
              .configValue=${"square"}
              @change=${this._handleSquareChanged}
            ></ha-switch>
          </ha-formfield>
        </div>
      </div>
      ${super.render()}
    `;
  }

  private _handleColumnsChanged(ev): void {
    console.log("EV", ev)
    if (!this._config) {
      return;
    }
    const value = Number(ev.detail.item.value);
    console.log("evento", ev.detail.item.value);
    if (this._columns === value) {
      return;
    }
    if (!ev.detail.item.value) {
      this._config = { ...this._config };
      delete this._config.columns;
    } else {
      this._config = {
        ...this._config,
        columns: value,
      };
    }
    console.log("configuração", this._config);
    fireEvent(this, "config-changed", { config: this._config });
  }

  private _handleSquareChanged(ev): void {
    if (!this._config || this._square === ev.target.checked) {
      return;
    }

    fireEvent(this, "config-changed", {
      config: { ...this._config, square: ev.target.checked },
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hui-grid-card-editor": HuiGridCardEditor;
  }
}
