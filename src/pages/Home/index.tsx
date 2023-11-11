import CommonPagination from "@components/Pagination";
import RouteHeader from "@components/RouteHeader";
import { Button, Input, Pagination } from "antd";
import useGetData from "./hooks/useGetData";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./index.css";
import Card from "./component/card";

const Clssification = [{}];

const HomePage = () => {
  const { currentPage, setCurrentPage, totalItems, pageSize, roleList } =
    useGetData();

  return (
    <div>
      <RouteHeader></RouteHeader>
      <div>
        <Input placeholder="请输入搜索内容"></Input>
      </div>
      <div className="ai-group-home-content">
        <div className="ai-group-home-filter">
          <div className="flex items-center">
            <div>类别</div>
            <Button>全部</Button>
          </div>
          <div>
            <div>排序</div>
          </div>
        </div>
        <div className="ai-group-home-role-list">
          <div className="ai-group-home-role-list-content">
            {roleList?.map((list, index) => (
              <Card data={list} key={index} />
            ))}
          </div>
        </div>
      </div>
      {/* <CommonPagination></CommonPagination> */}
      <div>
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
  );
};

export default HomePage;
