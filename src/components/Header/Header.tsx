import { Layout, MenuProps, Menu } from "antd";
import "./Header.scss";

const { Header: HeaderAntd } = Layout;

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "Home",
  },
  {
    key: "2",
    label: "About",
  },
];

const Header = () => {
  return (
    <HeaderAntd
      className="header-wrapper"
      style={{ display: "flex", alignItems: "center" }}
    >
      <div className="demo-logo" />
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={items}
        style={{ flex: 1, minWidth: 0, border: "none" }}
      />
    </HeaderAntd>
  );
};

export default Header;
