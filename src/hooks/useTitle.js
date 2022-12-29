import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - Day Diary`;
  }, [title]);
};
export default useTitle;
