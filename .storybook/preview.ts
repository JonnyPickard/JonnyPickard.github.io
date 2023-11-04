import type { Preview } from "@storybook/react";
import theme from "./theme";

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        includeNames: true,
        order: ["Introduction", "Notes", ["Overiew"]],
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
