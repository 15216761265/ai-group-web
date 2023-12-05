import "@chatui/core/es/styles/index.less";
import Chat, { Bubble, useMessages } from "@chatui/core";
import "@chatui/core/dist/index.css";
import { IHomeRoleList } from "@modals/HomeRoleList";
import showdown from "showdown";
import { useGetChatStream, usePostGenerateImage } from "@apis/apiHooks/Chat";
import "./chatui-theme.css";
import { useCallback } from "react";
import { openErrorMessage } from "@components/CommonTip";
import { Avatar } from "antd";
import CustomizeComposer from "./Composer";
import { DownCircleOutlined } from "@ant-design/icons";

const ChatCom: React.FC<{
  initialMessage: any;
  chatInfo: IHomeRoleList;
}> = ({ initialMessage, chatInfo }) => {
  const { messages, appendMsg, setTyping, updateMsg } =
    useMessages(initialMessage);

  const getChatResponseInfo = useGetChatStream();
  const postGenerateImage = usePostGenerateImage();

  const handleGetChatInfo = useCallback(
    async (prompt: string) => {
      try {
        const chatInfoResponse = await getChatResponseInfo({
          params: {
            appCode: chatInfo.code,
            model: "a",
            plugins: "a",
            prompt: prompt.trim(),
          },
        });
        const result = chatInfoResponse.data as unknown as string;

        const jsonString = result.substring("data:".length, result.length - 2);
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
    },
    [
      appendMsg,
      chatInfo.code,
      chatInfo.headImageUrl,
      getChatResponseInfo,
      setTyping,
    ]
  );

  const handleGetImage = useCallback(
    async (prompt: string) => {
      try {
        const result = await postGenerateImage({ data: { prompt } }); //to get task id
        console.log(11111, result);
        //TODO： 一个轮询
      } catch (error) {
        //TODO
      } finally {
        setTyping(false);
      }
    },
    [postGenerateImage, setTyping]
  );

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
        // if (chatInfo.type !== "IMAGE") {
        await handleGetChatInfo(val);
        //TODO：wait to integrate the image ,think think
        // } else {
        //   await handleGetImage(val);
        // }
      }
    },
    [appendMsg, handleGetChatInfo, setTyping]
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
          <DownCircleOutlined />
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
