export const loggerMiddleware = (store) => (next) => (action) => {
  console.group(`%c ACTION: ${action.type}`, 'color: #c084fc; font-weight: bold;');
  console.log('%c Previous State:', 'color: #94a3b8;', store.getState());
  console.log('%c Action Payload:', 'color: #86efac;', action.payload);
  const result = next(action);
  console.log('%c Next State:', 'color: #67e8f9;', store.getState());
  console.groupEnd();
  return result;
};