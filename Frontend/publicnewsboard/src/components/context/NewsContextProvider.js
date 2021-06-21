import { useState } from "react";
import NewsContext from "./NewsContext";

function NewsContextProvider(props) {
    const [newsId, setNewsId] = useState(0);

    const value = {
        newsId,
        setNewsId,
    };

    return (
        <NewsContext.Provider value={value} >
            {props.children}
        </NewsContext.Provider>
    );
}

export default NewsContextProvider;