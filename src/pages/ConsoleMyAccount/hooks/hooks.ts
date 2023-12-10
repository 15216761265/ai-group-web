import { usePostListOrder } from "./../../../apis/apiHooks/MyAccount";
import { usePostSignin } from "@apis/apiHooks/Login";
import {
  useGetUserInfo,
  usePostListIncome,
  usePostListInvoke,
} from "@apis/apiHooks/MyAccount";
import { openErrorMessage, openSuccessMessage } from "@components/CommonTip";
import IUserInfo from "@modals/userInfo";
import { IUserIncomeList } from "@modals/userIncome";
import { LoginUsesInfo } from "@recoil/atoms/users";
import { isEmpty } from "lodash-es";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

function useMyAccount() {
  const [userInfo, setUserInfo] = useRecoilState(LoginUsesInfo);
  const [userDetailsInfo, setUserDetailsInfo] = useState<IUserInfo>(
    {} as IUserInfo
  );
  const [incomePageNo, setIncomePageNo] = useState(1);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [incomeData, setIncomeData] = useState<IUserIncomeList[]>([]);
  const [isIncomeLoading, setIsIncomeLoading] = useState(false);

  const [invokePageNo, setInvokePageNo] = useState(1);
  const [invokeTotal, setInvokeTotal] = useState(0);
  const [invokeData, setInvokeData] = useState<any[]>([]);
  const [isInvokeLoading, setIsInvokeLoading] = useState(false);

  const [listOrderPageNo, setListOrderPageNo] = useState(1);
  const [listOrderTotal, setListOrderTotal] = useState(0);
  const [listOrderData, setListOrderData] = useState<any[]>([]);
  const [isListOrderLoading, setIsListOrderLoading] = useState(false);
  const userSignin = usePostSignin();
  const getUserInfo = useGetUserInfo();
  const getUserIncome = usePostListIncome();
  const getUserInvoke = usePostListInvoke();
  const getUserListOrder = usePostListOrder();

  const getInitUserInfo = useCallback(async () => {
    if (isEmpty(userInfo)) return;
    try {
      const result = await getUserInfo({
        params: {
          name: userInfo.name,
        },
      });
      setUserDetailsInfo(result.data.data);
    } catch (error) {
      openErrorMessage("获取用户信息失败");
    }
  }, [getUserInfo, userInfo]);

  const getUserIncomeData = useCallback(async () => {
    setIsIncomeLoading(true);
    try {
      const result = await getUserIncome({
        data: {
          pageNo: incomePageNo,
          pageSize: 10,
        },
      });
      const data = result.data.data;
      setIncomeData(data.list);
      setIncomeTotal(data.total);
    } catch (error) {
      openErrorMessage("查询收益失败");
    } finally {
      setIsIncomeLoading(false);
    }
  }, [getUserIncome, incomePageNo]);

  const getUserInvokeData = useCallback(async () => {
    setIsInvokeLoading(true);
    try {
      const result = await getUserInvoke({
        data: {
          pageNo: invokePageNo,
          pageSize: 10,
        },
      });
      const data = result.data.data;
      setInvokeData(data.list);
      setInvokeTotal(data.total);
    } catch (error) {
      openErrorMessage("查询使用记录失败");
    } finally {
      setIsInvokeLoading(false);
    }
  }, [getUserInvoke, invokePageNo]);

  const getUserListOrderData = useCallback(async () => {
    setIsListOrderLoading(true);
    try {
      const result = await getUserListOrder({
        data: {
          pageNo: listOrderPageNo,
          pageSize: 10,
        },
      });
      const data = result.data.data;
      setListOrderData(data.list);
      setListOrderTotal(data.total);
    } catch (error) {
      openErrorMessage("查询充值记录失败");
    } finally {
      setIsListOrderLoading(false);
    }
  }, [getUserListOrder, listOrderPageNo]);

  useEffect(() => {
    getInitUserInfo();
    getUserIncomeData();
    getUserInvokeData();
    getUserListOrderData();
  }, [
    getInitUserInfo,
    getUserIncomeData,
    getUserInvokeData,
    getUserListOrderData,
  ]);

  const handleEveryDaySignin = useCallback(async () => {
    try {
      const result = await userSignin({});
      if (result) {
        openSuccessMessage("签到成功");
      }
      //TODO: 已签到的情况
    } catch (error) {
      openErrorMessage("签到失败");
    }
  }, [userSignin]);

  return {
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
  };
}

export default useMyAccount;
