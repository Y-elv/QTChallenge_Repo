import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import BaseUrl from "../utils/config";

interface StatCardProps {
  title: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
  <StatContainer>
    <h3>{title}</h3>
    <p>{value}</p>
  </StatContainer>
);

const fetchTotalClicks = async (): Promise<number> => {
  const token = localStorage.getItem("token"); // Retrieve token from localStorage

  const response: any = await axios.get(`${BaseUrl}/urls`, {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch total clicks");
  }

  const urlCount = response.data.data.length;
  console.log("urlCount", urlCount); // Log the data to the console) // Count the number of URLs
  return urlCount;
};

const fetchUniqueVisitors = async (): Promise<number> => {
  // Replace with actual API call
  const response = await fetch("/api/unique-visitors");
  const data = await response.json();
  return data.uniqueVisitors;
};

const fetchActiveLinks = async (): Promise<number> => {
  // Replace with actual API call
  const response = await fetch("/api/active-links");
  const data = await response.json();
  return data.activeLinks;
};

const AnalyticsContent: React.FC = () => {
  const [totalClicks, setTotalClicks] = useState(0);
  const [uniqueVisitors, setUniqueVisitors] = useState(0);
  const [activeLinks, setActiveLinks] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clicks = await fetchTotalClicks();
        console.log("Total Clicks: ", clicks);
        setTotalClicks(clicks);

        const visitors = await fetchUniqueVisitors();
        console.log("Unique Visitors: ", visitors);
        setUniqueVisitors(visitors);

        const links = await fetchActiveLinks();
        console.log("Active Links: ", links);
        setActiveLinks(links);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        toast.error("Failed to fetch analytics data", {
          position: "top-right",
        });
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <h2>Link Analytics</h2>
      <p>Track the performance of your shortened links:</p>
      <div style={{ marginTop: "24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
          }}
        >
          <StatCard title="Total Links" value={totalClicks} />
          <StatCard title="Unique Visitors" value={uniqueVisitors} />
          <StatCard title="Active Links" value={activeLinks} />
        </div>
        <div
          style={{
            marginTop: "25px",
            height: "270px",
            background: "#f9f9f9",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>Click data visualization would appear here</p>
        </div>
      </div>
    </Container>
  );
};

export default AnalyticsContent;

/* Styled Components */

const Container = styled.div`
  padding: 18px;
  height: 78vh;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const StatContainer = styled.div`
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin: 8px 0;

  h3 {
    margin: 0;
    font-size: 14px;
    color: #666;
  }

  p {
    margin: 8px 0 0 0;
    font-size: 24px;
    font-weight: bold;
  }
`;
