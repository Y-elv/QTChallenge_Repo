import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, Tooltip } from "antd";
import { MdOutlineAdd } from "react-icons/md";
import { SiSimpleanalytics } from "react-icons/si";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import styled from "styled-components";

const { Header, Sider, Content } = Layout;

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <LayoutContainer>
      {/* Sidebar */}
      <Sidebar trigger={null} collapsible collapsed={collapsed}>
        <Logo collapsed={collapsed}>{collapsed ? "B" : "Bitly"}</Logo>

        <MenuContainer>
          <MenuItem collapsed={collapsed} label="Create New">
            <MdOutlineAdd size={20} />
          </MenuItem>

          <MenuItem collapsed={collapsed} label="Analytics">
            <SiSimpleanalytics size={20} />
          </MenuItem>

          <MenuItem collapsed={collapsed} label="Notification">
            <IoMdNotificationsOutline size={20} />
          </MenuItem>

          <MenuItem collapsed={collapsed} label="Settings">
            <CiSettings size={20} />
          </MenuItem>
        </MenuContainer>
      </Sidebar>

      {/* Main Content */}
      <MainLayout>
        <HeaderContainer>
          <ToggleButton
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </HeaderContainer>
        <ContentContainer>Content</ContentContainer>
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

const MenuItem = styled(({ collapsed, label, children, ...props }) => (
  <Tooltip title={collapsed ? label : ""} placement="right">
    <div {...props}>
      <IconWrapper>{children}</IconWrapper>
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

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: #262626;
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
  padding: 0;
  background: white;
`;

const ToggleButton = styled(Button)`
  font-size: 16px;
  width: 64px;
  height: 64px;
`;

const ContentContainer = styled(Content)`
  margin: 24px 16px;
  padding: 24px;
  min-height: 280px;
  background: white;
  border-radius: 12px;
`;
