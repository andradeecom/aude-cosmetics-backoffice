/**
 * Simple event bus for application-wide events
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EventCallback = (...args: any[]) => void;

interface EventMap {
  [key: string]: EventCallback[];
}

class EventBus {
  private events: EventMap = {};

  /**
   * Subscribe to an event
   * @param event Event name
   * @param callback Function to call when event is emitted
   * @returns Unsubscribe function
   */
  on(event: string, callback: EventCallback): () => void {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(callback);

    // Return unsubscribe function
    return () => {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    };
  }

  /**
   * Emit an event
   * @param event Event name
   * @param args Arguments to pass to callbacks
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit(event: string, ...args: any[]): void {
    const callbacks = this.events[event];
    if (callbacks) {
      callbacks.forEach((callback) => {
        callback(...args);
      });
    }
  }

  /**
   * Remove all listeners for an event
   * @param event Event name
   */
  off(event: string): void {
    delete this.events[event];
  }
}

// Create and export a singleton instance
export const eventBus = new EventBus();

// Define event constants
export const AUTH_EVENTS = {
  SESSION_EXPIRED: "auth:session_expired",
  LOGGED_OUT: "auth:logged_out",
  LOGGED_IN: "auth:logged_in",
};
