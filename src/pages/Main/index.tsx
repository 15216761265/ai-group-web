import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import LoginPage from "@pages/Login";
import NavBar, { UserItems, CreateItems } from "@pages/NavBar";
import "./index.css";

const { Content } = Layout;

const Main = () => {
  return (
    <div className="ai-container grid grid-cols-4 gap-4">
      <div className="bg-aiGrey card">
        <NavBar></NavBar>
      </div>
      <Layout className="col-span-3 card">
        <Content>
          <Routes>
            <Route path="" element={<LoginPage />}></Route>
            <Route path="/home" element={<LoginPage />}></Route>
            <Route path={"/" + UserItems.CHAT} element={<LoginPage />}></Route>
            <Route path={"/" + UserItems.PAINT} element={<LoginPage />}></Route>
            <Route path="/console">
              <Route
                path={CreateItems.MYAPP}
                element={<LoginPage></LoginPage>}
              ></Route>
              <Route
                path={CreateItems.LIBRARY}
                element={<LoginPage></LoginPage>}
              ></Route>
              <Route
                path={CreateItems.APPINTEGRATION}
                element={<LoginPage></LoginPage>}
              ></Route>
              <Route
                path={CreateItems.MYACCOUNT}
                element={<LoginPage></LoginPage>}
              ></Route>
            </Route>
          </Routes>
        </Content>
      </Layout>
    </div>
  );
};

export default Main;
