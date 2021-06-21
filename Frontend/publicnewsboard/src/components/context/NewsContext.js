import { createContext } from "react";

const NewsContext = createContext({
    newsId: 0,
    setNewsId: () => {},
});

export default NewsContext;