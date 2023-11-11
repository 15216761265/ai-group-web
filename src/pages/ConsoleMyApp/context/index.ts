import { createContext } from "react";
import useGetMyAppData from "../hooks/useGetMyApp";

type TMyAppContext = ReturnType<typeof useGetMyAppData>;

export const MyAppContext = createContext<TMyAppContext>({} as TMyAppContext);
