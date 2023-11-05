import { screen } from "@testing-library/react";

import renderWithProviders from "../../utils/testUtils/testStore";
import withBasePage from "./BasePage";

describe("Given a HOC Layout", () => {
  describe("When is called with a mock component", () => {
    test("Then it should return a wrapper with the given mock component", () => {
      const mockComponentText = "Mock component";
      const mockComponent = <div>{mockComponentText}</div>;
      const mockComponentWithLayout = withBasePage(mockComponent);

      renderWithProviders(mockComponentWithLayout);

      const receivedMockComponent = screen.getByText(mockComponentText);

      expect(receivedMockComponent).toBeInTheDocument();
    });
  });
});
