import { Route, Switch } from "react-router-dom";
import LoginRegisterPage from "../Login/LoginRegisterPage";
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
        <LoginRegisterPage />
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
    </Switch>
  );
}
export default Routes;
