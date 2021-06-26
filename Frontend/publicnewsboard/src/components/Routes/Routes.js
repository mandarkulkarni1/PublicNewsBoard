import { Route, Switch } from "react-router-dom";
import Login from '../Login/Login'
import AddReporter from "../Login/AddReporter";
import AddReader from "../Reader/RegisterReader";
import VideoUpload from '../Reporter/VideoUpload'
import Reporter from "../Reporter/Reporter";
import UiForm from "../Reporter/AddNews/UiForm";
import SimpleModal from "../Reporter/UploadImage/UploadImageModal";
import News from "../newsElements/news/news";
import FavNews from "../newsElements/favNews/favNews";
import ExpandedNews from "../newsElements/expandedNews/expandedNews";
import Categories from "../navbar/categories/categories";
import Search from "../Reader/Search";


function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <FavNews />
        <Categories/>
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/reporter">
        <Reporter />
      </Route>
      <Route path="/addNews">
        <UiForm />
      </Route>
      <Route path="/imgModal">
        <SimpleModal open={true} />
      </Route>
      <Route path="/videoUpload" >
        <VideoUpload openModal='true' />
      </Route>
      <Route path="/addReporter" >
          <AddReporter/>
       </Route>
       <Route path="/registerReader" >
          <AddReader/>
       </Route>

       <Route path="/detailedNews/:newsId" >
          <ExpandedNews />
       </Route>

       <Route path="/searchResult/:searchValue" >
          <Search />
       </Route>
    </Switch>
  );
}
export default Routes;
