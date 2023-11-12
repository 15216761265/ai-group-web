import { useContext, useState } from "react";
import classNames from "classnames";
import "./CreateMyApp.css";
import { Button, Form, Input, Select, Switch } from "antd";
import { IHomeRoleModalList } from "@modals/HomeRoleList";
import { MyAppContext } from "../context";

const Clssification: IHomeRoleModalList[] = [
  {
    id: "1",
    name: "工作",
    description: "工作相关",
    aiRoles: null,
  },
  {
    id: "2",
    name: "生活",
    description: "生活相关",
    aiRoles: null,
  },
  {
    id: "4",
    name: "客服",
    description: "客服助手",
    aiRoles: null,
  },
  {
    id: "9",
    name: "数字分身",
    description: "数字分身",
    aiRoles: null,
  },
  {
    id: "5",
    name: "动漫",
    description: "动漫人物",
    aiRoles: null,
  },
  {
    id: "7",
    name: "娱乐",
    description: "娱乐角色",
    aiRoles: null,
  },
  {
    id: "8",
    name: "绘画",
    description: "绘画",
    aiRoles: null,
  },
  {
    id: "3",
    name: "其它",
    description: "其它",
    aiRoles: null,
  },
];

const { Item } = Form;
const { Option } = Select;

const FormItemMappings = {
  NAME: "name",
  DESC: "description",
  INTRO: "introduction",
  IMAGE: "headImageUrl",
  GROUPID: "groupId",
  PUBLIC: "displayOnAppSquare",
  PROMPT: "prompt",
};

type TMyAppCardData = {
  id: string;
  title: string;
  desc: string;
};

const MyAppCardData: TMyAppCardData[] = [
  { id: "PROMPT", title: "轻应用", desc: "一句话设定一个简单的对话机器人" },
  { id: "EMBEDDING", title: "知识库", desc: "一句话设定一个简单的对话机器人" },
];

type MyAppCreateCardProps = {
  data: TMyAppCardData;
  handleSelectType: (value: string) => void;
  type: string;
};

const MyAppCreateCard: React.FC<MyAppCreateCardProps> = ({
  data,
  handleSelectType,
  type,
}) => {
  return (
    <div
      className={classNames(
        "create-card",
        type === data.id && "create-card-active"
      )}
      onClick={() => handleSelectType(data.id)}
    >
      <div className="title">{data.title}</div>
      <br />
      <div>{data.desc}</div>
    </div>
  );
};

const CreateMyApp = () => {
  const { setIsEdit, setIsCreate } = useContext(MyAppContext);
  const [type, setType] = useState("PROMPT");

  return (
    <div className="ai-group-myapp-create">
      <div className="create-content">
        <div className="grid grid-cols-2 gap-3 mb-2">
          {MyAppCardData.map((data, index) => (
            <MyAppCreateCard
              data={data}
              key={index}
              handleSelectType={setType}
              type={type}
            />
          ))}
        </div>
        <Form
          initialValues={{ [FormItemMappings.PUBLIC]: true }}
          onFinish={() => {}}
        >
          <Item name={FormItemMappings.NAME} label="应用名称">
            <Input placeholder="给你的应用取一个有趣的名字吧"></Input>
          </Item>
          <Item name={FormItemMappings.DESC} label="应用描述">
            <Input placeholder="介绍下你的应用吧"></Input>
          </Item>
          <Item name={FormItemMappings.INTRO} label="开场介绍">
            <Input.TextArea placeholder="应用的第一句话。例如:有什么可以帮您的?"></Input.TextArea>
          </Item>
          <Item name={FormItemMappings.IMAGE} label="应用头像">
            <Input.TextArea placeholder="应用的第一句话。例如:有什么可以帮您的?"></Input.TextArea>
          </Item>
          <Item name={FormItemMappings.GROUPID} label="选择分类">
            <Select placeholder="请选择应用分类">
              {Clssification.map((item, index) => (
                <Option key={index} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Item>
          <Item name={FormItemMappings.PUBLIC} label="是否公开">
            否<Switch></Switch>是<div>(选是则会显示在应用广场)</div>
          </Item>
          <Item name={FormItemMappings.PROMPT} label="应用设定">
            <Input.TextArea
              placeholder='这是你对机器人的设定和要求，说的越具体效果越好哦。例如："请扮演产品经理岗位的面试官，向我询问关于这个岗位的专业面试问题，一次只需要问一个问题，并等待我的回答。"'
              rows={5}
            ></Input.TextArea>
          </Item>
          <Item className="form-button">
            <Button
              onClick={() => {
                setIsEdit(false);
                setIsCreate(false);
              }}
            >
              取消
            </Button>
            <Button
              type="primary"
              className="ai-primary-button w-auto"
              htmlType="submit"
            >
              创建应用
            </Button>
          </Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateMyApp;
