import * as React from "react";

import { Navigation } from "../templates/Navigation";

// data
const links = [
  {
    text: "Test",
    url: "/blog/test",
  },
];

// markup
const IndexPage = () => {
  return (
    <>
      <Navigation />
      <main>
        {links.map((link) => (
          <a href={link.url}>{link.text}</a>
        ))}
      </main>
    </>
  );
};

export default IndexPage;
