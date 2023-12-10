import React, { useCallback, useEffect, useState } from "react";
import { Menu, Divider } from "antd";
import {
  BackHomeIcon,
  ChatIcon,
  CreateIcon,
  DashboardIcon,
  HomeIcon,
  IntegrationIcon,
  LibraryIcon,
  LogoIcon,
  MyAccountIcon,
  PaintIcon,
} from "@components/Lib/Icon";
import { useLocation, Link } from "react-router-dom";
import logo from "@assets/logo-w.png";
import "./index.css";
// const logo = "https://shuchun.oss-cn-shanghai.aliyuncs.com/aigc/assets/images/logo-w.jpg";

export enum UserItems {
  HOME = "/home",
  CHAT = "/chat",
  PAINT = "/paint",
  CREATE = "/myapp",
  CREATETEXT = "/createtext",
  CREATEPIC = "/createpic",
}

export enum CreateItems {
  MYAPP = "/console/myapp",
  LIBRARY = "/console/library",
  APPINTEGRATION = "/console/appinte",
  MYACCOUNT = "/console/myaccount",
  GOBACK = "/home",
}

const userItems = [
  {
    title: "首页",
    label: (
      <Link to={UserItems.HOME} className="ai-router-title">
        首页
      </Link>
    ),
    icon: <HomeIcon />,
    key: UserItems.HOME,
  },
  {
    title: "对话",
    label: (
      <Link to={UserItems.CHAT} className="ai-router-title">
        对话
      </Link>
    ),
    icon: <ChatIcon />,
    key: UserItems.CHAT,
  },
  {
    title: "绘画",
    label: (
      <Link to={UserItems.PAINT} className="ai-router-title">
        绘画
      </Link>
    ),
    icon: <PaintIcon />,
    key: UserItems.PAINT,
  },
  {
    title: "创建",
    label: (
      <Link to={"/console" + UserItems.CREATE} className="ai-router-title">
        创建
      </Link>
    ),
    icon: <CreateIcon />,
    key: UserItems.CREATE,
  },
  // {
  //   title: "创建文案",
  //   label: (
  //     <Link to={UserItems.CREATETEXT} className="ai-router-title">
  //       创建文案
  //     </Link>
  //   ),
  //   icon: <CreateIcon />,
  //   key: UserItems.CREATETEXT,
  // },
  // {
  //   title: "修改图片",
  //   label: (
  //     <Link to={UserItems.CREATEPIC} className="ai-router-title">
  //       修改图片
  //     </Link>
  //   ),
  //   icon: <CreateIcon />,
  //   key: UserItems.CREATEPIC,
  // },
];

const createItems = [
  {
    title: "我的应用",
    label: (
      <Link to={CreateItems.MYAPP} className="ai-router-title">
        我的应用
      </Link>
    ),
    icon: <DashboardIcon />,
    key: CreateItems.MYAPP,
  },
  {
    title: "知识库",
    label: (
      <Link to={CreateItems.LIBRARY} className="ai-router-title">
        知识库
      </Link>
    ),
    icon: <LibraryIcon />,
    key: CreateItems.LIBRARY,
  },
  {
    title: "应用接入",
    label: (
      <Link to={CreateItems.APPINTEGRATION} className="ai-router-title">
        应用接入
      </Link>
    ),
    icon: <IntegrationIcon />,
    key: CreateItems.APPINTEGRATION,
  },
  {
    title: "我的账户",
    label: (
      <Link to={CreateItems.MYACCOUNT} className="ai-router-title">
        我的账户
      </Link>
    ),
    icon: <MyAccountIcon />,
    key: CreateItems.MYACCOUNT,
  },
  {
    title: "返回首页",
    label: (
      <Link to={CreateItems.GOBACK} className="ai-router-title">
        返回首页
      </Link>
    ),
    icon: <BackHomeIcon />,
    key: CreateItems.GOBACK,
  },
];

const NavBar = () => {
  const { pathname } = useLocation();
  const [selectedKeys, setSelectKeys] = useState<string[]>(["home"]);

  useEffect(() => {
    if (pathname.indexOf("/chat") !== -1) {
      setSelectKeys(["/chat"]);
    } else {
      setSelectKeys([pathname]);
    }
  }, [pathname]);

  const getNavBarMenuItems = useCallback(() => {
    return pathname.indexOf("console") !== -1 ? createItems : userItems;
  }, [pathname]);

  return (
    <div>
      <div className="flex items-center justify-center w-[80%]">
        <img src={logo} />
        {/* <div className="ml-3">AI Group</div> */}
      </div>
      <Divider className="my-4" />
      <Menu
        items={getNavBarMenuItems()}
        className="ai-antd-menu"
        selectedKeys={selectedKeys}
        onSelect={({ selectedKeys }) => setSelectKeys(selectedKeys)}
      ></Menu>
    </div>
  );
};

export default NavBar;
