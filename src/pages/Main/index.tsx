import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import LoginPage from "@pages/Login";
import NavBar, { UserItems, CreateItems } from "@pages/NavBar";
import "./index.css";
import HomePage from "@pages/Home";
import ChatPage from "@pages/Chat";
import PaintPage from "@pages/Paint";

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
              <Route path="myapp" element={<LoginPage></LoginPage>}></Route>
              <Route path="library" element={<LoginPage></LoginPage>}></Route>
              <Route path="appinte" element={<LoginPage></LoginPage>}></Route>
              <Route path="myaccount" element={<LoginPage></LoginPage>}></Route>
            </Route>
          </Routes>
        </Content>
      </Layout>
    </div>
  );
};

export default Main;
