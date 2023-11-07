import { Button, Form, Input, Modal, Tabs } from "antd";
import { useState } from "react";
import { LogoIcon } from "@components/Lib/Icon";
import "./index.css";

const { Item } = Form;

const LoginPage = () => {
  const loginForm = Form.useForm();
  const registerForm = Form.useForm();
  const [open, setOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  return (
    <Modal
      open={open}
      title={
        <div className="ai-group-login-modal">
          <LogoIcon />
          <div className="ai-group-login-modal-title">
            {isLogin ? "注册AI Group账号" : "欢迎使用AI Group"}
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
      {isLogin ? (
        <div className="mb-2">
          <Form form={registerForm[0]} layout="vertical">
            <Item name="registerPhone" label="手机号" required>
              <Input placeholder="请输入手机号" />
            </Item>
            <Item name="registerpwd" label="密码" required>
              <Input placeholder="请输入密码" />
            </Item>
            <div className="grid grid-cols-3 gap-1 pb-6">
              <Item
                name="registerVerify"
                label="验证码"
                required
                className="col-span-2 mb-0"
              >
                <Input placeholder="请输入密码" />
              </Item>

              <Button type="primary" className="ai-primary-button self-end">
                获取验证码
              </Button>
            </div>
          </Form>
          <Button type="primary" className="ai-primary-button">
            登录
          </Button>
        </div>
      ) : (
        <Tabs
          defaultActiveKey="wechat"
          type="card"
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
                    <Item name="loginPhone" label="手机号" required>
                      <Input placeholder="请输入手机号" />
                    </Item>
                    <Item name="loginpwd" label="密码" required>
                      <Input placeholder="请输入密码" />
                    </Item>
                  </Form>
                  <Button type="primary" className="ai-primary-button">
                    登录
                  </Button>
                </div>
              ),
            },
          ]}
          onChange={(activeKey) => {
            console.log("====activeKey onchange tab", activeKey);
          }}
        ></Tabs>
      )}
      <div>
        {!isLogin ? (
          <div className="flex justify-between">
            <div>
              <span className="text-[#a9a7ac]">没有账号？</span>
              <span
                className="text-aiBlue cursor-pointer"
                onClick={() => setIsLogin(!isLogin)}
              >
                立即注册
              </span>
            </div>
            <div className="text-aiBlue cursor-pointer" onClick={() => {}}>
              忘记密码
            </div>
          </div>
        ) : (
          <>
            <span className="text-[#a9a7ac]">已有账号，</span>
            <span
              className="text-aiBlue cursor-pointer"
              onClick={() => setIsLogin(!isLogin)}
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
