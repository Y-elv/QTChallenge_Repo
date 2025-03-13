import React from "react";
import { Input, Button } from "antd";
import styled from "styled-components";

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  children,
}) => (
  <SectionContainer>
    <h3>{title}</h3>
    {children}
  </SectionContainer>
);

const SettingsContent: React.FC = () => (
  <Container>
    <h2>Account Settings</h2>
    <p>Manage your account preferences and configurations:</p>
    <div style={{ marginTop: "24px", maxWidth: "700px" }}>
      <SettingsSection title="Profile Information">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <Input placeholder="First Name" defaultValue="MUGISHA" />
          <Input placeholder="Last Name" defaultValue="ELVIS" />
        </div>
        <Input
          placeholder="Email Address"
          defaultValue="example@bitly.com"
          style={{ marginBottom: "16px" }}
        />
        <StyledButton
          type="primary"
          style={{ backgroundColor: "#ee6123", border: "none" }}
        >
          Update Profile
        </StyledButton>
      </SettingsSection>

      <SettingsSection title="Security">
        <Button>Change Password</Button>
        <Button style={{ marginLeft: "12px" }}>
          Enable Two-Factor Authentication
        </Button>
      </SettingsSection>

      <SettingsSection title="Notifications">
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <label style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              defaultChecked
              style={{ marginRight: "8px" }}
            />
            Email notifications
          </label>
        </div>
      </SettingsSection>
    </div>
  </Container>
);

export default SettingsContent;

/* Styled Components */

const Container = styled.div`
  padding: 24px;
  height:78vh;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;



const SectionContainer = styled.div`
  margin-bottom: 32px;

  h3 {
    border-bottom: 1px solid #eee;
    padding-bottom: 12px;
    margin-bottom: 16px;
  }
`;

const StyledButton = styled(Button)`
  background-color: #ee6123 !important;
  color: white !important;
  border: none !important;

  &:hover {
    color: #ee6123 !important;
    border: 1px solid #ee6123 !important;
    background-color: transparent !important;
  }

  &:focus,
  &:active {
    outline: none !important;
    box-shadow: none !important;
  }
`;
