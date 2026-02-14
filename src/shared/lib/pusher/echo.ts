import Echo from "laravel-echo";
import Pusher from "pusher-js";

let echoInstance: Echo<any> | null = null;

export const initializeEcho = (token: string) => {
  if (echoInstance) return echoInstance;

  window.Pusher = Pusher;

  echoInstance = new Echo<any>({
    broadcaster: "pusher",
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
    wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_API_URL ?? "https") === "https",
    enabledTransports: ["ws", "wss"],
    cluster: "mt1",
    authEndpoint: `${import.meta.env.VITE_API_URL}/api/broadcasting/auth`,
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return echoInstance;
};

export const leaveEchoChannel = (channelName: string) => {
  echoInstance?.leave(channelName);
};

export const getEchoInstance = () => echoInstance;
