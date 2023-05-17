import { useEffect, useState } from "react";

const useTitlePage = (title: string) => {
  useEffect(() => {
    document.title = `${title} | Limpio`;
  }, []);
};

export default useTitlePage;
