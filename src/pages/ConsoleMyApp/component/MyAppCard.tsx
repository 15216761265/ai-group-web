import { useContext, useState } from "react";
import { Button, Card, Modal, Switch } from "antd";
import { MyAppContext } from "../context";
import { IMyAppList } from "@modals/MyAppList";
import { AddIcon, SettingIcon, ShareIcon } from "@components/Lib/Icon";
import {
  PromptTypeTag,
  EmbeddingTypeTag,
  ImageTypeTag,
} from "@components/Card/index";
import "./MyAppCard.css";
import classNames from "classnames";

const TagMap = {
  EMBEDDING: EmbeddingTypeTag,
  IMAGE: ImageTypeTag,
  PROMPT: PromptTypeTag,
};

const CardCom: React.FC<{
  data: IMyAppList;
  setEditId: (value: string) => void;
  setIsEdit: (value: boolean) => void;
}> = ({ data, setEditId, setIsEdit }) => {
  const [checked, setChecked] = useState(data.displayOnAppSquare === "Y");
  const [isOpenShareModal, setIsOpenShareModal] = useState(false);

  const handleDisplayOnAppSquare = () => {
    //TODO
    setChecked(!checked);
  };

  const handleShareYourApp = () => {
    setIsOpenShareModal(true);
  };

  return (
    <div className="ai-group-console-myapp-card">
      <Card
        hoverable
        onClick={() => {
          setIsEdit(true);
          setEditId(data.code);
        }}
      >
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="image-box">
              <img src={data.headImageUrl} alt="" />
            </div>
            <div className="text-lg font-medium break-keep text-ellipsis overflow-hidden">
              {data.name}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1 items-center">
            <div
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <Switch
                checked={checked}
                onChange={handleDisplayOnAppSquare}
                className={classNames(!checked && "bg-[#dddfe6]")}
              />
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleShareYourApp();
              }}
              className="flex justify-center"
            >
              <ShareIcon />
            </div>
            <SettingIcon />
          </div>
        </div>
        <div className="my-6 text-md text-[#999797]">Code : {data.code}</div>
        <div className="flex justify-between">
          <div>{TagMap[data.type]}</div>
          <div
            className="flex"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <Button>快速接入</Button>
            <Button type="primary" className="ai-primary-button ml-2">
              开始对话
            </Button>
          </div>
        </div>
      </Card>
      <Modal
        open={isOpenShareModal}
        title={<div className="text-lg font-bold">分享应用</div>}
        onCancel={() => setIsOpenShareModal(false)}
        closeIcon={false}
        footer={
          <Button onClick={() => setIsOpenShareModal(false)}>确定</Button>
        }
      >
        <div className="p-3 text-md">
          <div className="font-medium text-[#606266] my-2">
            已为您生成应用的专属链接
          </div>
          <div className="text-[#3f9eff] bg-[#f9fafb] p-2">
            {window.location.origin}/chat/{data.code}
          </div>
          {/* TODO: add one button to copy */}
        </div>
      </Modal>
    </div>
  );
};

const MyAppCard = () => {
  const { myAppList, setIsCreate, setEditId, setIsEdit } =
    useContext(MyAppContext);
  return (
    <div className="ai-group-console-myapp-card-list">
      {myAppList?.map((list, index) => (
        <CardCom
          key={index}
          data={list}
          setEditId={setEditId}
          setIsEdit={setIsEdit}
        />
      ))}
      <Card
        className="ai-group-console-myapp-card h-[166px]"
        hoverable
        onClick={() => setIsCreate(true)}
      >
        <div className="flex items-center ">
          <div className="image-box flex items-center justify-center bg-[#dddfe6] rounded-md">
            <AddIcon />
          </div>
          <div className="text-lg font-medium">创建应用</div>
        </div>
      </Card>
    </div>
  );
};

export default MyAppCard;
