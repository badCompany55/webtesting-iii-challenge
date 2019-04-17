// Test away!
import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import Display from "./Display.js";

afterEach(cleanup);

describe("<Display/>", () => {
  it("should render without crashing", () => {
    render(<Display />);
  });
  it("should display open, unlocked", () => {
    const closed = false;
    const locked = false;
    const { getByText } = render(<Display closed={closed} locked={locked} />);
    const redLed = document.querySelector(".red-led");
    const greenLed = document.querySelector(".green-led");

    const isClosed = getByText(/open/i);
    const isLocked = getByText(/unlocked/i);
    expect(redLed).not.toBeInTheDocument();
    expect(greenLed).toBeInTheDocument();
  });
  it("should display closed, locked", () => {
    const closed = true;
    const locked = true;
    const { getByText } = render(<Display closed={closed} locked={locked} />);
    const redLed = document.querySelector(".red-led");
    const greenLed = document.querySelector(".green-led");

    const isClosed = getByText(/closed/i);
    const isLocked = getByText(/locked/i);
    expect(redLed).toBeInTheDocument();
    expect(greenLed).not.toBeInTheDocument();
  });
  it("should display open, unlocked by default", () => {
    const { getByText } = render(<Display />);

    const isClosed = getByText(/open/i);
    const isLocked = getByText(/unlocked/i);
  });
});
