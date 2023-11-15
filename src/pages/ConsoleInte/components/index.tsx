import { DatabaseIcon } from "@components/Lib/Icon";
import { Card } from "antd";
import "./index.css";

const InteCardCom = () => {
  return (
    <Card className="ai-group-inte-card-com">
      <div className="flex justify-between ">
        <div className="flex items-center">
          <DatabaseIcon />
          <span className="text-sm font-medium ml-2">对话API</span>
        </div>
        <div>箭头</div>
      </div>
      <div className="tip">将知识库接入你自己的应用</div>
    </Card>
  );
};

export default InteCardCom;
