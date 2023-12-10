import React from "react";
import RouteHeader from "@components/RouteHeader";
import "./index.css";
import { Button, Table } from "antd";
import InteCardCom from "./components";

const Integration = () => {
  const apiColumns = [
    { title: "Key", key: "key", dataIndex: "key" },
    { title: "Created", key: "created", dataIndex: "" },
    { title: "Last Used", key: "created", dataIndex: "" },
    { title: "Operatoin", key: "created", dataIndex: "" },
  ];
  return (
    <div>
      <RouteHeader />
      <div className="ai-group-inte">
        <div className="inte-list-card">
          <div className="title">API Key 管理</div>
          <Table columns={apiColumns}></Table>
          <Button type="primary" className="ai-primary-button w-auto mt-2">
            创建API key
          </Button>
        </div>
        <div className="inte-list-card">
          <div className="title">开放接口</div>
          <div className="mt-3">
            <InteCardCom></InteCardCom>
          </div>
        </div>
        <div className="inte-list-card">
          <div className="title">应用接入</div>
          <div className="my-2">基于 LinkAI 开源生态接入以下App</div>
          <div className="flex">
            <InteCardCom></InteCardCom>
            <InteCardCom></InteCardCom>
            <InteCardCom></InteCardCom>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integration;
