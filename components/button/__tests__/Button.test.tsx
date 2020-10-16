import React from "react";
import { mount } from "enzyme";
import { Button } from "..";

describe("Button", () => {
  it("should render", () => {
    const btn = mount(<Button />);
    expect(btn.render()).toMatchSnapshot();
  });
});
