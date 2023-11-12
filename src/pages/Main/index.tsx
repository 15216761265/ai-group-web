import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import LoginPage from "@pages/Login";
import NavBar, { UserItems } from "@pages/NavBar";
import "./index.css";
import HomePage from "@pages/Home";
import ChatPage from "@pages/Chat";
import PaintPage from "@pages/Paint";
import ConsoleMyApp from "@pages/ConsoleMyApp";
import ConsoleLibrary from "@pages/ConsoleLibrary";
import Integration from "@pages/ConsoleInte";
import MyAccount from "@pages/ConsoleMyAccount";

const { Content } = Layout;

const Main = () => {
  return (
    <div className="ai-container grid grid-cols-4 gap-4">
      <div className="bg-aiGrey card">
        <NavBar></NavBar>
      </div>
      <Layout className="col-span-3 card">
        <Content className="overflow-auto">
          <Routes>
            <Route path="" element={<HomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
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
    </div>
  );
};

export default Main;
