import React from "react";
import styled from "styled-components";

interface NotificationItemProps {
  read: boolean;
  title: string;
  message: string;
  time: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  read,
  title,
  message,
  time,
}) => (
  <NotificationContainer read={read}>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h3>{title}</h3>
      <span>{time}</span>
    </div>
    <p>{message}</p>
  </NotificationContainer>
);

const NotificationContent: React.FC = () => (
  <Container>
    <h2>Notifications</h2>
    <p>Stay updated with the latest alerts and information:</p>
    <div style={{ marginTop: "20px" }}>
      {[
        {
          id: 1,
          title: "Link milestone reached",
          message: "Your business link has reached 1,000 clicks!",
          time: "2 hours ago",
          read: false,
        },
        {
          id: 2,
          title: "Weekly report available",
          message: "Your weekly analytics report is now available.",
          time: "1 day ago",
          read: true,
        },
        {
          id: 3,
          title: "Security alert",
          message: "New login detected from London, UK.",
          time: "2 days ago",
          read: true,
        },
      ].map((notification) => (
        <NotificationItem
          key={notification.id}
          read={notification.read}
          title={notification.title}
          message={notification.message}
          time={notification.time}
        />
      ))}
    </div>
  </Container>
);

export default NotificationContent;

/* Styled Components */

const Container = styled.div`
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const NotificationContainer = styled.div<{ read: boolean }>`
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 12px;
  background: ${(props) => (props.read ? "white" : "#f0f7ff")};
  border: 1px solid #eee;

  h3 {
    margin: 0;
    font-size: 16px;
  }

  span {
    font-size: 12px;
    color: #666;
  }

  p {
    margin: 8px 0 0 0;
    color: #333;
  }
`;
