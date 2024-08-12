import { configureStore, type EnhancedStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { render, type RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import type { RootState } from "../app/store";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

export const mockUser = userEvent.setup();

export const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {},
    preloadedState: initialState,
  });
};

export const renderWithProviders = (
  ui: ReactElement,
  {
    preloadedState = {},
    store = createMockStore(preloadedState),
    ...renderOptions
  }: {
    preloadedState?: Partial<RootState> | undefined;
    store?: EnhancedStore;
  } & Omit<RenderOptions, "wrapper"> = {},
): { store: EnhancedStore } & ReturnType<typeof render> => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  };
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
