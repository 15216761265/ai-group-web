import { Pagination } from "antd";

const CommonPagination = () => {
  return (
    <div>
      <Pagination
        responsive={true}
        pageSizeOptions={[20, 40, 60, 80, 100]}
      ></Pagination>
    </div>
  );
};

export default CommonPagination;
