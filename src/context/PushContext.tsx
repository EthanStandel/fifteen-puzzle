import React from "react";



export const PushContext = React.createContext<{
    subscribers: Array<(event: MouseEvent, coordinates: { x: number; y: number }) => any | undefined>;
    onPush: (event: MouseEvent, coordinates: { x: number; y: number }) => any
}>({ subscribers: [], onPush: () => undefined });

export const PushContextComponent: React.FC = (props) => {
    const subscribers: Array<(event: MouseEvent, coordinates: { x: number; y: number }) => any | undefined> = [];
    const onPush = (event: MouseEvent, coordinates: { x: number; y: number }) => {
        subscribers.forEach(subscriber => subscriber?.(event, coordinates));
    }

    return <PushContext.Provider value={{ subscribers, onPush }} {...props} />;
}
