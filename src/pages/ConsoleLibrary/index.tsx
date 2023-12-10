import React from "react";
import RouteHeader from "@components/RouteHeader";
import "./index.css";
import { Card } from "antd";
import { AddIcon } from "@components/Lib/Icon";
import LibraryConText from "./context";
import useGetLibraryData from "./hooks/useGetLibraryData";
import AddLibraryModal from "./components/AddModal";
import LibraryCard from "./components/LibraryCard";
import EditLibrary from "./components/EditLibrary";

const ConsoleLibrary = () => {
  const props = useGetLibraryData();
  const { setIsAddModalOpen, isEdit } = props;
  return (
    <LibraryConText.Provider value={props}>
      <RouteHeader />
      {!isEdit && (
        <div className="ai-group-library">
          <LibraryCard></LibraryCard>
          <Card
            className="ai-group-console-myapp-card h-[166px]"
            hoverable
            onClick={() => {
              setIsAddModalOpen(true);
            }}
          >
            <div className="flex items-center ">
              <div className="image-box flex items-center justify-center bg-[#dddfe6] rounded-md">
                <AddIcon />
              </div>
              <div className="text-lg font-medium">创建应用</div>
            </div>
          </Card>
        </div>
      )}
      {isEdit && <EditLibrary></EditLibrary>}
      <AddLibraryModal></AddLibraryModal>
    </LibraryConText.Provider>
  );
};

export default ConsoleLibrary;
