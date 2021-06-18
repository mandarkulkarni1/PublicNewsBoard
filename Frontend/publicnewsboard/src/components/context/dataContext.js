import { createContext } from "react";

const DataContext = createContext({
    data: [],
    setData: () => {},
});

export default DataContext;