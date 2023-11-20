import { useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Divider, Avatar, Dropdown } from "antd";
import type { MenuProps } from "antd";
import "./index.css";
import { useRecoilValue } from "recoil";
import { LoginUsesInfo } from "@recoil/atoms/users";

const HeaderMap = {
  home: "Home",
  chat: "Chat",
  paint: "Paint",
  myapp: "我的应用",
  library: "知识库",
  appinte: "应用接入",
  myaccount: "我的账户",
};

const RouteHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const userInfo = useRecoilValue(LoginUsesInfo);

  const getTitle = useCallback(() => {
    const route = pathname.split("/");
    return HeaderMap[route[route.length - 1]] || "Home";
  }, [pathname]);

  const avatarMenu: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link to={"/home"} className="ai-router-title">
          返回首页
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to={"/console/myaccount"} className="ai-router-title">
          我的账户
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link to={"/home"} className="ai-router-title">
          每日签到
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <Link to={"/home"} className="ai-router-title">
          退出登录
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
            <div className="flex items-center">
              <Avatar style={{ backgroundColor: "#1677ff" }}>Icon</Avatar>
              <div className="ml-2">{userInfo?.name || "请登录"}</div>
            </div>
          </Dropdown>
        </div>
      </div>

      <Divider className="mt-0 mb-4"></Divider>
    </div>
  );
};

export default RouteHeader;
