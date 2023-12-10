import React, { useContext } from "react";
import "./LibraryCard.css";
import LibraryConText from "../context";
import { Card } from "antd";
import { DatabaseIcon, SettingIcon } from "@components/Lib/Icon";

const LibraryCard = () => {
  const { libraryList, setIsEdit, setEditCode } = useContext(LibraryConText);

  return (
    <>
      {libraryList?.length &&
        libraryList.map((library, index) => {
          return (
            <Card
              className="ai-group-console-myapp-card h-[166px]"
              key={index}
              onClick={() => {
                setEditCode(library.code);
                setIsEdit(true);
              }}
            >
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="image-box flex justify-center items-center">
                    <DatabaseIcon />
                  </div>
                  <div className="text-lg font-medium break-keep text-ellipsis overflow-hidden">
                    {library.name}
                  </div>
                </div>
                <SettingIcon />
              </div>
              <div className="my-6 text-md text-[#999797]">
                Code : {library.code}
              </div>
              <div className="my-6 text-md text-[#999797]">{library.desc}</div>
            </Card>
          );
        })}
    </>
  );
};

export default LibraryCard;
