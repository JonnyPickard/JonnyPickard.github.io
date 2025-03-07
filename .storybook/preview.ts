import type { Preview } from "@storybook/react";
import "../src/styles/global.css";
import theme from "./theme";

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        includeNames: true,
        method: "configure",
        order: [
          "Introduction",
          "Examples",
          [
            "Game Dev",
            [
              "Hex Grid",
              ["Notes", "Grid", "Tile", "Player", "Terrain", "Overlays", "*"],
            ],
            "ReactThreeJs",
            ["Avatar"],
          ],
          "Notes",
          ["Overview", "Data Fetching & Caching", ["Introduction", "*"]],
        ],
      },
    },
    docs: {
      theme,
      toc: true,
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
