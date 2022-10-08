import {tEventBusActions} from "./types";

declare global {
  interface Event {
    detail: any;
  }
}

/**
 * Custom hook for sending / receiving data between components with rerenders in target components only
 */
export const eventBus = {
  /**
   * Adds event listener to be called once
   * after first call event listener will be removed automatically
   * @param {tEventBusActions} name - event name
   * @param {EventListenerOrEventListenerObject} handler - event listener callback
   * @return {eventActions}
   */
  once(name: tEventBusActions, handler: EventListenerOrEventListenerObject) {
    return this.registerEvent(name, handler, {once: true});
  },
  /**
   * Adds event listener
   * @param {tEventBusActions} name - event name
   * @param {EventListenerOrEventListenerObject} handler - event listener callback
   * @return {eventActions}
   */
  on(name: tEventBusActions, handler: EventListenerOrEventListenerObject) {
    return this.registerEvent(name, handler);
  },
  /**
   * Removes event listener
   * @param {tEventBusActions} name - event name
   * @param {EventListenerOrEventListenerObject} handler - event listener callback
   * @return {eventActions}
   */
  remove(name: tEventBusActions, handler: EventListenerOrEventListenerObject) {
    // eventTarget.current.removeEventListener(name, handler, {once: true} as AddEventListenerOptions);
    if (typeof window !== "undefined") window.document.removeEventListener(name, handler);
    return this;
  },

  /**
   * Triggers event
   * @param {tEventBusActions} name - event name
   * @param params - data to pass to event listener
   * @return {eventActions}
   */
  dispatch(name: tEventBusActions, params?: any) {
    if (typeof window !== "undefined")
      window.document.dispatchEvent(
        new CustomEvent(name, params ? {detail: params, cancelable: true} : undefined)
      );
    return this;
  },
  /**
   * Registers event listener
   * @param {tEventBusActions} name - event name
   * @param {EventListenerOrEventListenerObject} handler - event listener callback
   * @param {AddEventListenerOptions} options - event listener options
   * @return {eventActions}
   */
  registerEvent(
    name: tEventBusActions,
    handler: EventListenerOrEventListenerObject,
    options?: AddEventListenerOptions
  ) {
    if (typeof window !== "undefined") window.document.addEventListener(name, handler, options);
    return this;
  }
};
