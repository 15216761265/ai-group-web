import RouteHeader from "@components/RouteHeader";
import "./index.css";
import { Card } from "antd";
import { AddIcon } from "@components/Lib/Icon";

const ConsoleLibrary = () => {
  return (
    <div>
      <RouteHeader />
      <div className="ai-group-library">
        <Card
          className="ai-group-console-myapp-card h-[166px]"
          hoverable
          onClick={() => {}}
        >
          <div className="flex items-center ">
            <div className="image-box flex items-center justify-center bg-[#dddfe6] rounded-md">
              <AddIcon />
            </div>
            <div className="text-lg font-medium">创建应用</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ConsoleLibrary;
