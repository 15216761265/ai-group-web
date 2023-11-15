import RouteHeader from "@components/RouteHeader";
import "./index.css";
import { Avatar, Button, Pagination, Table } from "antd";
import { useState } from "react";

const MyAccount = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(50);
  const [pageSize, setPageSize] = useState(20);

  const earningsColumns = [
    { title: "来源", key: "web", dataIndex: "" },
    { title: "数值", key: "number", dataIndex: "" },
    { title: "类型", key: "type", dataIndex: "" },
    { title: "日期", key: "time", dataIndex: "" },
  ];

  const chargeColumns = [
    { title: "订单号", key: "order", dataIndex: "" },
    { title: "时间", key: "time", dataIndex: "" },
    { title: "充值积分", key: "score", dataIndex: "" },
    { title: "充值金额", key: "money", dataIndex: "" },
  ];

  const useColumns = [
    { title: "使用时间", key: "time", dataIndex: "" },
    { title: "来源", key: "web", dataIndex: "" },
    { title: "类型", key: "type", dataIndex: "" },
    { title: "appCode", key: "code", dataIndex: "" },
    { title: "底层模型", key: "modal", dataIndex: "" },
    { title: "Token长度", key: "length", dataIndex: "" },
    { title: "消耗积分", key: "use", dataIndex: "" },
  ];
  return (
    <div>
      <RouteHeader />
      <div className="ai-group-my-account">
        {/* 个人信息 */}
        <div className="my-account-card">
          <div className="flex items-center">
            <div className="text-lg font-medium mr-3">个人信息</div>
            <Button className="mr-3">修改</Button>
            <Button className="mr-3">签到</Button>
            <Button className="mr-3">分享</Button>
          </div>
          <div className="my-2">
            <span>头像:</span>
            <Avatar style={{ backgroundColor: "#1677ff" }}>Icon</Avatar>
          </div>
          <div className="my-2">
            <span>昵称:</span>
          </div>
          <div className="my-2">
            <span>账号：</span>
            <Button>绑定手机号</Button>
          </div>
          <div className="my-2">
            <span className="mr-3">余额:</span>
            <span className="mr-3">积分</span>
            <Button className="mr-3">充值</Button>
            <Button>计费规则</Button>
          </div>
          <div className="my-2">
            <span className="mr-3">收益:</span>
            <span className="mr-3">元</span>
            <Button className="mr-3">提现</Button>
            <Button className="mr-3">收益规则</Button>
          </div>
        </div>
        {/* 收益记录 */}
        <div className="my-account-card">
          <div className="flex items-center mb-2">
            <div className="text-lg font-medium mr-3">收益记录</div>
            <Button className="mr-3">刷新</Button>
          </div>
          <Table columns={earningsColumns} className="mb-2"></Table>
          <Pagination
            responsive={true}
            pageSizeOptions={[20, 40, 60, 80, 100]}
            current={currentPage}
            total={totalItems}
            pageSize={pageSize}
            onChange={(value) => {
              setCurrentPage(value);
            }}
            onShowSizeChange={(value) => {
              console.log("size change", value);
            }}
          ></Pagination>
        </div>
        {/* 充值记录 */}
        <div className="my-account-card">
          <div className="flex items-center mb-2">
            <div className="text-lg font-medium mr-3">充值记录</div>
            <Button className="mr-3">刷新</Button>
          </div>
          <Table columns={chargeColumns} className="mb-2"></Table>
          <Pagination
            responsive={true}
            pageSizeOptions={[20, 40, 60, 80, 100]}
            current={currentPage}
            total={totalItems}
            pageSize={pageSize}
            onChange={(value) => {
              setCurrentPage(value);
            }}
            onShowSizeChange={(value) => {
              console.log("size change", value);
            }}
          ></Pagination>
        </div>
        {/* 使用记录 */}
        <div className="my-account-card">
          <div className="flex items-center mb-2">
            <div className="text-lg font-medium mr-3">使用记录</div>
            <Button className="mr-3">刷新</Button>
          </div>
          <Table columns={useColumns} className="mb-2"></Table>
          <Pagination
            responsive={true}
            pageSizeOptions={[20, 40, 60, 80, 100]}
            current={currentPage}
            total={totalItems}
            pageSize={pageSize}
            onChange={(value) => {
              setCurrentPage(value);
            }}
            onShowSizeChange={(value) => {
              console.log("size change", value);
            }}
          ></Pagination>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
