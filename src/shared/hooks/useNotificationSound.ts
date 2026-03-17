import cookieServices from "@/shared/utils/cookieServices";
import { useEffect, useRef, useState } from "react";

const useNotificationSound = () => {
  const role = cookieServices.getUser()?.role;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (role === "doctor" || enabled) return;

    const audio = new Audio("/sounds/notification.mp3");
    audioRef.current = audio;
    audio.load();

    const activateSound = () => {
      audio.muted = true;
      audio.volume = 0;
      audio.play().then(() => {
        audio.pause();
        audio.currentTime = 0;
        audio.muted = false;
        audio.volume = 1;
        setEnabled(true);
      });
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
