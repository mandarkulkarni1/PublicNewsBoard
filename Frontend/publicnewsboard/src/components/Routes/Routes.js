import { Route, Switch } from "react-router-dom";
import Login from '../Login/Login'
import AddReporter from "../Login/AddReporter";
import VideoUpload from '../Reporter/VideoUpload'
import Reporter from "../Reporter/Reporter";
import UiForm from "../Reporter/AddNews/UiForm";
import SimpleModal from "../Reporter/UploadImage/UploadImageModal";
import News from "../newsElements/news/news";
import FavNews from "../newsElements/favNews/favNews";
import ArticlePage from "../Reporter/ArticlePage";
import ExpandedNews from "../newsElements/expandedNews/expandedNews";
import Categories from "../navbar/categories/categories";

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
         <Route path="/articlePage/:id" >
            <ArticlePage/>
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
        <AddReporter />
      </Route>
      <Route path="/detailedNews/:news" >
        <ExpandedNews />
      </Route>
    </Switch>
  );
}
export default Routes;
