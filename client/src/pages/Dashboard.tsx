import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, Tooltip, Input, Dropdown } from "antd";
import { MdOutlineAdd } from "react-icons/md";
import { SiSimpleanalytics } from "react-icons/si";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { CloseOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Header, Sider, Content } = Layout;
const { Search } = Input;

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Mock user data
  const userData = {
    firstName: "M",
    fullName: "MUGISHA ELVIS",
  };

  // Dropdown menu items
  const dropdownItems = [
    { key: "1", label: "Profile" },
    { key: "2", label: "Settings" },
    { key: "3", label: "Logout" },
  ];

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
              menu={{ items: dropdownItems }}
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
  background-color: #031f39;
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
    padding: 10px;
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

// Updated Header components with 3-part layout
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
  height: 48px;
 
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

const UpgradeButton = styled(Button).attrs({
  type: "primary",
})`
  background-color: #0077b6;
  border: none;
  height: 36px;
  border-radius: 6px;
  font-weight: 500;
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
