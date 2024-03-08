import { createStore } from "redux";
import { rootReducer } from "./rootReducer";

export let store = createStore(rootReducer);
