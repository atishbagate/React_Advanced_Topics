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
import Debounce from "./Pages/Debounce/index";
import LifecycleInAdvanced from "./Pages/LifecycleInAdvanced/LifecycleWrapper";

// --------------------
// Design Patterns
// --------------------
import ContainerAndPresentationPattern from "./Pages/Patterns/2_Container_and_Presentation_Pattern/index";
import CounterComponent from "./Pages/Patterns/1_Custom_Hook_Pattern.tsx";
import ProviderPatternExample from "./Pages/Patterns/3_Provider_Pattern/ProviderPatternExample";
import ControlledUncontrolledPattern from "./Pages/Patterns/4_controlled_uncontrolled_component_pattern/ControlledUncontrolledPattern";
import CompoundTabsExample from "./Pages/Patterns/5_Compound_Components_patterns/CompoundTabsExample";
import SlotChildrenAsPropsExample from "./Pages/Patterns/6_Slot_Children_as_Props/SlotChildrenAsPropsExample";
import RenderPropsExample from "./Pages/Patterns/7_Render_Props/RenderPropsExample.tsx";
import ToggleRenderPropsExample from "./Pages/Patterns/7_Render_Props/ToggleRenderPropsExample.tsx";
import PolymorphicTextExample from "./Pages/Patterns/8_Polymorphic_Components_Pattern/PolymorphicTextExample.tsx";
import StateReducerPatternExample from "./Pages/Patterns/9_State_Reducer_Pattern/StateReducerPatternExample.tsx";
import StateMachineExample from "./Pages/Patterns/10_State_Machine_Pattern/StateMachineExample.tsx";
import FormStateMachineExample from "./Pages/Patterns/10_State_Machine_Pattern/FormStateMachineExample.tsx";
import FactoryComponentsPattern from "./Pages/Patterns/11_Factory_Components_Pattern/index";

// --------------------
// React 19 Features
// --------------------
import React19Features from "./Pages/React_19_new_features/index";
import ActionsExample from "./Pages/React_19_new_features/ActionsExample";
import SimpleActionsDemo from "./Pages/React_19_new_features/SimpleActionsDemo";

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

      {/* ----------- Design Patterns -------------- */}
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
      <Route
        path="/patterns/6_Slot_Children_as_Props"
        element={<SlotChildrenAsPropsExample />}
      />
      <Route path="/patterns/7_Render_Props" element={<RenderPropsExample />} />
      <Route
        path="/patterns/7_Render_Props_2"
        element={<ToggleRenderPropsExample />}
      />
      <Route
        path="/patterns/8_Polymorphic_Components_Pattern"
        element={<PolymorphicTextExample />}
      />
      <Route
        path="/patterns/9_State_Reducer_Pattern"
        element={<StateReducerPatternExample />}
      />
      <Route
        path="/patterns/10_State_Machine_Pattern"
        element={<StateMachineExample />}
      />
      <Route
        path="/patterns/10_State_Machine_Pattern_Form"
        element={<FormStateMachineExample />}
      />
      <Route
        path="/patterns/11_Factory_Components_Pattern"
        element={<FactoryComponentsPattern />}
      />

      {/* ----------- React 19 Features -------------- */}
      <Route path="/react19" element={<React19Features />} />
      <Route path="/react19/actions" element={<ActionsExample />} />
      <Route path="/react19/simple-actions" element={<SimpleActionsDemo />} />

      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);
