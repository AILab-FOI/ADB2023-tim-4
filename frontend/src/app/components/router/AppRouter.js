import { Fragment } from "react";
import HomePage from "../home/HomePage";
import { Route, Routes } from "react-router-dom";

export const HOME_PAGE = "/";
export const VIDEO_PAGE = "video/:name";
export const UNSPECIFIED_LINK = "/*";

export default function AppRouter() {
  return (
    <Routes>
      <Fragment>
        <Route path={HOME_PAGE} element={<HomePage />} />
        <Route path={UNSPECIFIED_LINK} element={<HomePage />} />
      </Fragment>
    </Routes>
  );
}
