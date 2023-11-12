import React, { ReactElement, useContext } from "react";
import { IHomeRoleList } from "@modals/HomeRoleList";
import {
  PromptTypeTag,
  EmbeddingTypeTag,
  ImageTypeTag,
} from "@components/Card/index";
import { Button, Form, Input, Switch } from "antd";
import { MyAppContext } from "../context";
import "./EditMyApp.css";
import { useGetHomeRoleModalList } from "@apis/apiHooks/Home";

const { Item } = Form;

const EditDataMockInfo: IHomeRoleList = {
  id: 3616,
  code: "HDffZ4Wg",
  name: "你的名字",
  type: "PROMPT",
  description: "一个随机取名的应用",
  prompt: "请扮演一个取名字的机器人",
  headImageUrl:
    "https://img-1317903499.cos.ap-guangzhou.myqcloud.com/default.png",
  displayOnAppSquare: "N",
  introduction: "你好，快来跟我聊天吧",
  creatorId: 8162,
  nickName: null,
  groupId: 2,
  usageCount: 0,
  thumbCount: 0,
  collectCount: 0,
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
      maxTokens: 6000,
      defaultTokens: null,
      default: true,
    },
    {
      code: "LinkAI-4",
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
    {
      code: "wenxin",
      name: null,
      tokensPerScore: 0,
      maxTokens: 2000,
      defaultTokens: null,
      default: false,
    },
    {
      code: "wenxin-4",
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
  ],
  knowledgeBaseCodes: null,
  similarityNumber: 0.0,
  knowledgeBaseSearchRow: null,
  thumb: false,
  collect: false,
  maxContextTurn: 3,
  enableMultiAgent: "N",
  displayThought: "N",
  displayPlugin: "N",
  maxThoughtTurns: 3,
  appPluginsInfoVos: null,
  knowledgeSourcePreference: null,
};

const TagMap = {
  EMBEDDING: EmbeddingTypeTag,
  IMAGE: ImageTypeTag,
  PROMPT: PromptTypeTag,
};

const FormItemMappings = {
  NAME: "name",
  DESC: "description",
  INTRO: "introduction",
  IMAGE: "headImageUrl",
  GROUPID: "groupId",
  PUBLIC: "displayOnAppSquare",
  PROMPT: "prompt",
};

const EditMyAppCard: React.FC<{ title: string; children: ReactElement }> = ({
  title,
  children,
}) => {
  return (
    <div className="ai-group-myapp-edit-card">
      <div className="text-lg text-[#006ad9] font-medium mb-3">{title}</div>
      <>{children}</>
    </div>
  );
};

const EditMyApp = () => {
  const { setIsEdit, setIsCreate } = useContext(MyAppContext);
  const getModalList = useGetHomeRoleModalList();
  return (
    <div>
      <div className="flex justify-between">
        <div>{TagMap[EditDataMockInfo.type]}</div>
        <div className="flex">
          <Button
            className="mr-2"
            onClick={() => {
              setIsEdit(false);
              setIsCreate(false);
            }}
          >
            返回
          </Button>
          <Button className="mr-2">调试</Button>
          <Button type="primary" className="ai-primary-button w-auto">
            保存
          </Button>
        </div>
      </div>
      <Form initialValues={EditDataMockInfo} className="flex flex-wrap">
        <EditMyAppCard title={"基础信息"}>
          <>
            <Item name={FormItemMappings.NAME} label="应用名称">
              <Input></Input>
            </Item>
            <Item label="应用Code">
              <div>{EditDataMockInfo.code}</div>
              {/* TODO： delete */}
              <Button danger>删除应用</Button>
            </Item>
            <Item name={FormItemMappings.IMAGE} label="应用头像"></Item>
          </>
        </EditMyAppCard>
        <EditMyAppCard title={"应用分享"}>
          <>
            <Item label="专属链接">
              <div className="text-[#3f9eff]">
                {window.location.origin}/chat/{EditDataMockInfo.code}
              </div>
            </Item>
            <Item name={FormItemMappings.PUBLIC} label="是否公开">
              否<Switch></Switch>是
            </Item>
            <Item name={FormItemMappings.DESC} label="应用描述">
              <Input></Input>
            </Item>
            <Item name={FormItemMappings.INTRO} label="开场介绍">
              <Input.TextArea></Input.TextArea>
            </Item>
          </>
        </EditMyAppCard>
        <EditMyAppCard title={"模型设置"}>
          <>
            <Item label="专属链接">
              <div className="text-[#3f9eff]">
                {window.location.origin}/chat/{EditDataMockInfo.code}
              </div>
            </Item>
            <Item name={FormItemMappings.PUBLIC} label="是否公开">
              否<Switch></Switch>是
            </Item>
            <Item name={FormItemMappings.DESC} label="应用描述">
              <Input></Input>
            </Item>
            <Item name={FormItemMappings.INTRO} label="开场介绍">
              <Input.TextArea></Input.TextArea>
            </Item>
          </>
        </EditMyAppCard>
        <EditMyAppCard title={"插件配置"}>
          <>
            <Item label="专属链接">
              <div className="text-[#3f9eff]">
                {window.location.origin}/chat/{EditDataMockInfo.code}
              </div>
            </Item>
            <Item name={FormItemMappings.PUBLIC} label="是否公开">
              否<Switch></Switch>是
            </Item>
            <Item name={FormItemMappings.DESC} label="应用描述">
              <Input></Input>
            </Item>
            <Item name={FormItemMappings.INTRO} label="开场介绍">
              <Input.TextArea></Input.TextArea>
            </Item>
          </>
        </EditMyAppCard>
      </Form>
    </div>
  );
};

export default EditMyApp;
