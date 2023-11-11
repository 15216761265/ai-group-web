import RouteHeader from "@components/RouteHeader";
import MyAppCard from "./component/MyAppCard";
import { MyAppContext } from "./context";
import useGetMyAppData from "./hooks/useGetMyApp";

const ConsoleMyApp = () => {
  const props = useGetMyAppData();
  return (
    <MyAppContext.Provider value={props}>
      <RouteHeader />
      <div>
        <MyAppCard />
      </div>
    </MyAppContext.Provider>
  );
};

export default ConsoleMyApp;
