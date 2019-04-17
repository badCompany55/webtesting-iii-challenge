// Test away
import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import Dashboard from "./Dashboard.js";

afterEach(cleanup);

describe("<Dashboard/>", () => {
  it("should render without crashing", () => {
    render(<Dashboard />);
  });

  it("should change button text on click", () => {
    const { getByText, getByTestId } = render(<Dashboard />);
    const button1 = getByTestId("unlockLock");
    const button2 = getByTestId("openClose");

    fireEvent.click(button2);
    expect(button2.textContent).toBe("Open Gate");
    fireEvent.click(button1);
    expect(button1.textContent).toBe("Unlock Gate");
    fireEvent.click(button2);
    expect(button2.textContent).toBe("Open Gate");
    expect(button2.textContent).not.toBe("Close Gate");
    fireEvent.click(button1);
    expect(button1.textContent).toBe("Lock Gate");
    fireEvent.click(button2);
    expect(button2.textContent).toBe("Close Gate");
    fireEvent.click(button1);
    expect(button1.textContent).toBe("Lock Gate");
  });
});
