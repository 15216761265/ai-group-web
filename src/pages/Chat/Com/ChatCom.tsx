import "@chatui/core/es/styles/index.less";
import Chat, { Bubble, useMessages } from "@chatui/core";
import "@chatui/core/dist/index.css";
import { IHomeRoleList } from "@modals/HomeRoleList";
import { LogoIcon } from "@components/Lib/Icon";
import showdown from "showdown";
import "./chatui-theme.css";

const ChatCom: React.FC<{
  initialMessage: any;
  chatInfo?: IHomeRoleList;
}> = ({ initialMessage, chatInfo }) => {
  const { messages, appendMsg, setTyping, updateMsg } =
    useMessages(initialMessage);

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
          user: { avatar: chatInfo?.headImageUrl },
        });
      }, 1000);
    }
  };

  const renderMessageContent = (msg) => {
    const { content, type } = msg;
    const convert = new showdown.Converter();
    if (type === "text") {
      const children = convert.makeHtml(content.text);
      // console.log("chat content.text", content.text);
      // console.log("chat content", children);
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
    <div className="h-full">
      <Chat
        navbar={{ title: chatInfo?.name || "智能助理" }}
        messages={messages}
        renderMessageContent={renderMessageContent}
        onSend={handleSend}
      />
    </div>
  );
};

export default ChatCom;
