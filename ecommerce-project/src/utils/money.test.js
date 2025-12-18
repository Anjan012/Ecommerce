import { it, expect, describe } from "vitest";
import { formatMoney } from "./money";

describe("formatMoney", () => {
  it("formats 1999 cents as 19.99", () => {
    expect(formatMoney(1999)).toBe("$19.99");
  }); // it creates the test and the string is the name of the test

  it("displays 2 decimals", () => {
    expect(formatMoney(1090)).toBe("$10.90");
    // adding another checks
    expect(formatMoney(100)).toBe("$1.00");
  });

  it("format 0 cents to $0.00", () => {
    expect(formatMoney(0)).toBe("$0.00");
  });

  it('formats -999 cents to -$9.99', () => {
    expect(formatMoney(-999)).toBe('$-9.99');
  })

});

// note: all of the checks needs to pass inorder for this test to pass if one fails the entire test fails
// describe: groups test together we call it testsuite a best practice is to puts test in a testsuite even we have only one test  
