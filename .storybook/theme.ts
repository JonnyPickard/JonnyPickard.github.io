import logo from "../src/assets/logo.svg";

import { create } from "@storybook/theming/create";

// https://storybook.js.org/docs/react/configure/theming
export default create({
  brandImage: logo,
  brandUrl: "https://github.com/JonnyPickard/JonnyPickard.github.io",
  base: "dark",
  textColor: "#eeeeee",
  fontBase: "'Roboto Mono', monospace",
  fontCode: "monospace",
  appContentBg: "#1A202C",
  appPreviewBg: "#1A202C",
});
