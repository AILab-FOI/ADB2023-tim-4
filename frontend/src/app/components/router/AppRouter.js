import { Fragment } from "react";
import HomePage from "../home/HomePage";
import { Route, Routes } from "react-router-dom";
import VideoPage from "../video/VideoPage";

export const HOME_PAGE = "/";
export const VIDEO_PAGE = "video/:name";
export const UNSPECIFIED_LINK = "/*";

export default function AppRouter() {
  return (
    <Routes>
      <Fragment>
        <Route path={HOME_PAGE} element={<HomePage />} />
        <Route path={VIDEO_PAGE} element={<VideoPage />} />
        <Route path={UNSPECIFIED_LINK} element={<HomePage />} />
      </Fragment>
    </Routes>
  );
}
