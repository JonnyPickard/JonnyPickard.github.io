import React from "react";

import { render, screen } from "@testing-library/react";
import { UseState, USE_STATE_TITLE } from "./UseState";

test("should render UseState", () => {
  render(<UseState />);

  const heading = screen.getByRole("heading", {
    level: 1,
    name: USE_STATE_TITLE,
  });

  expect(heading).toBeInTheDocument();
});
