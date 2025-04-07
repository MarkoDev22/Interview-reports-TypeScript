import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import userStore from "../store/userStore";

const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = (e: any) => {
    if (e.key === "logout") {
      userStore.logout();
      navigate("/login");
    } else {
      navigate(e.key);
    }
  };

  return (
    <Menu
      onClick={handleClick}
      mode="horizontal"
      selectedKeys={[]}
      style={{ display: "flex", justifyContent: "start" }}
    >
      <Menu.Item key="/reports">Izveštaji</Menu.Item>
      <Menu.Item key="/candidates">Kandidati</Menu.Item>
      <Menu.Item key="/companies">Kompanije</Menu.Item>
      <Menu.Item key="logout" style={{ marginLeft: "auto" }}>
        Logout
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
