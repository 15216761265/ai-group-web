import RouteHeader from "@components/RouteHeader";
import "./index.css";
import { Avatar, Button, Pagination, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import UpdateInfoModal from "./component/UpdateInfoModal";
import useMyAccount from "./hooks/hooks";

const MyAccount = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(50);
  const [pageSize, setPageSize] = useState(20);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const {
    getInitUserInfo,
    handleEveryDaySignin,
    userDetailsInfo,

    incomeData,
    incomePageNo,
    setIncomePageNo,
    incomeTotal,
    isIncomeLoading,
    getUserIncomeData,

    invokeData,
    invokePageNo,
    setInvokePageNo,
    invokeTotal,
    isInvokeLoading,
    getUserInvokeData,

    listOrderData,
    listOrderPageNo,
    setListOrderPageNo,
    listOrderTotal,
    isListOrderLoading,
    getUserListOrderData,
  } = useMyAccount();

  const earningsColumns = [
    { title: "来源", key: "source", dataIndex: "source" },
    { title: "数值", key: "value", dataIndex: "value" },
    { title: "类型", key: "type", dataIndex: "type" },
    { title: "日期", key: "tradeTime", dataIndex: "tradeTime" },
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
            <Button
              className="mr-3"
              onClick={() => {
                setUpdateModalOpen(true);
              }}
            >
              修改
            </Button>
            <Button className="mr-3" onClick={handleEveryDaySignin}>
              签到
            </Button>
            <Button className="mr-3">分享</Button>
          </div>
          <div className="my-2">
            <span>头像: &nbsp;</span>
            <Avatar
              style={{ backgroundColor: "#1677ff" }}
              src={userDetailsInfo.icon}
            ></Avatar>
          </div>
          <div className="my-2">
            <span>昵称: &nbsp;{userDetailsInfo.nickname}</span>
          </div>
          <div className="my-2">
            <span>账号：&nbsp;{userDetailsInfo.username}</span>
            <Button className="ml-2">绑定手机号</Button>
          </div>
          <div className="my-2">
            <span className="mr-3">
              余额: &nbsp;{userDetailsInfo.incomeBalance}
            </span>
            <span className="mr-3">
              积分: &nbsp;{userDetailsInfo.pointsBalance}
            </span>
            <Button className="mr-3">充值</Button>
            <Button>计费规则</Button>
          </div>
          <div className="my-2">
            <span className="mr-3">
              收益: &nbsp;{userDetailsInfo.incomeBalance}
            </span>
            <span className="mr-3">元</span>
            <Button className="mr-3">提现</Button>
            <Button className="mr-3">收益规则</Button>
          </div>
        </div>
        {/* 收益记录 */}
        <div className="my-account-card">
          <div className="flex items-center mb-2">
            <div className="text-lg font-medium mr-3">收益记录</div>
            <Button className="mr-3" onClick={getUserIncomeData}>
              刷新
            </Button>
          </div>
          <Table
            columns={earningsColumns}
            className="mb-2"
            dataSource={incomeData}
            loading={isIncomeLoading}
            pagination={false}
          ></Table>
          <Pagination
            responsive={true}
            pageSizeOptions={[20, 40, 60, 80, 100]}
            current={incomePageNo}
            total={incomeTotal}
            pageSize={pageSize}
            onChange={(value) => {
              setIncomePageNo(value);
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
            <Button className="mr-3" onClick={getUserInvokeData}>
              刷新
            </Button>
          </div>
          <Table
            columns={chargeColumns}
            className="mb-2"
            dataSource={invokeData}
            loading={isInvokeLoading}
            pagination={false}
          ></Table>
          {invokeData.length !== 0 && (
            <Pagination
              responsive={true}
              pageSizeOptions={[20, 40, 60, 80, 100]}
              current={invokePageNo}
              total={invokeTotal}
              pageSize={pageSize}
              onChange={(value) => {
                setInvokePageNo(value);
              }}
              onShowSizeChange={(value) => {
                console.log("size change", value);
              }}
            ></Pagination>
          )}
        </div>
        {/* 使用记录 */}
        <div className="my-account-card">
          <div className="flex items-center mb-2">
            <div className="text-lg font-medium mr-3">使用记录</div>
            <Button className="mr-3" onClick={getUserListOrderData}>
              刷新
            </Button>
          </div>
          <Table
            columns={useColumns}
            className="mb-2"
            dataSource={listOrderData}
            loading={isListOrderLoading}
            pagination={false}
          ></Table>
          {listOrderData.length !== 0 && (
            <Pagination
              responsive={true}
              pageSizeOptions={[20, 40, 60, 80, 100]}
              current={listOrderPageNo}
              total={listOrderTotal}
              pageSize={pageSize}
              onChange={(value) => {
                setListOrderPageNo(value);
              }}
              onShowSizeChange={(value) => {
                console.log("size change", value);
              }}
            ></Pagination>
          )}
        </div>
      </div>
      {updateModalOpen && (
        <UpdateInfoModal
          open={updateModalOpen}
          setOpen={setUpdateModalOpen}
          initialValues={{
            icon: userDetailsInfo.icon,
            nickname: userDetailsInfo.nickname,
          }}
          updateInfo={getInitUserInfo}
        />
      )}
    </div>
  );
};

export default MyAccount;
