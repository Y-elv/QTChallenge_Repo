import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Layout, Button, Tooltip, Input, Dropdown } from "antd";
import { MdOutlineAdd } from "react-icons/md";
import { SiSimpleanalytics } from "react-icons/si";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import styled from "styled-components";
import BaseUrl from "../utils/config";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import CreateContent from "../components/CreateContent"; 
import AnalyticsContent from "../components/AnalyticsContent"; 
import NotificationContent from "../components/NotificationContent"; 
import SettingsContent from "../components/SettingsContent"; 

const { Header, Sider, Content } = Layout;

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Define the type for the decoded token
  interface DecodedToken {
    username?: string; // Ensure it matches the actual token structure
    exp?: number; // Token expiration (optional)
  }

  // Function to get user data from token
  const getUserFromToken = (): DecodedToken | null => {
    const token = localStorage.getItem("token");

    if (!token) return null;

    try {
      const decoded: DecodedToken = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };

  // Get user details from token
  const userFromToken = getUserFromToken();

  // Function to capitalize the full name
  const capitalizeFullName = (text?: string): string | undefined => {
    return text
      ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
      : undefined;
  };

  // Extract and transform user data
  const userData = {
    firstName: userFromToken?.username
      ? userFromToken.username.charAt(0).toUpperCase()
      : undefined,
    fullName: capitalizeFullName(userFromToken?.username),
  };

  console.log("User Data:", userData);

  const handleLogout = async () => {
    try {
      console.log("Attempting logout...");

      // Get the token from localStorage
      const token = localStorage.getItem("token");

      // Set up the request with the Authorization header
      const response = await axios.post(
        `${BaseUrl}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Logout successful", response);
        localStorage.removeItem("token"); // Clear the token from localStorage

        toast.success("Logout successful! Redirecting...", {
          position: "top-right",
        });

        setTimeout(() => {
          navigate("/");
        }, 3000); // 3 seconds delay
      }
    } catch (error) {
      console.error("Logout Error:", error);

      // Even if the request fails, we might want to log the user out locally
      localStorage.removeItem("token");

      toast.error(
        "Logout process encountered an issue, but you've been logged out locally.",
        {
          position: "top-right",
        }
      );

      navigate("/"); // Navigate to the root path anyway
    }
  };

  // Then use it in your dropdown items array
  const dropdownItems = [
    { key: "1", label: "Profile" },
    { key: "2", label: "Settings" },
    { key: "3", label: "Logout", onClick: () => handleLogout() },
  ];

  // Menu items configuration
  const menuItems = [
    {
      key: "create",
      label: "Create New",
      icon: <MdOutlineAdd size={20} />,
      path: "/dashboard/create",
    },
    {
      key: "analytics",
      label: "Analytics",
      icon: <SiSimpleanalytics size={20} />,
      path: "/dashboard/analytics",
    },
    {
      key: "notification",
      label: "Notification",
      icon: <IoMdNotificationsOutline size={20} />,
      path: "/dashboard/notification",
    },
    {
      key: "settings",
      label: "Settings",
      icon: <CiSettings size={20} />,
      path: "/dashboard/settings",
    },
  ];

  // Check which menu item is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Handle menu item click
  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  // Redirect to create page if on root dashboard path
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      navigate("/dashboard/create", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <LayoutContainer>
      {/* Sidebar */}
      <Sidebar trigger={null} collapsible collapsed={collapsed}>
        <Logo collapsed={collapsed}>{collapsed ? "B" : "Bitly"}</Logo>

        <MenuContainer>
          {menuItems.map((item) => (
            <MenuItem
              key={item.key}
              collapsed={collapsed}
              label={item.label}
              active={isActive(item.path)}
              onClick={() => handleMenuClick(item.path)}
            >
              {item.icon}
            </MenuItem>
          ))}
        </MenuContainer>
      </Sidebar>

      {/* Main Content */}
      <MainLayout>
        <HeaderContainer>
          <LeftSection>
            <ToggleButton
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
          </LeftSection>

          {/* Centered Search */}
          <CenterSection>
            <SearchWrapper>
              <SearchInput
                placeholder="Search for something..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                bordered={false}
                prefix={<span className="search-icon">🔍</span>}
                suffix={
                  searchValue ? (
                    <CloseButton onClick={() => setSearchValue("")} />
                  ) : null
                }
                allowClear
              />
            </SearchWrapper>
          </CenterSection>

          <RightSection>
            <UpgradeButton>Upgrade</UpgradeButton>
            <QuestionIcon>
              <BsFillQuestionCircleFill size={24} />
            </QuestionIcon>
            <Dropdown
              menu={{
                items: dropdownItems.map((item) => ({
                  key: item.key,
                  label: item.label,
                  onClick: item.onClick,
                })),
              }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <UserSection>
                <UserAvatar>{userData.firstName}</UserAvatar>
                <UserName>{userData.fullName}</UserName>
                <IoMdArrowDropdown size={20} />
              </UserSection>
            </Dropdown>
          </RightSection>
        </HeaderContainer>

        {/* Dynamic Content Container */}
        <ContentContainer>
          <Routes>
            <Route path="/create" element={<CreateContent />} />
            <Route path="/analytics" element={<AnalyticsContent />} />
            <Route path="/notification" element={<NotificationContent />} />
            <Route path="/settings" element={<SettingsContent />} />
          </Routes>
        </ContentContainer>
      </MainLayout>
    </LayoutContainer>
  );
};

export default Dashboard;

/* Styled Components */

const LayoutContainer = styled(Layout)`
  height: 100vh;
`;

const Sidebar = styled(Sider)`
  background-color: #001529;
`;

const Logo = styled.div<{ collapsed: boolean }>`
  color: #ee6123;
  font-size: 24px;
  text-align: center;
  padding: 16px;
  font-family: "Lobster", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  ${({ collapsed }) =>
    collapsed &&
    `
    padding: 16px 0;
  `}
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const MenuItem = styled(({ collapsed, label, active, children, ...props }) => (
  <Tooltip title={collapsed ? label : ""} placement="right">
    <div {...props}>
      <IconWrapper active={active}>{children}</IconWrapper>
      {!collapsed && <Label>{label}</Label>}
    </div>
  </Tooltip>
))`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin: 8px 12px;
  cursor: pointer;
  color: white;
  font-size: 16px;
  transition: all 0.3s;
  position: relative;
  border-radius: 8px;
  background: ${(props) =>
    props.active ? "rgba(255, 255, 255, 0.1)" : "transparent"};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const IconWrapper = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${(props) => (props.active ? "#ee6123" : "#262626")};
  color: white;
  flex-shrink: 0;
`;

const Label = styled.span`
  flex-grow: 1;
`;

const MainLayout = styled(Layout)`
  background: #f5f5f5;
`;

const HeaderContainer = styled(Header)`
  padding: 0 16px;
  background: white;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const CenterSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
`;

const ToggleButton = styled(Button)`
  font-size: 16px;
  width: 64px;
  height: 45px;
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 300px;

  .search-icon {
    color: #999;
    margin-right: 8px;
  }
`;

const SearchInput = styled(Input)`
  background-color: #f5f5f5;
  border-radius: 8px;
  height: 36px;

  &.ant-input-affix-wrapper {
    padding: 8px;
  }

  .ant-input {
    background-color: transparent;
  }
`;

const CloseButton = styled(CloseOutlined)`
  color: #999;
  cursor: pointer;
  font-size: 12px;
`;

const UpgradeButton = styled(Button).attrs({})`
  background-color: #031f39;
  border: none;
  height: 36px;
  border-radius: 6px;
  font-weight: 500;
  color: white;

  &:hover {
    background-color: white;
    color: #031f39 !important;
    border: 2px solid #031f39 !important;
  }
`;

const QuestionIcon = styled.div`
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #333;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;

const UserName = styled.span`
  font-weight: 500;
`;

const ContentContainer = styled(Content)`
  margin: 24px 16px;
  padding: 24px;
  min-height: 280px;
  background: white;
  border-radius: 12px;
`;
