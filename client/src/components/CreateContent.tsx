import React, { useState } from "react";
import { Input, Button, Tooltip } from "antd";
import { CopyOutlined, LinkOutlined, LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-hot-toast";
import BaseUrl from "../utils/config";
import styled from "styled-components";

// Define proper interface for button props
interface ActionButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  tooltip: string;
}

// Fixed ActionButton component with properly typed props
const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  icon,
  tooltip,
}) => (
  <Tooltip title={tooltip}>
    <ActionButtonWrapper onClick={onClick}>{icon}</ActionButtonWrapper>
  </Tooltip>
);

const ActionButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }
`;

// Fixed VisitButton component with properly typed props
const VisitButton: React.FC<ActionButtonProps> = ({
  onClick,
  icon,
  tooltip,
}) => (
  <Tooltip title={tooltip}>
    <VisitButtonWrapper onClick={onClick}>{icon}</VisitButtonWrapper>
  </Tooltip>
);

const VisitButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background-color: #031f39;
  color: white;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #153856;
  }
`;

const CreateContent: React.FC = () => {
  const [longUrl, setLongUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [shortenedUrl, setShortenedUrl] = useState<string>("");

  const handleShortenUrl = async () => {
    // Validate input
    if (!longUrl || !longUrl.trim()) {
      toast.error("Please enter a valid URL", {
        position: "top-right",
      });
      return;
    }

    setLoading(true);

    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      // Make API request
      const response:any = await axios.post(
        `${BaseUrl}/urls/shorten`,
        {
          longUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response.data);

      if (response.status === 200 || response.status === 201) {
        // Display success message
        toast.success("URL shortened successfully!", {
          position: "top-right",
        });

        // Store the shortened URL
        setShortenedUrl(response.data.data.shortUrl);
      }
    } catch (error: any) {
      console.error("Error shortening URL:", error);

      // Display error message
      toast.error(
        error.response?.data?.message ||
          "Failed to shorten URL. Please try again.",
        {
          position: "top-right",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl);
    toast.success("Copied to clipboard!", {
      position: "top-right",
    });
  };

  return (
    <Container>
      <Title>Create New Link</Title>
      <Subtitle>
        Paste a long URL to create a shorter, more manageable link:
      </Subtitle>
      <FormSection>
        <StyledTextArea
          placeholder="https://example.com/very/long/url/that/needs/shortening"
          rows={4}
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <ShortenButton
          type="primary"
          onClick={handleShortenUrl}
          loading={loading}
        >
          {loading ? <LoadingOutlined /> : "Shorten URL"}
        </ShortenButton>
      </FormSection>

      {shortenedUrl && (
        <ResultSection>
          <ResultTitle>Your Shortened URL:</ResultTitle>
          <ResultActions>
            <ResultInput value={shortenedUrl} readOnly />
            <ActionButton
              onClick={handleCopyToClipboard}
              icon={<CopyOutlined />}
              tooltip="Copy to clipboard"
            />
            <VisitButton
              onClick={() => window.open(shortenedUrl, "_blank")}
              icon={<LinkOutlined />}
              tooltip="Visit URL"
            />
          </ResultActions>
        </ResultSection>
      )}
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #031f39;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 24px;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
`;

const StyledTextArea = styled(Input.TextArea)`
  margin-bottom: 16px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;

  &:focus,
  &:hover {
    border-color: #ee6123;
    box-shadow: 0 0 0 2px rgba(238, 97, 35, 0.1);
  }
`;

const ShortenButton = styled(Button)`
  background-color: #ee6123;
  border: none;
  height: 40px;
  border-radius: 8px;
  font-weight: 500;

  &:hover {
    background-color: #d15520;
  }

  &:focus {
    background-color: #ee6123;
  }
`;

const ResultSection = styled.div`
  margin-top: 24px;
  padding: 16px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  background: #f9f9f9;
  max-width: 600px;
`;

const ResultTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #031f39;
  margin-bottom: 12px;
`;

const ResultActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ResultInput = styled(Input)`
  font-weight: 500;

  &.ant-input {
    border-radius: 8px;
    border: 1px solid #d9d9d9;
  }
`;

export default CreateContent;
