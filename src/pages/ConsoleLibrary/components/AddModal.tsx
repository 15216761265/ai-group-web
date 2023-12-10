import React, { useContext } from "react";
import { Button, Form, Input, Modal } from "antd";
import LibraryConText from "../context";
import { useForm } from "antd/es/form/Form";
import "./AddModal.css";

const { Item } = Form;

const AddLibraryModal = () => {
  const { isAddModalOpen, setIsAddModalOpen } = useContext(LibraryConText);
  const [form] = useForm();
  return (
    <Modal
      open={isAddModalOpen}
      title="创建知识库"
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form form={form} className="mt-5">
        <Item name="name" label="知识库名称">
          <Input placeholder="给你的知识库取一个名字吧"></Input>
        </Item>
        <Item name="description" label="知识库描述">
          <Input.TextArea rows={5}></Input.TextArea>
        </Item>
        <Item className="flex justify-end">
          <Button onClick={() => setIsAddModalOpen(false)}>取消</Button>
          <Button
            className="ai-primary-button ml-2 w-auto"
            type="primary"
            htmlType="submit"
          >
            确定
          </Button>
        </Item>
      </Form>
    </Modal>
  );
};

export default AddLibraryModal;
