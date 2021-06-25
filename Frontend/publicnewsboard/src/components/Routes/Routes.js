import { Route, Switch } from "react-router-dom";
import Login from '../Login/Login'
import AddReporter from "../Login/AddReporter";
import VideoUpload from '../Reporter/VideoUpload'
import Reporter from "../Reporter/Reporter";
import UiForm from "../Reporter/AddNews/UiForm";
import SimpleModal from "../Reporter/UploadImage/UploadImageModal";
import News from "../newsElements/news/news";
import FavNews from "../newsElements/favNews/favNews";

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <FavNews />
        <News />
      </Route>
      <Route path="/login">
         <Login/>
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
          <VideoUpload openModal='true'/>
        </Route>
        <Route path="/addReporter" >
            <AddReporter/>
         </Route>
       
    </Switch>
  );
}
export default Routes;
