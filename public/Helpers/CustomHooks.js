import { useState, useEffect } from "react";

export function useArray(defaultValue) {
  const [array, setArray] = useState(defaultValue);

  const push = (element) => setArray((a) => [...a, element]);

  const filter = (callback) => setArray((a) => a.filter(callback));

  const update = (index, newElement) =>
    setArray((a) => [
      ...a.slice(0, index),
      newElement,
      ...a.slice(index + 1, a.length),
    ]);

  const remove = (index) =>
    setArray((a) => [...a.slice(0, index), ...a.slice(index + 1, a.length)]);

  return [array, setArray, { push, filter, update, remove }];
}

export const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};
