import "@chatui/core/es/styles/index.less";
import Chat, { Bubble, useMessages } from "@chatui/core";
import "@chatui/core/dist/index.css";
import { IHomeRoleList } from "@modals/HomeRoleList";
import showdown from "showdown";
import { useGetChatStream } from "@apis/apiHooks/Chat";
import "./chatui-theme.css";
import { useCallback } from "react";
import { openErrorMessage } from "@components/CommonTip";
import { Avatar } from "antd";
import CustomizeComposer from "./Composer";

const ChatCom: React.FC<{
  initialMessage: any;
  chatInfo: IHomeRoleList;
}> = ({ initialMessage, chatInfo }) => {
  const { messages, appendMsg, setTyping, updateMsg } =
    useMessages(initialMessage);

  const getChatResponseInfo = useGetChatStream();

  const handleSend = useCallback(
    async (type, val) => {
      if (type === "text" && val.trim()) {
        appendMsg({
          type: "text",
          content: { text: val },
          position: "right",
          user: { avatar: <Avatar></Avatar> }, //TODO :to do recoil,login user info
        });

        setTyping(true);

        try {
          const chatInfoResponse = await getChatResponseInfo({
            params: {
              appCode: chatInfo.code,
              model: "a",
              plugins: "a",
              prompt: val.trim(),
            },
          });
          const result = chatInfoResponse.data as unknown as string;

          const jsonString = result.substring(
            "data:".length,
            result.length - 2
          );
          const jsonData = JSON.parse(jsonString);
          appendMsg({
            type: "text",
            content: { text: jsonData.data },
            user: { avatar: chatInfo.headImageUrl },
          });
        } catch (error) {
          openErrorMessage(error.message || "Something went wrong");
        } finally {
          setTyping(false);
        }
      }
    },
    [
      appendMsg,
      chatInfo.code,
      chatInfo.headImageUrl,
      getChatResponseInfo,
      setTyping,
    ]
  );

  const renderMessageContent = (msg) => {
    const { content, type } = msg;
    // const convert = new showdown.Converter();
    if (type === "text") {
      // const children = convert.makeHtml(content.text || "");
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
        Composer={() => CustomizeComposer(handleSend)}
      />
    </div>
  );
};

export default ChatCom;
