import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SneakerBanner from "./assets/banner_sneakers.png";
import SportBanner from "./assets/banner_sport.png";
import SlideBanner from "./assets/banner_slide.png";
import { useDispatch } from "react-redux";
import { checkAuth } from "./features/user/userSlice";
import { checkSession } from "./features/auth/auth";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import InvoiceComponent from "./components/InvoiceComponent";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const authStatus = checkSession();
    dispatch(checkAuth(authStatus));
  }, [dispatch]);

  return (
    <PersistGate loading={null} persistor={persistor}>
      <main className="bg-gradient-to-t from-violet-900 via-neutral-900 to-black text-tertiary">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/sneakers"
              element={<Category category="sneakers" banner={SneakerBanner} />}
            />
            <Route
              path="/slides"
              element={<Category category="slides" banner={SlideBanner} />}
            />
            <Route
              path="/sports"
              element={<Category category="sports" banner={SportBanner} />}
            />
            <Route path="/product" element={<Product />}>
              <Route path=":productId" element={<Product />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/invoice/:orderId" element={<InvoiceComponent />} />
          </Routes>
          <Footer />
        </BrowserRouter>
        <ToastContainer />
      </main>
    </PersistGate>
  );
}

export default App;
