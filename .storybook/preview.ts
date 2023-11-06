import type { Preview } from "@storybook/react";
import theme from "./theme";

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        includeNames: true,
        method: "configure",
        order: [
          "Introduction",
          "Notes",
          ["Overview", "Data Fetching & Caching", ["Introduction", "*"]],
        ],
      },
    },
    docs: {
      theme,
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
