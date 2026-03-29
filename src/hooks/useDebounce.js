import { useEffect, useState } from "react"

export const useDebounce = (value, delay) => { //here value will be the key pressed in inputs
    const [debouncedValue, setDebouncedValue] = useState(value); 

    useEffect(
        () => { //this is the callback fn of useEffect, it will run every time the "value" or "delay" changes, and also on the initial render
            //settimeout starts the timer up to "delay" value, and returns timer id immediately when timer starts  
            //thats why the handler will be assigned the value of the current timer id
            const handler = setTimeout(
                () => { //this callback fn of settimeout will exxecute only after the "delay"
                    setDebouncedValue(value);
                }, delay
            );

            // this is a cleanup fn (rn return fn of the useffect callback fn) will run right before the next useEffect is triggered, cuz the previous callbacck fn of useeffect needs to be finished executing before next useeffect triggers
            return () => clearTimeout(handler); //here cleartimeout the timer whose id is "value contained by handler" 
        }, [value, delay]
    )

    return debouncedValue; //this is the value that will be used in the component, it will only update after the "delay" has passed since the last change to "value"
}
/*
so the way this custom hook works is that, when a letter is typed in the input, the "value" is cahanged so useeffect will trigger
the handler is assinged 1st timer id, and the calback fn of setimeout is on wait for "delay" time
if user types another letter before the "delay" time is up, the "value" changes again, so useeffect triggers again,
 and the cleanup fn of the previous useeffect call runs right before this new useeffect is triggered, 
 which clears the previous timer using its id stored in "handler", 
 and then a new timer is set up with the new "value" and "delay"

*/