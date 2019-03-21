import React from "react";
import { Location, History } from "history";


export type RouterContextType = {
    history: History;
    location: Location;
    match?: Match | null;
    staticContext: any; // TODO
} | undefined

const context = React.createContext<RouterContextType|null>(null);
export default context;
