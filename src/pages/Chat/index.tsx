import { useCallback, useMemo, useState } from "react";
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

const ChatPage = () => {
  //TODO: add router guard
  const { code } = useParams();
  const userSelectedModals = useRecoilValue(UserSelectedModals);
  const [activeKeys, setActiveKeys] = useState([
    code || (userSelectedModals.length && userSelectedModals[0].code),
  ]);

  const getChatInfo = useMemo(() => {
    return userSelectedModals.find((item) => item.code === activeKeys[0]);
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

  const getReChatCom = useCallback(() => {
    return (
      <ChatCom initialMessage={initialChatMessage} chatInfo={getChatInfo} />
    );
  }, [getChatInfo, initialChatMessage]);

  return (
    <div>
      <RouteHeader></RouteHeader>
      <div className="ai-group-chat-content">
        <Layout>
          <Sider className="" theme="light">
            <Menu
              items={getChatItemsList()}
              selectedKeys={activeKeys}
              onSelect={({ selectedKeys }) => setActiveKeys(selectedKeys)}
            ></Menu>
          </Sider>
          {/* TODO: to update the user chat */}
          <Content>{getReChatCom()}</Content>
        </Layout>
      </div>
    </div>
  );
};

export default ChatPage;
