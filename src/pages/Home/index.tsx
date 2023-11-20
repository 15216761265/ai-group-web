import CommonPagination from "@components/Pagination";
import RouteHeader from "@components/RouteHeader";
import { Input, Pagination, Spin } from "antd";
import useGetData from "./hooks/useGetData";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./index.css";

import FilterModalList from "./component/filterModal";
import Card from "@components/Card";

const HomePage = () => {
  const {
    currentPage,
    setCurrentPage,
    totalItems,
    pageSize,
    roleList,
    roleModalFilterList,
    selectedGroupId,
    setSlectedGroupId,
    selectActionType,
    setSelectActionType,
    isLoadingData,
  } = useGetData();

  return (
    <div>
      <RouteHeader></RouteHeader>
      <div className="ai-group-home-container">
        <div>
          <Input placeholder="请输入搜索内容"></Input>
        </div>
        <div className="ai-group-home-content">
          <FilterModalList
            selectedGroupId={selectedGroupId}
            setSlectedGroupId={setSlectedGroupId}
            roleModalFilterList={roleModalFilterList}
            selectActionType={selectActionType}
            setSelectActionType={setSelectActionType}
          />
          <div className="ai-group-home-role-list">
            <Spin spinning={isLoadingData}>
              <div className="ai-group-home-role-list-content">
                {roleList?.map((list, index) => (
                  <Card data={list} key={index} />
                ))}
              </div>
            </Spin>
          </div>
        </div>
        {/* <CommonPagination></CommonPagination> */}
        {roleList && roleList.length !== 0 && (
          <div className="text-center">
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
        )}
      </div>
    </div>
  );
};

export default HomePage;
