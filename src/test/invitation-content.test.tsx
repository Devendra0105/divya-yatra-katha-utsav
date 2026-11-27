import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@tanstack/react-router", () => ({
  useSearch: () => ({}),
}));

import { InvitationPage } from "@/components/invitation-page";
import { accommodation } from "@/data/accommodation";
import { contactGroups } from "@/data/instructions";
import { katha, kathaSchedule } from "@/data/katha";

describe("Divya Yatra invitation content", () => {
  it("uses updated organizer location and day-wise Katha schedule starting 15 Dec 2026", () => {
    expect(katha.organizers).toContain("दौसा, जयपुर एवं जोधपुर");
    expect(katha.organizers).not.toContain("दौसा एवं जोधपुर");
    expect(kathaSchedule[0]?.date).toBe("15 दिसंबर 2026");
    expect(kathaSchedule[0]?.title).toContain("मुख्य वक्ता एवं श्रोता की कथा");

    for (const day of kathaSchedule) {
      expect(day.timing.length).toBeGreaterThan(0);
      expect(day.venue.length).toBeGreaterThan(0);
    }

    expect("personalRoomSurcharge" in accommodation).toBe(false);
    expect("trainFare" in accommodation).toBe(false);
  });

  it("renders cover and opened invitation without removed text and with Yajman & invitator details", () => {
    vi.useFakeTimers();
    render(<InvitationPage />);

    expect(document.body.textContent).not.toContain("सप्रेम आमंत्रण");
    expect(screen.getAllByText("श्री अक्षर पुरुषोत्तम महाराज").length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole("button", { name: /निमंत्रण खोलें/i }));
    act(() => {
      vi.runAllTimers();
    });
    vi.useRealTimers();

    const text = document.body.textContent ?? "";
    expect(text).not.toContain("सप्रेम आमंत्रण");
    expect(text).not.toContain("दौसा एवं जोधपुर");
    expect(text).not.toContain("किराया");
    expect(text).not.toContain("अतिथि");

    expect(text).toContain("मुख्य यजमान");
    expect(text).toContain("विशिष्ट यजमान");
    expect(text).toContain("कथा का समय");
    expect(text).toContain("कथा का स्थान");
    expect(text).toContain("मुख्य वक्ता एवं श्रोता की कथा");

    for (const group of contactGroups) {
      for (const person of group.contacts) {
        expect(text).toContain(person.name);
      }
    }
  });
});
