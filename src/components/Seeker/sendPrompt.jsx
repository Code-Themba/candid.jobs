import { useCallback } from "react";

export function useSendPrompt({ onPrompt } = {}) {
  const sendPrompt = useCallback(
    (text) => {
      if (!text) return;

      if (import.meta.env.DEV) {
        console.info("[Candid.jobs] sendPrompt:", text);
      }

      if (typeof onPrompt === "function") {
        onPrompt(text);
      }
    },
    [onPrompt],
  );

  return sendPrompt;
}
