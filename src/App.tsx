import StateReducerPatternExample from "./Pages/Patterns/9_State_Reducer_Pattern/StateReducerPatternExample.tsx";
import FactoryComponentsPattern from "./Pages/Patterns/11_Factory_Components_Pattern/index";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
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
import Debounce from "./Pages/Debounce/index";;
import LifecycleInAdvanced from "./Pages/LifecycleInAdvanced/LifecycleWrapper";
// --------------------
// Patterns
// --------------------
import ContainerAndPresentationPattern from "./Pages/Patterns/2_Container_and_Presentation_Pattern/index";
import CounterComponent from "./Pages/Patterns/1_Custom_Hook_Pattern.tsx";
import ProviderPatternExample from "./Pages/Patterns/3_Provider_Pattern/ProviderPatternExample";
import ControlledUncontrolledPattern from "./Pages/Patterns/4_controlled_uncontrolled_component_pattern/ControlledUncontrolledPattern";
import CompoundTabsExample from "./Pages/Patterns/5_Compound_Components_patterns/CompoundTabsExample";
import RenderPropsExample from "./Pages/Patterns/7_Render_Props/RenderPropsExample.tsx";
import ToggleRenderPropsExample from "./Pages/Patterns/7_Render_Props/ToggleRenderPropsExample.tsx";

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
      <Route path="/" element={<Counter />} />
      <Route path="/home" element={<Home />} />
      <Route path="/useEffect" element={<ParentUseEffect />} />
      <Route path="/useRefParent" element={<UseRefParent />} />
      <Route path="/useMemo" element={<ParentUseMemo />} />
      <Route path="/useCallBack" element={<Parent />} />
      <Route path="/ParentUseReducer" element={<ParentUseReducer />} />
      <Route path="/ParentCustomHok" element={<ParentCustomHok />} />
      <Route path="/FunctionCurrying" element={<FunctionCurrying />} />
      <Route path="/ErrorBoundry" element={<Main />} />
      <Route path="/LazyLoading" element={<LazyLoading />} />
      <Route path="/APIMainCalling" element={<APIMainCalling />} />
      <Route path="/ContextMain" element={<ContextMain />} />
      <Route path="/debounce" element={<Debounce />} />
      <Route path="/lifecycle" element={<LifecycleInAdvanced />} />

      {/* ----------- Patterns -------------- */}
      <Route
        path="/patterns/1_Custom_Hook_Pattern"
        element={<CounterComponent />}
      />
      <Route
        path="/patterns/2_Container_and_Presentation_Pattern"
        element={<ContainerAndPresentationPattern />}
      />
      <Route
        path="/patterns/3_Provider_Pattern"
        element={<ProviderPatternExample />}
      />
      <Route
        path="/patterns/4_controlled_uncontrolled_component_pattern"
        element={<ControlledUncontrolledPattern />}
      />
      <Route
        path="/patterns/5_Compound_Components_patterns"
        element={<CompoundTabsExample />}
      />
      <Route path="/patterns/7_Render_Props" element={<RenderPropsExample />} />
      <Route
        path="/patterns/7_Render_Props_2"
        element={<ToggleRenderPropsExample />}
      />
      <Route
        path="/patterns/8_State_Reducer_Pattern"
        element={<StateReducerPatternExample />}
      />
      <Route
        path="/patterns/11_Factory_Components_Pattern"
        element={<FactoryComponentsPattern />}
      />
    </>
  )
);

// ✅ Most Common React Design Patterns (2025)
//
// Custom Hooks Pattern
//
// Container and Presentational Components Pattern
//
// Provider Pattern (Context API)
//
// Controlled and Uncontrolled Components Pattern
//
// Compound Components Pattern
//
// Slot/Children-as-Props Pattern
//
// Render Props / Function-as-Child Pattern
//
// Polymorphic Components Pattern
//
// State Reducer Pattern
//
// State Machine Pattern
//
// Factory Components Pattern
