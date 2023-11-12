import { createContext } from "react";
import useGetLibraryData from "../hooks/useGetLibraryData";

type TLibraryContext = ReturnType<typeof useGetLibraryData>;

const LibraryConText = createContext<TLibraryContext>({} as TLibraryContext);

export default LibraryConText;
