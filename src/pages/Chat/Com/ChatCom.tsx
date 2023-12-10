import "@chatui/core/es/styles/index.less";
import Chat, { Bubble, useMessages } from "@chatui/core";
import "@chatui/core/dist/index.css";
import { IHomeRoleList } from "@modals/HomeRoleList";
import showdown from "showdown";
import {
  useGetChatStream,
  usePostGenerateImage,
  usePostMJTask,
} from "@apis/apiHooks/Chat";
import "./chatui-theme.css";
import React, { useCallback, useEffect, useState } from "react";
import { openErrorMessage } from "@components/CommonTip";
import { Avatar } from "antd";
import CustomizeComposer from "./Composer";
import { DownCircleOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { isEmpty } from "lodash-es";
import ApiConstants from "@apis/apiConstants";
import "./ChatCom.css";
import { handleDownloadImage } from "@utils/index";

const ChatCom: React.FC<{
  initialMessage: any;
  chatInfo: IHomeRoleList;
}> = ({ initialMessage, chatInfo }) => {
  const { messages, appendMsg, setTyping, updateMsg } =
    useMessages(initialMessage);

  const [taskID, setTaskID] = useState<string | undefined>();
  const [imageStatus, setImageStatus] = useState("");

  const getChatResponseInfo = useGetChatStream();
  const postGenerateImage = usePostGenerateImage();
  const postImageTaskIDStatus = usePostMJTask();

  const handleGetChatInfo = useCallback(
    async (prompt: string) => {
      try {
        const chatInfoResponse = await getChatResponseInfo({
          params: {
            appCode: chatInfo.code,
            modelCode: "J6ux7xvi",
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

  const queryImageStatus = useCallback(async () => {
    if (isEmpty(taskID)) return;
    try {
      setImageStatus("Pending");
      const result = await postImageTaskIDStatus({
        url: ApiConstants.API_POST_MJ_TASK + `/${taskID}`,
      });
      const data = result.data.data;
      if (data.status === "SUCCESS") {
        appendMsg({
          type: "image",
          content: { picUrl: data.imageUrl },
          user: { avatar: chatInfo.headImageUrl },
        });
        setTyping(false);
        setImageStatus("Done");
      }
    } catch (error) {
      openErrorMessage("Query Image Status Error");
    }
  }, [
    appendMsg,
    chatInfo.headImageUrl,
    postImageTaskIDStatus,
    setTyping,
    taskID,
  ]);

  const { data, loading, run, cancel } = useRequest(queryImageStatus, {
    manual: true,
    pollingInterval: 5000,
  });

  useEffect(() => {
    if (imageStatus && imageStatus === "Done") {
      cancel();
    }
  }, [cancel, imageStatus]);

  const handleGetImage = useCallback(
    async (prompt: string) => {
      try {
        const result = await postGenerateImage({ data: { prompt } }); //to get task id
        if (result.data.code === 200) {
          setTaskID(result.data.data);
          run();
        }
      } catch (error) {
        //TODO
        openErrorMessage("Get Image TaskID Error");
      } finally {
        //TODO: should be here set false?
        // setTyping(false);
      }
    },
    [postGenerateImage, run]
  );

  const handleSend = useCallback(
    async (type, val) => {
      if (type === "text" && val.trim()) {
        appendMsg({
          type: "text",
          content: { text: val },
          position: "right",
          user: {
            avatar:
              "https://images.pexels.com/photos/16806729/pexels-photo-16806729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          }, //TODO :to do recoil,login user info
        });

        setTyping(true);
        if (chatInfo.type !== "IMAGE") {
          await handleGetChatInfo(val);
          //TODO：wait to integrate the image ,think think
        } else {
          await handleGetImage(val);
        }
      }
    },
    [appendMsg, chatInfo.type, handleGetChatInfo, handleGetImage, setTyping]
  );

  const renderMessageContent = (msg) => {
    const { content, type } = msg;
    // const convert = new showdown.Converter();
    if (type === "text") {
      // const children = convert.makeHtml(content.text || "");

      return <Bubble type="text" content={content.text}></Bubble>;
    } else if (type === "image") {
      return (
        <Bubble type="image">
          <div className="chat-image-box">
            <img src={content.picUrl}></img>
            <div
              className="chat-image-box-download-icon"
              onClick={() => handleDownloadImage(content.picUrl)}
            >
              <DownCircleOutlined />
            </div>
          </div>
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
