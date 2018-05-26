import { createPraise } from "../";
import * as puppeteer from "puppeteer";

describe("Praise tests", () => {
  it("Should fail when there is no SpeechRecognition", () => {
    expect(() => createPraise({ "*": () => true })).toThrow();
  });
});
