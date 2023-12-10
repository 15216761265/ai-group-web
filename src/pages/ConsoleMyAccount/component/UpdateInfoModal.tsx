import React, { useCallback, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { usePostUpdateInfo } from "@apis/apiHooks/MyAccount";
import { openErrorMessage } from "@components/CommonTip";

const { Item } = Form;

type UpdateInfoModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  initialValues: { icon: string; nickname: string };
  updateInfo: () => void;
};

const UpdateInfoModal: React.FC<UpdateInfoModalProps> = ({
  open,
  setOpen,
  initialValues,
  updateInfo,
}) => {
  const [form] = Form.useForm();
  const [isUpdate, setIsUpdate] = useState(false);

  const updateuserInfo = usePostUpdateInfo();

  const handleUpdateUserInfo = useCallback(async () => {
    const value = form.getFieldsValue();
    setIsUpdate(true);
    try {
      const result = await updateuserInfo({
        data: value,
      });
      console.log("update user info result", result);
    } catch (error) {
      openErrorMessage("更新用户信息失败");
    } finally {
      setIsUpdate(false);
      setOpen(false);
      updateInfo();
    }
  }, [form, setOpen, updateInfo, updateuserInfo]);

  return (
    <Modal
      title="修改个人信息"
      open={open}
      onCancel={() => setOpen(false)}
      closable
      footer={false}
    >
      <Form
        form={form}
        initialValues={initialValues}
        onFinish={handleUpdateUserInfo}
        className="mt-6"
      >
        <Item label="头像" name="icon">
          <Input placeholder="请输入头像链接"></Input>
        </Item>
        <Item label="昵称" name="nickname">
          <Input placeholder="请输入昵称"></Input>
        </Item>
        <Item>
          <Button onClick={() => setOpen(false)}>取消</Button>
          <Button
            className="ai-primary-button ml-2 w-auto"
            type="primary"
            htmlType="submit"
            loading={isUpdate}
          >
            确定
          </Button>
        </Item>
      </Form>
    </Modal>
  );
};

export default UpdateInfoModal;
