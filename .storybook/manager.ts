import { addons } from "@storybook/manager-api";
import yourTheme from "./theme";
import favicon from "../src/assets/favicon.svg";

// Changes favicon
const link = document.createElement("link");
link.setAttribute("rel", "shortcut icon");
link.setAttribute("href", favicon);
document.head.appendChild(link);

addons.setConfig({
  theme: yourTheme,
  showPanel: false,
});
