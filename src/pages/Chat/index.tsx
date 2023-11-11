import RouteHeader from "@components/RouteHeader";
import { Avatar, Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import "@chatui/core/es/styles/index.less";
import Chat, { Bubble, useMessages } from "@chatui/core";
import "@chatui/core/dist/index.css";
import "./index.css";
import { LogoIcon } from "@components/Lib/Icon";
import showdown from "showdown";

//TODO: save the data status
const MockChatData = [
  {
    id: 1,
    code: "default",
    name: "通用智能助手",
    type: "PROMPT",
    description: "不知道找谁的时候就来找我吧，我能帮你解决任何问题。",
    prompt: "",
    headImageUrl:
      "https://bucket-1317903499.cos.ap-guangzhou.myqcloud.com/A09A31B544B74C78AAA810BFC199C514.png",
    displayOnAppSquare: "Y",
    introduction:
      "你好，我是你的个人助理，可以帮你完成 文案写作、代码编写、活动策划 等各种工作。 例如你可以问我：\n\n - [帮我写一篇用户登录模块的产品需求文档，以markdown的格式输出]\n - [帮我写一段深度优先搜索算法]\n\n同时我还可以帮你进行联网搜索、数学计算、访问网页，例如：\n\n - [介绍华为Mate 60手机]\n - [计算512的15次方除以5万] \n - [https://new.qq.com/rain/a/20231105A0134D00 这篇文章说了什么 ]",
    creatorId: 1,
    nickName: "LinkAI",
    groupId: 1,
    usageCount: 0,
    thumbCount: 14,
    collectCount: 9,
    dataSets: null,
    temperature: "0.6",
    similarity: "MIDDLE",
    replyStrategy: "REPLY",
    fixedReplyText: null,
    supportModelList: [
      {
        code: "LinkAI-3.5",
        name: null,
        tokensPerScore: 0,
        maxTokens: 2000,
        defaultTokens: null,
        default: true,
      },
      {
        code: "wenxin",
        name: null,
        tokensPerScore: 0,
        maxTokens: 2000,
        defaultTokens: null,
        default: false,
      },
      {
        code: "xunfei",
        name: null,
        tokensPerScore: 0,
        maxTokens: 2000,
        defaultTokens: null,
        default: false,
      },
      {
        code: "LinkAI-4-turbo",
        name: null,
        tokensPerScore: 0,
        maxTokens: 4000,
        defaultTokens: null,
        default: false,
      },
    ],
    knowledgeBaseCodes: null,
    similarityNumber: 0.0,
    knowledgeBaseSearchRow: null,
    thumb: false,
    collect: false,
    maxContextTurn: null,
    enableMultiAgent: null,
    displayThought: null,
    displayPlugin: null,
    maxThoughtTurns: null,
    appPluginsInfoVos: null,
    knowledgeSourcePreference: null,
  },
  {
    id: 1192,
    code: "midjourney",
    name: "Midjourney绘画",
    type: "IMAGE",
    description: "使用midjourney进行图片创作",
    prompt: "绘画",
    headImageUrl:
      "https://bucket-1317903499.cos.ap-guangzhou.myqcloud.com/7CDD1E81A83549A8A81BBDEAFB49C123.jpeg",
    displayOnAppSquare: "Y",
    introduction:
      "\uD83C\uDFA8 欢迎使用midjourney绘画  \n\n1. 给我发送描述即可作画，例如 [侠客对决,中国风,古城]\n2. 想要生成效果更好的图，可以前往 [提示词美化](https://chat.link-ai.tech/app/t1zdVNZ1)  应用\n3. 每次作图大约需要1分钟时间，每次消耗150积分，生成失败不扣费，放大操作免费   \n4. 不要携带敏感词汇哦，可能会导致作图失败",
    creatorId: 1,
    nickName: "LinkAI",
    groupId: 8,
    usageCount: 0,
    thumbCount: 15,
    collectCount: 6,
    dataSets: null,
    temperature: "0.7",
    similarity: "MIDDLE",
    replyStrategy: "REPLY",
    fixedReplyText: null,
    supportModelList: [
      {
        code: "LinkAI-3.5",
        name: null,
        tokensPerScore: 0,
        maxTokens: 2000,
        defaultTokens: null,
        default: true,
      },
      {
        code: "wenxin",
        name: null,
        tokensPerScore: 0,
        maxTokens: 2000,
        defaultTokens: null,
        default: false,
      },
      {
        code: "xunfei",
        name: null,
        tokensPerScore: 0,
        maxTokens: 2000,
        defaultTokens: null,
        default: false,
      },
      {
        code: "LinkAI-4-turbo",
        name: null,
        tokensPerScore: 0,
        maxTokens: 4000,
        defaultTokens: null,
        default: false,
      },
    ],
    knowledgeBaseCodes: null,
    similarityNumber: 0.0,
    knowledgeBaseSearchRow: null,
    thumb: false,
    collect: false,
    maxContextTurn: null,
    enableMultiAgent: null,
    displayThought: null,
    displayPlugin: null,
    maxThoughtTurns: null,
    appPluginsInfoVos: null,
    knowledgeSourcePreference: null,
  },
];

const ChatPage = () => {
  const { code } = useParams();
  const [activeKeys, setActiveKeys] = useState([code || MockChatData[0].code]);

  const getChatInfo = useCallback(() => {
    return MockChatData.find((item) => item.code === activeKeys[0]);
  }, [activeKeys]);

  const initialMessage = [
    {
      type: "text",
      content: { text: getChatInfo()?.introduction },
      user: {
        avatar: getChatInfo()?.headImageUrl,
      },
    },
    {
      type: "image",
      user: {
        avatar: getChatInfo()?.headImageUrl,
      },
      content: {
        picUrl: getChatInfo()?.headImageUrl,
      },
    },
  ];
  const { messages, appendMsg, setTyping } = useMessages(initialMessage);

  const getChatItems = useCallback(() => {
    return MockChatData.map((item) => {
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
  }, []);

  const handleSend = (type, val) => {
    if (type === "text" && val.trim()) {
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right",
        user: { avatar: <LogoIcon></LogoIcon> }, //TODO :to do recoil,login user info
      });

      setTyping(true);

      //TODO: express the prompt to api
      setTimeout(() => {
        appendMsg({
          type: "text",
          content: { text: "Bala bala" },
          user: { avatar: getChatInfo()?.headImageUrl },
        });
      }, 1000);
    }
  };

  const renderMessageContent = (msg) => {
    const { content, type } = msg;
    const convert = new showdown.Converter();
    if (type === "text") {
      const children = convert.makeHtml(content.text);
      console.log("chat content.text", content.text);
      console.log("chat content", children);
      return <Bubble type="text" content={content.text}></Bubble>;
    } else if (type === "image") {
      return (
        <Bubble type="image">
          <img src={content.picUrl}></img>
        </Bubble>
      );
    }
    return <Bubble content={content} />;
  };

  return (
    <div>
      <RouteHeader></RouteHeader>
      <div className="ai-group-chat-content">
        <Layout>
          <Sider className="" theme="light">
            <Menu
              items={getChatItems()}
              selectedKeys={activeKeys}
              onSelect={({ selectedKeys }) => setActiveKeys(selectedKeys)}
            ></Menu>
          </Sider>
          <Content>
            <Chat
              navbar={{ title: getChatInfo()?.name || "智能助理" }}
              messages={messages}
              renderMessageContent={renderMessageContent}
              onSend={handleSend}
            />
          </Content>
        </Layout>
      </div>
    </div>
  );
};

export default ChatPage;
