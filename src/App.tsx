import { BrowserRouter as Router, Route, Routes } from "react-router";
import Users from "./users/pages/Users";
import NewPlacePage from "./places/pages/NewPlacePage";
import NotFound from "./shared/components/NotFound";
import MainNavigation from "./shared/Navigation/MainNavigation";

function App() {
  return (
    <>
      <Router>
        <MainNavigation />
        <main>
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/places/new" element={<NewPlacePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
