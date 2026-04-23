import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { BlogFeed } from "@/domains/blog/components/BlogFeed";

describe("blog feed", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders parsed rss posts", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      text: async () => `
        <rss>
          <channel>
            <item>
              <title>Infra Log</title>
              <link>https://example.com/post</link>
              <pubDate>2026-04-24</pubDate>
              <description><![CDATA[<p>test description</p>]]></description>
            </item>
          </channel>
        </rss>
      `,
    } as Response);

    render(<BlogFeed />);

    await waitFor(() => {
      expect(screen.getByText("Infra Log")).toBeInTheDocument();
    });
  });

  it("renders empty state when no items exist", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      text: async () => "<rss><channel></channel></rss>",
    } as Response);

    render(<BlogFeed />);

    await waitFor(() => {
      expect(screen.getByText("No logs found.")).toBeInTheDocument();
    });
  });
});
