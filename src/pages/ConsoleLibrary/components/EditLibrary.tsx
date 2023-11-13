import { useContext, useMemo, useState } from "react";
import LibraryConText from "../context";
import "./EditLibrary.css";
import {
  Button,
  Divider,
  Input,
  Layout,
  Menu,
  Table,
  Upload,
  message,
  Form,
} from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import classNames from "classnames";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";
import {
  InboxOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
const { Dragger } = Upload;
const { Item } = Form;

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const EditLibrary = () => {
  const { setIsEdit } = useContext(LibraryConText);
  const [activeKeys, setActiveKeys] = useState(["filelist"]);
  const [isNostructure, setIsNoStructure] = useState(true);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [form] = useForm();

  const editLibraryItems = [
    { key: "filelist", label: "文件列表" },
    { key: "fileimport", label: "文件导入" },
    { key: "searchtest", label: "搜索测试" },
    { key: "config", label: "配置" },
  ];

  const FileListTableColumns = useMemo(() => {
    return [
      { title: "序号", key: "index", dataIndex: "index" },
      { title: "文件名", key: "index", dataIndex: "index" },
      { title: "文件大小(KB)", key: "index", dataIndex: "index" },
      { title: "tokens", key: "index", dataIndex: "index" },
      { title: "更新时间", key: "index", dataIndex: "index" },
      { title: "状态刷新", key: "index", dataIndex: "index" },
      { title: "操作", key: "index", dataIndex: "index" },
    ];
  }, []);

  const props: UploadProps = {
    name: "file",
    multiple: true,
    // action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

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

  const editLibraryCom = useMemo(() => {
    const fileListCom = (
      <div>
        <Table
          columns={FileListTableColumns}
          dataSource={[]}
          scroll={{ x: 800 }}
        ></Table>
      </div>
    );
    const fileimportCom = (
      <div className="pl-4">
        <div
          className={classNames(
            "create-card",
            isNostructure && "create-card-active"
          )}
          onClick={() => setIsNoStructure(true)}
        >
          <div className="title">无结构文档</div>
          <br />
          <div>自动解析, 使用方便</div>
        </div>
        <div
          className={classNames(
            "create-card mt-2",
            !isNostructure && "create-card-active"
          )}
          onClick={() => setIsNoStructure(true)}
        >
          <div className="title">无结构文档</div>
          <br />
          <div>自动解析, 使用方便</div>
        </div>
        <Divider></Divider>
        {/* TODO: change the upload type ,need be file */}
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
      </div>
    );
    const searchtestCom = (
      <div className="w-full flex px-3">
        <div>
          <div className="text-lg font-medium mb-2">测试文本</div>
          <Input.TextArea
            placeholder="请输入测试文本"
            rows={6}
            className="mb-2"
          ></Input.TextArea>
          <Button>检索</Button>
        </div>
        <div className="text-lg font-medium">测试结果</div>
      </div>
    );
    const configCom = (
      <div className="pl-10 pr-3">
        <Form form={form} className="w-1/2 m-auto">
          <Item name="name" label="知识库名称：">
            <Input></Input>
          </Item>
          <Item name="code" label="知识库Code：">
            code
          </Item>
          <Item name="image" label="知识库头像：">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Item>
          <Item name="description" label="知识库描述：">
            <Input.TextArea></Input.TextArea>
          </Item>
          <Item>
            <Button className="mr-4">保存</Button>
            <Button danger>删除</Button>
          </Item>
        </Form>
      </div>
    );
    return {
      filelist: fileListCom,
      fileimport: fileimportCom,
      searchtest: searchtestCom,
      config: configCom,
    };
  }, [FileListTableColumns]);

  return (
    <div>
      <Button onClick={() => setIsEdit(false)}>返回</Button>
      <div className="ai-group-library-edit">
        <Layout>
          <Sider theme="light">
            <Menu
              items={editLibraryItems}
              selectedKeys={activeKeys}
              onSelect={({ selectedKeys }) => setActiveKeys(selectedKeys)}
            ></Menu>
          </Sider>
          <Content>{editLibraryCom[activeKeys[0]]}</Content>
        </Layout>
      </div>
    </div>
  );
};

export default EditLibrary;
