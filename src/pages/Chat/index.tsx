import { useCallback, useEffect, useMemo, useState } from "react";
import RouteHeader from "@components/RouteHeader";
import { Avatar, Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { useParams } from "react-router-dom";
import "@chatui/core/es/styles/index.less";
import "./index.css";
import ChatCom from "./Com/ChatCom";
import { useRecoilValue } from "recoil";
import { UserSelectedModals } from "@recoil/atoms/modals";
import { openWarningMessage } from "@components/CommonTip";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

const ChatPage = () => {
  const navigate = useNavigate();
  const { code } = useParams();
  const userSelectedModals = useRecoilValue(UserSelectedModals);
  const [activeKeys, setActiveKeys] = useState(code || "");

  const [chatElements, setChatElements] = useState<JSX.Element[]>([]);

  const getChatInfo = useMemo(() => {
    return userSelectedModals.find((item) => item.code === activeKeys);
  }, [activeKeys, userSelectedModals]);

  const initialChatMessage = useMemo(() => {
    return [
      {
        type: "text",
        content: { text: getChatInfo?.introduction },
        user: {
          avatar: getChatInfo?.headImageUrl,
        },
      },
    ];
  }, [getChatInfo]);

  const getChatItemsList = useCallback(() => {
    return userSelectedModals.map((item) => {
      return {
        key: item.code,
        label: (
          <div className="flex items-center">
            <Avatar src={item.headImageUrl}></Avatar>
            <div className="ml-2">{item.name}</div>
          </div>
        ),
      };
    });
  }, [userSelectedModals]);

  const addChatCom = useCallback(() => {
    if (!getChatInfo) {
      return;
    }
    return (
      <ChatCom initialMessage={initialChatMessage} chatInfo={getChatInfo} />
    );
  }, [getChatInfo, initialChatMessage]);

  useEffect(() => {
    if (userSelectedModals.length) {
      setActiveKeys(userSelectedModals[0].code);
    }
  }, [userSelectedModals]);

  useEffect(() => {
    if (!userSelectedModals.length) {
      openWarningMessage("Please select a model!");
      navigate("/home");
    } else {
      const initialChat = userSelectedModals.map((modals, index) => {
        const initialChatMess = [
          {
            type: "text",
            content: { text: modals?.introduction },
            user: {
              avatar: modals?.headImageUrl,
            },
          },
        ];
        return (
          <div
            key={index}
            className={classNames(
              activeKeys === modals.code ? "block" : "hidden",
              "h-full"
            )}
          >
            <ChatCom initialMessage={initialChatMess} chatInfo={modals} />
          </div>
        );
      });
      setChatElements([...initialChat]);
    }
  }, [
    activeKeys,
    initialChatMessage,
    navigate,
    userSelectedModals,
    userSelectedModals.length,
  ]);

  return (
    <div>
      <RouteHeader></RouteHeader>
      <div className="ai-group-chat-content">
        <Layout>
          <Sider className="" theme="light">
            <Menu
              items={getChatItemsList()}
              selectedKeys={[activeKeys]}
              onSelect={({ selectedKeys }) => setActiveKeys(selectedKeys[0])}
            ></Menu>
          </Sider>
          {/* TODO: to update the user chat */}
          <Content>{chatElements.map((ele) => ele)}</Content>
        </Layout>
      </div>
    </div>
  );
};

export default ChatPage;
