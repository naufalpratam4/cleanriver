import { useEffect, useState } from "react";

const useTitlePage = (title: string) => {
  useEffect(() => {
    document.title = `${title} | CleanRiver`;
  }, []);
};

export default useTitlePage;
