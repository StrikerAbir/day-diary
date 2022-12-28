import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - SB Furniture`;
  }, [title]);
};
export default useTitle;
