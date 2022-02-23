import { Header } from 'components';
import { Route, Routes } from 'react-router-dom'
import routes from "routes";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        {
          routes.map(route => (
            <Route key={route.path} path={route.path} element={route.page()} />
          ))
        }
      </Routes>
    </div>
  );
}

export default App;
