import React, { useState } from "react";
import { Input, Button } from "antd";
import styled from "styled-components";
import BaseUrl from "../utils/config";
import axios from "axios";
import { toast } from "react-hot-toast";

const CreateContent: React.FC = () => {
  const [longUrl, setLongUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [shortenedUrl, setShortenedUrl] = useState<string>("");

  const handleShortenUrl = async () => {
    console.log("the click on me : handleShortenUrl ");
    // Validate input
    if (!longUrl || !longUrl.trim()) {
      toast.error("Please enter a valid URL", {
        position: "top-right",
      });
      return;
    }

    setLoading(true);

    // Make API request
    try {
      const token = localStorage.getItem("token");
      console.log(`token: ${token}`);
      console.log(`Making request to: ${BaseUrl}/urls/shorten`); // Debugging URL

      const response: any = await axios.post(
        `${BaseUrl}/urls/shorten`,
        { longUrl },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", // Ensure correct format
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("Response received:", response.data);

      if (response.status === 200 || response.status === 201) {
        toast.success("URL shortened successfully!", {
          position: "top-right",
        });

        setShortenedUrl(response.data?.data?.shortUrl || ""); // Avoid undefined errors
        setLongUrl("");
      }
    } catch (error: any) {
      console.error("Error shortening URL:", error);

      if (error.code === "ERR_NETWORK") {
        toast.error(
          "Network error. Please check your connection or try again.",
          {
            position: "top-right",
          }
        );
      } else {
        toast.error(error.response?.data?.message || "Failed to shorten URL.", {
          position: "top-right",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2>Create New Link</h2>
      <Subtitle>
        Paste a long URL to create a shorter, more manageable link:
      </Subtitle>
      <FormSection>
        <StyledInput
          placeholder="https://example.com/very/long/url/that/needs/shortening"
          value={longUrl}
          onInput={(e: any) => {
            console.log("Input event value:", e.target.value);
            setLongUrl(e.target.value);
          }}
        />
        <StyledButton
          type="primary"
          onClick={handleShortenUrl}
          disabled={loading}
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </StyledButton>
      </FormSection>

      {shortenedUrl && (
        <ResultSection>
          <ResultTitle>Your Shortened URL:</ResultTitle>
          <ResultActions>
            <ResultInput value={shortenedUrl} readOnly />
          </ResultActions>
        </ResultSection>
      )}
    </Container>
  );
};

export default CreateContent;

/* Styled Components */
const Container = styled.div`
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Subtitle = styled.h3`
  margin-top: 16px;
  color: #666;
`;

const FormSection = styled.div`
  margin-top: 24px;
`;

const StyledInput = styled(Input.TextArea)`
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #d9d9d9;
  &:focus {
    border-color: #ee6123;
    box-shadow: 0 0 0 2px rgba(238, 97, 35, 0.2);
  }
`;

const StyledButton = styled(Button)`
  background-color: #ee6123 !important;
  color: white !important;
  border: none !important;
  margin-top: 10px;

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

const ResultSection = styled.div`
  margin-top: 24px;
  padding: 16px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ResultTitle = styled.h3`
  margin-bottom: 8px;
  color: #333;
`;

const ResultActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ResultInput = styled(Input)`
  flex-grow: 1;
  border-radius: 8px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #d9d9d9;
  &:focus {
    border-color: #ee6123;
    box-shadow: 0 0 0 2px rgba(238, 97, 35, 0.2);
  }
`;
