import './App.css';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage/MainPage';
import { WelcomePage } from './pages/WelcomePage/WelcomePage';
import { SignInPage } from './pages/SignInPage/SignInPage';
import { SignUpPage } from './pages/SignUpPage/SignUpPage';
import { UpdateUserPage } from './pages/UpdateUserPage/UpdateUserPage';
import { BoardPage } from './pages/BoardPage/BoardPage';
import { Page404 } from './pages/Page404/Page404';

import { Layout } from './components/Layout/Layout';
import { RequireAuth } from './hoc/RequireAuth';
import { RequireToken } from './hoc/RequireToken';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <RequireAuth>
                  <MainPage />
                </RequireAuth>
              }
            />
            <Route path=":boardId" element={<BoardPage />} />
            <Route path="welcome" element={<WelcomePage />} />
            <Route
              path="signin"
              element={
                <RequireToken>
                  <SignInPage />
                </RequireToken>
              }
            />
            <Route
              path="signup"
              element={
                <RequireToken>
                  <SignUpPage />
                </RequireToken>
              }
            />
            <Route path="update-user" element={<UpdateUserPage />} />
            <Route path="*" element={<Page404 />} />
            <Route path="/404" element={<Page404 />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
