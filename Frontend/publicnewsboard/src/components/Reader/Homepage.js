import Categories from "../navbar/categories/categories";
import Navbar from "../navbar/navbar"
import FavNews from "../newsElements/favNews/favNews";
const HomePage = () => {

    return (
        <>
            <Navbar />
            <FavNews />
            <Categories />
        </>
    );
}

export default HomePage; 