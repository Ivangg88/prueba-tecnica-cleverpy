import { PreloadedState } from "@reduxjs/toolkit";
import renderWithProviders from "../../utils/testUtils/testStore";
import { Header } from "./Header";
import { RootState } from "../../redux/store";
import { screen } from "@testing-library/react";

describe("Given a component Header", () => {
  describe("When is rendered with a logged user", () => {
    test("Then it should show a span with the text: 'Welcome mockUser and a link qith the text:'Logout", () => {
      const preloadStore: PreloadedState<RootState> = {
        user: { isLogged: true, token: "", userName: "Mock user" },
      };
      const expectedText = "Welcome: Mock user";
      const expectedLinkName = "Logout";

      renderWithProviders(<Header />, { preloadedState: preloadStore });

      const receivedText = screen.getByText(expectedText);
      const receivedLink = screen.getByRole("link", { name: expectedLinkName });

      expect(receivedText).toBeInTheDocument();
      expect(receivedLink).toBeInTheDocument();
    });
  });
});
