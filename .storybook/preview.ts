import type { Preview } from "@storybook/react";
import "../src/styles/global.css";
import theme from "./theme";

const preview: Preview = {
  parameters: {
    options: {},
    docs: {
      theme,
      toc: false,
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      disableSaveFromUI: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
