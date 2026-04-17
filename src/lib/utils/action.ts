/**
 * Simple action creator replacement for typesafe-actions.
 * Creates a Redux action with { type, payload } shape.
 */
export function action<T extends string>(type: T): { type: T }
export function action<T extends string, P>(type: T, payload: P): { type: T; payload: P }
export function action<T extends string, P>(type: T, payload?: P) {
  return payload === undefined ? { type } : { type, payload }
}
