"use client";
import withAuth from "@/authservice/auth/withauth";
import Welcome from "@/app/components/welcome";
import store from "./store";
import { Provider } from "react-redux";
const Home = () => {
  withAuth();

  return (
    <Provider store={store}>
      <Welcome />
    </Provider>
  );
};

export default withAuth(Home);
