import { useQueryClient } from "@tanstack/react-query";
import { Wifi, WifiOff } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "react-toastify";

const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const queryClient = useQueryClient();

  const wasOffline = useRef<boolean>(!navigator.onLine);

  const updateOnlineStatus = useCallback(() => {
    const currentStatus = navigator.onLine;
    setIsOnline(currentStatus);
    queryClient.invalidateQueries();

    if (currentStatus && wasOffline.current) {
      toast.success("تم إعادة الاتصال بالإنترنت", {
        icon: <Wifi className="text-green-600" />,
      });
    }

    wasOffline.current = !currentStatus;
  }, [queryClient]);

  useEffect(() => {
    if (!isOnline) {
      toast.warn("لا يوجد اتصال بالانترنت", {
        autoClose: isOnline ? 5000 : false,
        icon: <WifiOff className="text-muted-foreground" />,
      });
    }
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, [updateOnlineStatus, isOnline]);

  return;
};

export default useNetworkStatus;
