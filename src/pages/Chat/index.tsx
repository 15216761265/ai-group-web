import React, { useCallback, useEffect, useMemo, useState } from "react";
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
        content: { text: getChatInfo?.introduction || "快来跟我对话吧！" },
        user: {
          avatar: getChatInfo?.headImageUrl,
        },
      },
    ];
  }, [getChatInfo]);

  const initialImageMessage = useMemo(() => {
    return [
      {
        type: "image",
        content: {
          picUrl:
            "https://midjourney.cdn.zhishuyun.com/attachments/1124768570157564029/1182996417275498566/lienpanya7723_nihao_id1241344_5fa32ecc-df83-48cc-b94f-7ec95153a0d0.png?ex=6586ba44&is=65744544&hm=4012407a4f98b12639d6c92e9d9d7d3fe2515661a6aab44a824db28beffd26b6&width=1024&height=1024",
        },
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
    if (!code && userSelectedModals.length) {
      setActiveKeys(userSelectedModals[0].code);
    }
  }, [code, userSelectedModals]);

  useEffect(() => {
    if (!userSelectedModals.length) {
      openWarningMessage("Please select a model!");
      navigate("/home");
    } else {
      const initialChat = userSelectedModals.map((modals, index) => {
        const initialChatMess = [
          {
            type: "text",
            content: { text: modals?.introduction || "快来跟我对话吧！" },
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
            {/* modals.type === "IMAGE" ? initialImageMessage : */}
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
