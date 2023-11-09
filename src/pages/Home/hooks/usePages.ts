import { useState } from "react";

export function usePages(){
  const [currentPage,setCurrentPage]=useState(0);
  const [totalItems,setTotalItems]=useState(50);
  const [pageSize,setPageSize]=useState(20)
  
  return {

  }
}