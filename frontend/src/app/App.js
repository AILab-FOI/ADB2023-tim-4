import { BrowserRouter } from "react-router-dom";
import Footer from "./components/footer/Footer";
import AppRouter from "./components/router/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col justify-end">
        {/* <div className="mt-12"> */}
        <AppRouter />
        {/* </div> */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
