import cookieServices from "@/utils/cookieServices";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: "pusher",
  key: import.meta.env.VITE_API_URL,
  wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
  wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
  forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? "https") === "https",
  enabledTransports: ["ws", "wss"],
  cluster: "mt1",
  authEndpoint: `${import.meta.env.VITE_PUSHER_HOST}/api/broadcasting/auth`,
  auth: {
    headers: {
      Authorization: `Bearer ${cookieServices.getToken()}`,
    },
  },
});

export default echo;
