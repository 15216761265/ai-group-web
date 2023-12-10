import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import NavBar, { UserItems } from "@pages/NavBar";
import "./index.css";
import React, { useEffect, useState } from "react";
import { getCookies } from "@utils/index";
import VoiceRecoginition from "@pages/Recoginition";
import loadable from "@loadable/component";

const LoginPage = loadable(() => import("@pages/Login"));
const HomePage = loadable(() => import("@pages/Home"));
const ChatPage = loadable(() => import("@pages/Chat"));
const PaintPage = loadable(() => import("@pages/Paint"));
const ConsoleMyApp = loadable(() => import("@pages/ConsoleMyApp"));
const ConsoleLibrary = loadable(() => import("@pages/ConsoleLibrary"));
const Integration = loadable(() => import("@pages/ConsoleInte"));
const MyAccount = loadable(() => import("@pages/ConsoleMyAccount"));

const { Content } = Layout;

const Main = () => {
  const [isShouldShowLoginPage, setIsShouldShowLoginPage] = useState(true);
  const token = getCookies("userToken");

  useEffect(() => {
    if (token) {
      setIsShouldShowLoginPage(false);
    }
  }, [token]);

  return (
    <div className="ai-container grid grid-cols-4 gap-4">
      <div className="bg-aiGrey card">
        <NavBar />
      </div>
      <Layout className="col-span-3 card">
        <Content className="overflow-auto">
          <Routes>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/recognition" element={<VoiceRecoginition />}></Route>
            <Route path="/" element={<HomePage />}></Route>
            <Route path={UserItems.HOME} element={<HomePage />}></Route>
            <Route
              path={`${UserItems.CHAT}/:code?`}
              element={<ChatPage />}
            ></Route>
            <Route path={UserItems.PAINT} element={<PaintPage />}></Route>
            <Route path="/console">
              <Route path="myapp" element={<ConsoleMyApp />}></Route>
              <Route
                path="library"
                element={<ConsoleLibrary></ConsoleLibrary>}
              ></Route>
              <Route
                path="appinte"
                element={<Integration></Integration>}
              ></Route>
              <Route path="myaccount" element={<MyAccount></MyAccount>}></Route>
            </Route>
          </Routes>
        </Content>
      </Layout>
      {isShouldShowLoginPage && <LoginPage />}
    </div>
  );
};

export default Main;
