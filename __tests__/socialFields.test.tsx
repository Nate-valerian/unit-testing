import { render, screen } from "@testing-library/react";
import { useState } from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// Mock component
const MockSocialFields = ({ socials, onChange }) => {
  return (
    <div>
      {socials.map((social, index) => (
        <div key={social.platform}>
          <label>{social.platform.toUpperCase()} URL</label>
          <input
            value={social.url}
            onChange={(e) => onChange(index, e.target.value)}
            placeholder={`Enter ${social.platform} URL`}
            data-testid={`${social.platform}-input`}
          />
          {social.platform === 'linkedin' && social.url && !social.url.includes('linkedin.com') && (
            <div>Please enter a valid LinkedIn URL</div>
          )}
        </div>
      ))}
    </div>
  );
};

// Test wrapper
const TestWrapper = ({ initialSocials }) => {
  const [socials, setSocials] = useState(initialSocials);

  const handleChange = (index, value) => {
    setSocials(prev => prev.map((social, i) =>
      i === index ? { ...social, url: value } : social
    ));
  };

  return <MockSocialFields socials={socials} onChange={handleChange} />;
};

// Tests
describe("SocialFields Component", () => {
  const user = userEvent.setup();

  const mockSocials = [
    { platform: 'x', url: '', icon: 'x-icon' },
    { platform: 'linkedin', url: '', icon: 'linkedin-icon' },
    { platform: 'github', url: '', icon: 'github-icon' }
  ];

  it("shows error for invalid LinkedIn URL", async () => {
    render(<TestWrapper initialSocials={mockSocials} />);

    const linkedinInput = screen.getByTestId('linkedin-input');
    await user.type(linkedinInput, "invalid-url");

    expect(screen.getByText("Please enter a valid LinkedIn URL")).toBeInTheDocument();
  });

  it("doesn't show error for valid LinkedIn URL", async () => {
    render(<TestWrapper initialSocials={mockSocials} />);

    const linkedinInput = screen.getByTestId('linkedin-input');
    await user.type(linkedinInput, "https://linkedin.com/in/johndoe");

    expect(screen.queryByText("Please enter a valid LinkedIn URL")).not.toBeInTheDocument();
  });
});

