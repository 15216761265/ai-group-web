import { useContext } from "react";
import LibraryConText from "../context";
import "./EditLibrary.css";
import { Button } from "antd";

const EditLibrary = () => {
  const { setIsEdit } = useContext(LibraryConText);
  return (
    <div>
      edit library
      <Button onClick={() => setIsEdit(false)}>返回</Button>
    </div>
  );
};

export default EditLibrary;
