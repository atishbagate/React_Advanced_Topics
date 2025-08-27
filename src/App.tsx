import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import MainLayout from "./Screens/Layouts/MainLayout";
import Counter from "./Pages/Counter";
import Home from "./Pages/Home/Home";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import Parent from "./Pages/CallBackHook/Parent";
import ParentUseEffect from "./Pages/useEffectHook/Parent";
import UseRefParent from "./Pages/useRef/UseRefParent";
import ParentUseMemo from "./Pages/useMemo/ParentUseMemo";
import ParentUseReducer from "./Pages/UseReducer/ParentUseReducer";
import ParentCustomHok from "./Pages/CustomHook/ParentCustonHook";
import FunctionCurrying from "./Pages/FunctionCurrying/FunctionCurrying";
import Main from "./Pages/ErrorBoundry/Main";
import LazyLoading from "./Pages/LazyLoading/LazyLoading";
import APIMainCalling from "./Pages/APICalling/TryCatch/APIMainCalling";
import ContextMain from "./Pages/useContext/ContextMain";
import Debounce from "./Pages/Debounce/index";
import LifecycleInAdvanced from "./Pages/LifecycleInAdvanced/LifecycleWrapper";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="counter" element={<Counter />} />
      <Route path="useEffect" element={<ParentUseEffect />} />
      <Route path="useRefParent" element={<UseRefParent />} />
      <Route path="useMemo" element={<ParentUseMemo />} />
      <Route path="useCallBack" element={<Parent />} />
      <Route path="ParentUseReducer" element={<ParentUseReducer />} />
      <Route path="ParentCustomHok" element={<ParentCustomHok />} />
      <Route path="FunctionCurrying" element={<FunctionCurrying />} />
      <Route path="ErrorBoundry" element={<Main />} />
      <Route path="LazyLoading" element={<LazyLoading />} />
      <Route path="APIMainCalling" element={<APIMainCalling />} />
      <Route path="ContextMain" element={<ContextMain />} />
      <Route path="debounce" element={<Debounce />} />
      <Route path="lifecycle" element={<LifecycleInAdvanced />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);