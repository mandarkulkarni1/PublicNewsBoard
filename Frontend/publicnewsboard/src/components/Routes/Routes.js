import { Route, Switch } from "react-router-dom";
import Login from '../Login/Login'
import AddReporter from "../Login/AddReporter";
import AddReader from "../Reader/RegisterReader";
import VideoUpload from '../Reporter/VideoUpload/VideoUpload'
import Reporter from "../Reporter/Reporter";
import AddNews from "../Reporter/AddNews/AddNews";
import News from "../newsElements/news/news";
import FavNews from "../newsElements/favNews/favNews";
// import ReaderAddUser from "../Login/ReaderAddUser";
import GraphRepresent from "../Admin/GraphRepresent";
import ReporterApprove from "../Admin/ReporterApprove";
import Article from "../Admin/Article";
import ApproveNews from "../Admin/ApproveNews";
import ReportedNews from "../Admin/ReportedNews";
import AllReports from "../Admin/AllReports";
import AllReader from "../Admin/AllReader";
import TotalReporter from "../Admin/TotalReporter";
import ParticularReporterNews from "../Admin/ParticularReporterNews";
import ArticlePage from "../Reporter/ArticlePage";
import ExpandedNews from "../newsElements/expandedNews/expandedNews";
import Categories from "../navbar/categories/categories";
import Search from "../Reader/Search";


function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <FavNews />
        <Categories />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/articlePage/:id" >
        <ArticlePage />
      </Route>
      <Route path="/reporter">
        <Reporter />
      </Route>
      <Route path="/addNews">
        <AddNews />
      </Route>
      <Route path="/videoUpload" >
        <VideoUpload openModal='true' />
      </Route>
      <Route path="/addReporter" >
        <AddReporter />
      </Route>
      <Route path="/admin">
        <GraphRepresent />
      </Route>{" "}
      <Route path="/reporterApprove">
        <ReporterApprove />
      </Route>{" "}
      <Route path="/adminNews/:id" component={Article} />
      <Route path="/allReports/:id" component={AllReports} />
      <Route path="/particularNews/:id" component={ParticularReporterNews} />
      <Route path="/approveNews">
        <ApproveNews />
      </Route>{" "}
      <Route path="/reportedNews">
        <ReportedNews />
      </Route>{" "}
      <Route path="/getAllReader">
        <AllReader />
      </Route>{" "}
      <Route path="/getAllReporter">
        <TotalReporter />
      </Route>{" "}
      <Route path="/registerReader" >
        <AddReader />
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
