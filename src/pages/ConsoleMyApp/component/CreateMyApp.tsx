import React, { useContext, useState } from "react";
import classNames from "classnames";
import "./CreateMyApp.css";
import { Button, Form, Input, Select, Switch, Upload } from "antd";
import { MyAppContext } from "../context";
import { beforeUpload, getBase64 } from "@utils/index";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { CreateFormItemMappings } from "../hooks/useGetMyApp";

const { Item } = Form;
const { Option } = Select;

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
  const {
    isCreating,
    setIsEdit,
    setIsCreate,
    createForm,
    handleAddMyApp,
    createType: type,
    setCreateType: setType,
    roleModalFilterList,
  } = useContext(MyAppContext);
  const [imageUrl, setImageUrl] = useState<string>(
    "http://dummyimage.com/400x400"
  );
  const [loading, setLoading] = useState(false);

  const isPublic = Form.useWatch(CreateFormItemMappings.PUBLIC);

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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
          form={createForm}
          initialValues={{ [CreateFormItemMappings.PUBLIC]: false }}
          onFinish={(value) => {
            console.log("create my app", value);
          }}
        >
          <Item name={CreateFormItemMappings.NAME} label="应用名称">
            <Input placeholder="给你的应用取一个有趣的名字吧"></Input>
          </Item>
          <Item name={CreateFormItemMappings.DESC} label="应用描述">
            <Input placeholder="介绍下你的应用吧"></Input>
          </Item>
          <Item name={CreateFormItemMappings.INTRO} label="开场介绍">
            <Input.TextArea placeholder="应用的第一句话。例如:有什么可以帮您的?"></Input.TextArea>
          </Item>
          <Item name={CreateFormItemMappings.IMAGE} label="应用头像">
            {/* <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              beforeUpload={(file: RcFile) => {
                // setFileList([...fileList, file]);
                // beforeUpload(file);
                return false;
              }}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload> */}
            <Input placeholder="请填入链接"></Input>
          </Item>
          <Item name={CreateFormItemMappings.GROUPID} label="选择分类">
            <Select placeholder="请选择应用分类">
              {roleModalFilterList.length !== 0 &&
                roleModalFilterList.map((item, index) => (
                  <Option key={index} value={item.id}>
                    {item.name}
                  </Option>
                ))}
            </Select>
          </Item>
          <Item name={CreateFormItemMappings.PUBLIC} label="是否公开">
            否
            <Switch
              className={classNames("mx-2", !isPublic && "bg-[#dddfe6]")}
            ></Switch>
            是<div>(选是则会显示在应用广场)</div>
          </Item>
          <Item name={CreateFormItemMappings.PROMPT} label="应用设定">
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
              onClick={handleAddMyApp}
              loading={isCreating}
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
