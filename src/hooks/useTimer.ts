import { useCallback, useLayoutEffect, useRef } from "react";

/**
 * A custom hook that calls a callback function at a specified interval.
 *
 * @param callback - The function to call at the specified interval.
 * @param active - Used to start or stop the timer
 * @param interval - The interval in milliseconds at which to call the callback function. Defaults to 1s
 *  Note will initially wait the interval before calling the callback function.
 *
 * @example
 * ### Log "hello" every second:
 *
 * ```
 * useTimer(() => console.log("hello"), true, 1000);
 * ```
 *
 * ### Update state/ rerender every 3 seconds:
 *
 * ```
 * useTimer(() => setState(newState), true, 3000);
 * ```
 *
 * @remarks
 * ### Performance.timeOrigin
 *  The time origin is a point in time from which time is measured.
 *
 * performance.timeOrigin is set once per browsing context,
 *   meaning it is initialized when a new document is loaded in a browser tab (or iframe).
 *
 * ### Delta Time
 * The time between the last frame's render completion and the current frame in milliseconds.
 *
 * ### Use of useRef
 * Use ref is used instead of internal react state as this ticks every frame.
 * e.g. if you had a 144 hz monitor it would rerender the component 144 times a second 😅
 */
export const useTimer = (
  callback: () => void,
  active: boolean = false,
  interval: number = 1000,
) => {
  // The time elapsed since Performance.timeOrigin was set in milliseconds.
  const lastFrameTimeRef = useRef(performance.now());
  // Time elapsed since we last called the callback in milliseconds.
  const elapsedRef = useRef(0);
  // The unique id of a currently active frame
  const activeAnimationFrame = useRef<number | null>(null);

  const tick = useCallback(
    (
      /* 
        The end time of the previous frame's rendering (based on the number of milliseconds since time origin)
        
        Provided by the browser's requestAnimationFrame() method.
      */
      currentTime: DOMHighResTimeStamp,
    ) => {
      if (!active) {
        return;
      }
      // on initial render example
      // elapsed = 0
      // currentTime = 16.8
      // lastFrameTime = 16.6
      //
      // 0 + (16.8 - 16.6) = 0.2
      // elapsed = 0.2
      elapsedRef.current += currentTime - lastFrameTimeRef.current;

      // lastFrameTime = 16.8
      lastFrameTimeRef.current = currentTime;

      if (elapsedRef.current >= interval) {
        callback();

        // Instead of resetting elapsed = 0, we use the modulo assignment operator to keep the extra ms.
        // e.g.
        //  elapsed = 1008 % 1000 = 8
        elapsedRef.current %= interval;
      }

      activeAnimationFrame.current = requestAnimationFrame(tick);
    },
    [callback, interval, active],
  );

  // Fires before the browser repaints.
  // Which is what we want as this timer should be used to control repainting.
  useLayoutEffect(() => {
    if (active) {
      activeAnimationFrame.current = requestAnimationFrame(tick);
    }

    return () => {
      if (activeAnimationFrame.current) {
        cancelAnimationFrame(activeAnimationFrame.current);
      }
    };
  }, [tick, active]);
};
