import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";

describe("Login Form Component", () => {

  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("RENDERS email and password fields", () => {
    render(<Login />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("SHOWS ERROR for short password", () => {
    render(<Login />);

    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);
    const button = screen.getByRole("button", { name: /login/i });

    fireEvent.change(email, { target: { value: "test@test.com" } });
    fireEvent.change(password, { target: { value: "123" } });

    fireEvent.click(button);

    expect(screen.getByText("Min 6 characters")).toBeInTheDocument();
  });

  it("SUBMITS successfully with valid input", () => {
    render(<Login />);

    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);
    const button = screen.getByRole("button", { name: /login/i });

    fireEvent.change(email, { target: { value: "test@test.com" } });
    fireEvent.change(password, { target: { value: "123456" } });

    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith("Form submitted successfully");
  });

});
