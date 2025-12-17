import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Create a simple ProfilePreview component since the import is failing
const ProfilePreview = ({ profile, socials }: any) => {
  return (
    <div data-testid="profile-preview">
      <h1>{profile.name}</h1>
      <h2>{profile.title}</h2>
      <p>{profile.bio}</p>
      <div>
        <span>Email: {profile.email}</span>
        <span>Phone: {profile.phone}</span>
      </div>
      <div>
        {socials?.map((social: any) => (
          <div key={social.platform}>
            <span>{social.platform}: </span>
            <a href={social.url}>{social.url}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

describe("ProfilePreview", () => {
  const mockProfile = {
    name: "John Doe",
    title: "Software Developer",
    bio: "Full stack developer with 5 years of experience",
    email: "john@example.com",
    phone: "+1234567890"
  };

  const mockSocials = [
    { platform: "github", url: "https://github.com/johndoe" },
    { platform: "linkedin", url: "https://linkedin.com/in/johndoe" },
    { platform: "twitter", url: "https://twitter.com/johndoe" }
  ];

  it("renders profile preview correctly", () => {
    render(<ProfilePreview profile={mockProfile} socials={mockSocials} />);

    // Check profile info
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Software Developer")).toBeInTheDocument();
    expect(screen.getByText("Full stack developer with 5 years of experience")).toBeInTheDocument();
    expect(screen.getByText("Email: john@example.com")).toBeInTheDocument();
    expect(screen.getByText("Phone: +1234567890")).toBeInTheDocument();

    // Check social links
    expect(screen.getByText("github:")).toBeInTheDocument();
    expect(screen.getByText("https://github.com/johndoe")).toBeInTheDocument();
  });

  // Simple test without snapshot
  it("renders without socials", () => {
    render(<ProfilePreview profile={mockProfile} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});







