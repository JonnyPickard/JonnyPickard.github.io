import React from "react";

import { render, screen } from "@testing-library/react";
import { FormWIP, HOOKS_TITLE } from "./FormWIP";

test("should render Hooks", () => {
  render(<FormWIP />);

  const heading = screen.getByRole("heading", {
    level: 1,
    name: HOOKS_TITLE,
  });

  expect(heading).toBeInTheDocument();
});
