import { HomeAssistant } from "../types";

export const documentationUrl = (hass: HomeAssistant, path: string) =>
  `https://automacaoraceland.pt/docs-domotica/`;
  // `https://${
  //   hass.config.version.includes("b")
  //     ? "rc"
  //     : hass.config.version.includes("dev")
  //     ? "next"
  //     : "www"
  // }.home-assistant.io${path}`;
