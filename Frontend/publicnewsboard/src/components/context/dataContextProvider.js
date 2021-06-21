import { useEffect, useState } from "react";
import DataContext from "./dataContext";
import { getData } from "../services/news";

function DataContextProvider(props) {
    const [data, setData] = useState([]);


    useEffect(() => {
        async function init() {
          const newsData = await getData();
          console.log(newsData);
          setData(newsData.data);
        }
    
        init();
      }, []);


    const value = {
        data,
        setData,
    };

    return (
        <DataContext.Provider value={value} >
            {props.children}
        </DataContext.Provider>
    );
}

export default DataContextProvider;