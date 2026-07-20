import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../app/page";

const mockFetch = jest.fn();

beforeAll(() => {
  global.fetch = mockFetch as unknown as typeof fetch;
});

beforeEach(() => {
  mockFetch.mockReset();
});

describe("SmartMail AI", () => {
  test("shows an error when the situation is empty", async () => {
    const user = userEvent.setup();

    render(<Home />);

    await user.click(
      screen.getByRole("button", {
        name: /generate email/i,
      })
    );

    expect(
      screen.getByText("Please describe the email situation first.")
    ).toBeInTheDocument();

    expect(mockFetch).not.toHaveBeenCalled();
  });

  test("displays the generated subject and email", async () => {
    const user = userEvent.setup();

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        subject: "Leave Request",
        email:
          "Dear Manager,\n\nI would like to request leave tomorrow.\n\nBest regards,\n[Your Name]",
      }),
    } as Response);

    render(<Home />);

    await user.type(
      screen.getByLabelText(/describe your situation/i),
      "Request leave tomorrow because I am feeling unwell."
    );

    await user.click(
      screen.getByRole("button", {
        name: /generate email/i,
      })
    );

    expect(
      await screen.findByText("Leave Request")
    ).toBeInTheDocument();

    expect(
      screen.getByText(/I would like to request leave tomorrow/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /copy email/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /regenerate/i,
      })
    ).toBeInTheDocument();
  });

  test("clear resets the form", async () => {
    const user = userEvent.setup();

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        subject: "Follow-up Request",
        email: "Dear Team,\n\nI am following up on my previous request.",
      }),
    } as Response);

    render(<Home />);

    const situationField = screen.getByLabelText(
      /describe your situation/i
    );

    const toneSelector = screen.getByLabelText(/select tone/i);

    await user.type(
      situationField,
      "Follow up on the proposal I sent last week."
    );

    await user.selectOptions(toneSelector, "Follow-up");

    await user.click(
      screen.getByRole("button", {
        name: /generate email/i,
      })
    );

    expect(
      await screen.findByText("Follow-up Request")
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: /^clear$/i,
      })
    );

    expect(situationField).toHaveValue("");
    expect(toneSelector).toHaveValue("Professional");

    expect(
      screen.queryByText("Follow-up Request")
    ).not.toBeInTheDocument();
  });
});