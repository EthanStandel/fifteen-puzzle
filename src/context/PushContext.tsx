import React from "react";
import { Coordinates } from "../models/Coordinates";



export const PushContext = React.createContext<{
    subscribers: Array<(event: MouseEvent, coordinates: Coordinates) => any | undefined>;
    onPush: (event: MouseEvent, coordinates: Coordinates) => any
}>({ subscribers: [], onPush: () => undefined });

export const PushContextComponent: React.FC = (props) => {
    const subscribers: Array<(event: MouseEvent, coordinates: Coordinates) => any | undefined> = [];
    const onPush = (event: MouseEvent, coordinates: Coordinates) => {
        subscribers.forEach(subscriber => subscriber?.(event, coordinates));
    }

    return <PushContext.Provider value={{ subscribers, onPush }} {...props} />;
}
