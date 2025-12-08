"use client";

import { ReactNode, useEffect } from "react";
import KambazNavigation from "./Navigation";
import "./styles.css";
import store from "./store";
import { Provider, useDispatch } from "react-redux";
import axios from "axios";
import { setCurrentUser } from "./Account/reducer";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const axiosWithCredentials = axios.create({ withCredentials: true });

function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const { data } = await axiosWithCredentials.get(
          `${HTTP_SERVER}/api/users/current`
        );
        dispatch(setCurrentUser(data));
      } catch (e) {
      }
    };
    loadCurrentUser();
  }, [dispatch]);

  return null;
}

export default function KambazLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Provider store={store}>
      <AuthInitializer />
      <div className="d-flex" id="wd-kambaz">
        <div>
          <KambazNavigation />
        </div>
        <div className="flex-fill ps-3 wd-main-content-offset">
          {children}
        </div>
      </div>
    </Provider>
  );
}