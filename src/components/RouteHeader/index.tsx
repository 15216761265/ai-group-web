import { useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Divider, Avatar, Dropdown } from "antd";
import type { MenuProps } from "antd";
import "./index.css";

const HeaderMap = {
  home: "Home",
  chat: "Chat",
  paint: "Paint",
};

const RouteHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const getTitle = useCallback(() => {
    const route = pathname.split("/");
    return HeaderMap[route[route.length - 1]] || "Home";
  }, [pathname]);

  const avatarMenu: MenuProps["items"] = [
    {
      key: "i",
      label: (
        <Link to={"/home"} className="ai-router-title">
          返回首页
        </Link>
      ),
    },
  ];

  return (
    <div className="ai-group-common-header">
      <div className="ai-group-common-header-content">
        <div className="title">{getTitle()}</div>
        <div>
          <Dropdown menu={{ items: avatarMenu }}>
            <div>
              <Avatar style={{ backgroundColor: "#1677ff" }}>Icon</Avatar>
              <div>青山相待</div>
            </div>
          </Dropdown>
        </div>
      </div>

      <Divider className="my-4"></Divider>
    </div>
  );
};

export default RouteHeader;
