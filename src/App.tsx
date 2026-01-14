import { BrowserRouter as Router, Route, Routes } from "react-router";
import Users from "./users/pages/Users";
import NewPlacePage from "./places/pages/NewPlacePage";
import NotFound from "./shared/components/NotFound";
import MainNavigation from "./shared/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import AuthPage from "./users/pages/Auth";
import { AuthContextProvider } from "./shared/Context/AuthProvider";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Router>
          <MainNavigation />
          <main>
            <Routes>
              <Route path="/" element={<Users />} />
              <Route path="/:userId/places" element={<UserPlaces />} />
              <Route path="/places/new" element={<NewPlacePage />} />
              <Route path="/places/:placeId" element={<UpdatePlace />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </Router>
      </AuthContextProvider>
    </>
  );
}

export default App;
