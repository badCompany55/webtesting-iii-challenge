// Test away!
import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import Controls from "./Controls.js";
import "jest-dom/extend-expect";

afterEach(cleanup);

describe("<Controls/>", () => {
  it("should render without crashing", () => {
    render(<Controls />);
  });
  it("should contain two buttons, toggle states", () => {
    const toggleClose = jest.fn();
    const toggleLoct = jest.fn();
    const { getByText } = render(<Controls />);

    const button1 = getByText(/lock gate/i);
    const button2 = getByText(/close gate/i);
  });
  cleanup();

  it("should call toggleLocked/toggleClose on click", () => {
    const closeSwitch = jest.fn(vari => !vari);
    const tgLockedMock = jest.fn();
    const tgClosedMock = jest.fn();
    const { getByTestId, rerender } = render(
      <Controls
        closed={true}
        locked={false}
        toggleLocked={tgLockedMock}
        toggleClosed={tgClosedMock}
      />
    );
    const button1 = getByTestId("unlockLock");
    const button2 = getByTestId("openClose");

    fireEvent.click(button2);
    expect(button2.textContent).toBe("Open Gate");
    expect(tgClosedMock).toHaveBeenCalled();

    fireEvent.click(button1);
    rerender(
      <Controls
        closed={true}
        locked={true}
        toggleLocked={tgLockedMock}
        toggleClosed={tgClosedMock}
      />
    );
    expect(button1.textContent).toBe("Unlock Gate");
    expect(button2).toBeDisabled();
    expect(tgLockedMock).toHaveBeenCalled();

    fireEvent.click(button1);
    rerender(
      <Controls
        closed={true}
        locked={false}
        toggleLocked={tgLockedMock}
        toggleClosed={tgClosedMock}
      />
    );
    expect(button1.textContent).toBe("Lock Gate");
    expect(tgLockedMock).toHaveBeenCalled();

    fireEvent.click(button1);
    rerender(
      <Controls
        closed={false}
        locked={false}
        toggleLocked={tgLockedMock}
        toggleClosed={tgClosedMock}
      />
    );
    expect(button2.textContent).toBe("Close Gate");
    expect(button1).toBeDisabled();
    expect(tgClosedMock).toHaveBeenCalled();
  });
});
