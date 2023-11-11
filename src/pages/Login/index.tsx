import { Button, Form, Input, Modal, Tabs } from "antd";
import { useState } from "react";
import { LogoIcon } from "@components/Lib/Icon";
import "./index.css";
import {
  usePostForget,
  usePostLoginByPhoneNumber,
  usePostRegister,
} from "@apis/apiHooks/Login";

const { Item } = Form;

enum LoginStatus {
  LOGIN = "login",
  REGISTER = "register",
  FORGRT = "Forget",
}

const LoginPage = () => {
  const loginForm = Form.useForm();
  const registerForm = Form.useForm();
  const forgetForm = Form.useForm();
  const [open, setOpen] = useState(true);
  const [activeStatus, setActiveStatus] = useState(LoginStatus.LOGIN);
  const [activeTab, setActiveTab] = useState("wechat");

  const postLoginByPhoneNumber = usePostLoginByPhoneNumber();
  const postRegister = usePostRegister();
  const postForget = usePostForget();

  const handleLogin = async () => {
    try {
      await loginForm[0].validateFields();
      const loginData = loginForm[0].getFieldsValue();
      console.log("Login date", loginData);
      // const result = await postLoginByPhoneNumber({
      //   data: {
      //     password: loginData.loginpwd,
      //     telephone: loginData.loginPhone,
      //   },
      // });
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async () => {
    try {
      await registerForm[0].validateFields();
      const registerData = registerForm[0].getFieldsValue();
      console.log("register data", registerData);
      // const result = await postRegister({
      //   data: {
      //     password: registerData.registerPwd,
      //     telephone: registerData.registerPhone,
      //     authCode: registerData.registerVerify,
      //     inviteCode: registerData.inviteCode,
      //   },
      // });
    } catch (error) {
      console.error(error);
    }
  };

  const handleForget = async () => {
    try {
      await forgetForm[0].validateFields();
      const forgetData = forgetForm[0].getFieldsValue();
      console.log("forget data", forgetData);
      // const result = await postForget({
      //   data: {
      //     password: forgetData.registerPwd,
      //     telephone: forgetData.registerPhone,
      //     authCode: forgetData.registerVerify,
      //   },
      // });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      open={open}
      title={
        <div className="ai-group-login-modal">
          <LogoIcon />
          <div className="ai-group-login-modal-title">
            {activeStatus === LoginStatus.LOGIN ? (
              "欢迎使用AI Group"
            ) : (
              <>
                {activeStatus === LoginStatus.REGISTER
                  ? "注册AI Group账号"
                  : "忘记密码"}
              </>
            )}
          </div>
        </div>
      }
      closeIcon={false}
      maskClosable={true}
      onCancel={() => {
        setOpen(false);
      }}
      footer={false}
      destroyOnClose
    >
      {activeStatus === LoginStatus.REGISTER && (
        <div className="mb-2">
          <Form form={registerForm[0]} layout="vertical">
            <Item
              name="registerPhone"
              label="手机号"
              rules={[{ required: true, message: "请输入手机号" }]}
            >
              <Input placeholder="请输入手机号" />
            </Item>
            <Item
              name="registerPwd"
              label="密码"
              rules={[{ required: true, message: "请输入密码" }]}
            >
              <Input placeholder="请输入密码" />
            </Item>
            <div className="grid grid-cols-3 gap-1 pb-6">
              <Item
                name="registerVerify"
                label="验证码"
                rules={[{ required: true, message: "请输入验证码" }]}
                className="col-span-2 mb-0"
              >
                <Input placeholder="请输入验证码" />
              </Item>

              <Button type="primary" className="ai-primary-button self-end">
                获取验证码
              </Button>
            </div>
            <Item name="inviteCode" label="邀请码">
              <Input placeholder="请输入邀请码"></Input>
            </Item>
          </Form>
          <Button
            type="primary"
            className="ai-primary-button"
            onClick={handleRegister}
            htmlType="submit"
          >
            注册
          </Button>
        </div>
      )}

      {activeStatus === LoginStatus.LOGIN && (
        <Tabs
          defaultActiveKey="wechat"
          type="card"
          activeKey={activeTab}
          items={[
            {
              label: "微信登录",
              key: "wechat",
              children: <div className="mb-2"></div>,
            },
            {
              label: "手机号登录",
              key: "phone",
              children: (
                <div className="mb-2">
                  <Form form={loginForm[0]} layout="vertical">
                    <Item
                      name="loginPhone"
                      label="手机号"
                      rules={[{ required: true, message: "请输入手机号" }]}
                    >
                      <Input placeholder="请输入手机号" />
                    </Item>
                    <Item
                      name="loginpwd"
                      label="密码"
                      rules={[{ required: true, message: "请输入密码" }]}
                    >
                      <Input placeholder="请输入密码" />
                    </Item>
                  </Form>
                  <Button
                    type="primary"
                    className="ai-primary-button"
                    onClick={handleLogin}
                    htmlType="submit"
                  >
                    登录
                  </Button>
                </div>
              ),
            },
          ]}
          onChange={(activeKey) => setActiveTab(activeKey)}
        ></Tabs>
      )}

      {activeStatus === LoginStatus.FORGRT && (
        <div className="mb-2">
          <Form form={forgetForm[0]} layout="vertical">
            <Item
              name="registerPhone"
              label="手机号"
              rules={[{ required: true, message: "请输入手机号" }]}
            >
              <Input placeholder="请输入手机号" />
            </Item>
            <Item
              name="registerpwd"
              label="新密码"
              rules={[{ required: true, message: "请输入新密码" }]}
            >
              <Input placeholder="请输入新密码" />
            </Item>
            <div className="grid grid-cols-3 gap-1 pb-6">
              <Item
                name="registerVerify"
                label="验证码"
                rules={[{ required: true, message: "请输入验证码" }]}
                className="col-span-2 mb-0"
              >
                <Input placeholder="请输入验证码" />
              </Item>

              <Button type="primary" className="ai-primary-button self-end">
                获取验证码
              </Button>
            </div>
          </Form>
          <Button
            type="primary"
            className="ai-primary-button"
            onClick={handleForget}
            htmlType="submit"
          >
            更新
          </Button>
        </div>
      )}
      <div>
        {activeStatus === LoginStatus.LOGIN ? (
          <div className="flex justify-between">
            <div>
              <span className="text-[#a9a7ac]">没有账号？</span>
              <span
                className="text-aiBlue cursor-pointer"
                onClick={() => setActiveStatus(LoginStatus.REGISTER)}
              >
                立即注册
              </span>
            </div>
            <div
              className="text-aiBlue cursor-pointer"
              onClick={() => setActiveStatus(LoginStatus.FORGRT)}
            >
              忘记密码
            </div>
          </div>
        ) : (
          <>
            <span className="text-[#a9a7ac]">已有账号，</span>
            <span
              className="text-aiBlue cursor-pointer"
              onClick={() => setActiveStatus(LoginStatus.LOGIN)}
            >
              立即登录
            </span>
          </>
        )}
      </div>
    </Modal>
  );
};

export default LoginPage;
