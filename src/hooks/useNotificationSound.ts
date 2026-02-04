import cookieServices from "@/utils/cookieServices";
import { useEffect, useRef, useState } from "react";

const useNotificationSound = () => {
  const role = cookieServices.getUser()?.role;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (role === "doctor") return;
    audioRef.current = new Audio("/sounds/notification.mp3");
    audioRef.current.load();

    const activateSound = () => {
      if (!enabled && audioRef.current) {
        audioRef.current.muted = true;
        audioRef.current.volume = 0;
        audioRef.current.play().then(() => {
          audioRef.current!.pause();
          audioRef.current!.currentTime = 0;
          audioRef.current!.muted = false;
          audioRef.current!.volume = 1;
          setEnabled(true);
        });
      }
    };

    window.addEventListener("click", activateSound, { once: true });
    window.addEventListener("scroll", activateSound, { once: true });
    window.addEventListener("keydown", activateSound, { once: true });

    return () => {
      window.removeEventListener("click", activateSound);
      window.removeEventListener("scroll", activateSound);
      window.removeEventListener("keydown", activateSound);
    };
  }, [enabled, role]);

  const playNotificationSound = () => {
    if (enabled && audioRef.current) audioRef.current.play();
  };

  return { playNotificationSound };
};

export default useNotificationSound;
