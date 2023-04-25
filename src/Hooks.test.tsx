import React from "react";

import { render, screen } from "@testing-library/react";
import { Hooks, HOOKS_TITLE } from "./Hooks";

test("should render Hooks", () => {
  render(<Hooks />);

  const heading = screen.getByRole("heading", {
    level: 1,
    name: HOOKS_TITLE,
  });

  expect(heading).toBeInTheDocument();
});
