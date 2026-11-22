import { describe, expect, it } from "vitest";
import { CONTROLS } from "@/lib/controls";
import { SERVER_INFO } from "@/lib/server-info";

describe("Controls guide", () => {
  it.each(["F1", "F8", "K", "T", "U"])("includes the requested %s key", (key) => {
    expect(CONTROLS.some((control) => control.keys.includes(key))).toBe(true);
  });
});

describe("External shop", () => {
  it("points to Tebex instead of an internal product page", () => {
    expect(new URL(SERVER_INFO.shopUrl).hostname).toBe("tebex.io");
  });
});
