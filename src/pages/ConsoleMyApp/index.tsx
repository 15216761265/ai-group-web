import RouteHeader from "@components/RouteHeader";
import MyAppCard from "./component/MyAppCard";
import { MyAppContext } from "./context";
import useGetMyAppData from "./hooks/useGetMyApp";
import CreateMyApp from "./component/CreateMyApp";
import EditMyApp from "./component/EditMyApp";
import "./index.css";

const ConsoleMyApp = () => {
  const props = useGetMyAppData();
  const { isCreate, isEdit } = props;
  return (
    <MyAppContext.Provider value={props}>
      <RouteHeader />
      <div className="my-app-content">
        <>{!isCreate && !isEdit && <MyAppCard />}</>
        <>{isCreate && !isEdit && <CreateMyApp />}</>
        <>{!isCreate && isEdit && <EditMyApp />}</>
      </div>
    </MyAppContext.Provider>
  );
};

export default ConsoleMyApp;
