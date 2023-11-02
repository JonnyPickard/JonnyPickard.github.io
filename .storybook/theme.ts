import "../src/styles/global.css";

import { create } from "@storybook/theming/create";

// https://storybook.js.org/docs/react/configure/theming
export default create({
  base: "dark",
  // Text colors
  textColor: "#eeeeee",

  // UI
  appContentBg: "#1A202C",
});
