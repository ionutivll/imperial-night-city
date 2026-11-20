import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { RULE_SECTIONS } from "@/lib/rules";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
  const leaf = (path: string) => router.matchRoutes(path).at(-1)?.routeId;

  it("matches a page for / instead of falling back to not found", () => {
    expect(leaf("/")).not.toBe(rootRouteId);
  });

  it("has pages for wiki, regulament sections and shop", () => {
    expect(leaf("/wiki")).toBe("/wiki/");
    expect(leaf("/wiki/joburi")).toBe("/wiki/$slug");
    expect(leaf("/regulament")).toBe("/regulament/");
    expect(leaf("/regulament/jafuri")).toBe("/regulament/$sectiune");
    expect(leaf("/shop")).toBe("/shop");
  });
});

describe("Regulament", () => {
  it("has the jafuri, mafii and general sections", () => {
    const slugs = RULE_SECTIONS.map((s) => s.slug);
    expect(slugs).toEqual(expect.arrayContaining(["general", "jafuri", "mafii"]));
  });

  it("has no rule text yet (staff sends the final version)", () => {
    expect(RULE_SECTIONS.every((s) => s.rules.length === 0)).toBe(true);
  });
});
