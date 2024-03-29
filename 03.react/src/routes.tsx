import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { RootLayout } from "./layout/RootLayout/RootLayout";
import { Regist } from "./pages/Regist/Regist";
import { List } from "./pages/List/List";
import { Update } from "./pages/Update/Update";
import { Info } from "./pages/Info/Info";
import NotFound from "./pages/error/NotFound";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<List />} />
      <Route path="regist" element={<Regist />} />
      <Route path="update/:todoId" element={<Update />} />
      <Route path="info/:todoId" element={<Info />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
