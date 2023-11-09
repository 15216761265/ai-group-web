import CommonPagination from "@components/Pagination";
import RouteHeader from "@components/RouteHeader";
import { Input } from "antd";

const HomePage = () => {
  return (
    <div>
      <RouteHeader></RouteHeader>
      <div>
        <Input placeholder="请输入关键词"></Input>
      </div>
      <CommonPagination></CommonPagination>
    </div>
  );
};

export default HomePage;
