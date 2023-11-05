import { screen } from "@testing-library/react";

import withLayout from "./Layout";
import renderWithProviders from "../../utils/testUtils/testStore";

describe("Given a HOC Layout", () => {
  describe("When is called with a mock component", () => {
    test("Then it should return a wrapper with the Header and the given mock component", () => {
      const mockComponentText = "Mock component";
      const mockComponent = <div>{mockComponentText}</div>;
      const mockComponentWithLayout = withLayout(mockComponent);

      renderWithProviders(mockComponentWithLayout);

      const header = screen.getByText("CleverPy");
      const receivedMockComponent = screen.getByText(mockComponentText);

      expect(header).toBeInTheDocument();
      expect(receivedMockComponent).toBeInTheDocument();
    });
  });
});
