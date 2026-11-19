import { describe, expect, it } from "vitest";
import { SERVER_INFO } from "@/lib/server-info";

describe("Server info", () => {
  it("marks the server as not open yet", () => {
    expect(SERVER_INFO.isOpen).toBe(false);
  });

  it("uses the community Discord invite", () => {
    expect(SERVER_INFO.discordUrl).toBe("https://discord.gg/Mtn2SksTGy");
  });
});
