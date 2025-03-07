import { addons } from "@storybook/manager-api";
import favicon from "../src/assets/favicon.svg";
import yourTheme from "./theme";

addons.setConfig({
  theme: yourTheme,
  // show panel is deprecated -> this hides the controls panel by default
  bottomPanelHeight: 0,
});

// Changes favicon
const link = document.createElement("link");
link.setAttribute("rel", "shortcut icon");
link.setAttribute("href", favicon);
document.head.appendChild(link);

// Remember the last opened story
// const LAST_STORY_KEY = "lastViewedStoryIds";

// window.addEventListener("load", () => {
//   const lastStory = localStorage.getItem(LAST_STORY_KEY);
//   if (lastStory) {
//     const lastStoryId = JSON.parse(lastStory)[0].storyId;

//     if (window.location.search !== `?path=/story/${lastStoryId}`) {
//       window.location.href = `?path=/story/${lastStoryId}`;
//     }
//   }
// });
