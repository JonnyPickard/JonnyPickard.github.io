import type { Preview } from "@storybook/react";
import theme from "./theme";

const preview: Preview = {
  parameters: {
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
