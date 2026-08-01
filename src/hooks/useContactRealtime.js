import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext.jsx";
import { connectContactSocket, disconnectContactSocket } from "../socket/contactSocket.js";

const useContactRealtime = () => {
  const { admin } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!admin) return;

    const socket = connectContactSocket();

    const invalidate = () => {
      queryClient.invalidateQueries({ queryKey: ["contact-unread-count"] });
      queryClient.invalidateQueries({ queryKey: ["admin-contacts"] });
      queryClient.invalidateQueries({ queryKey: ["messages-stats"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    };

    socket.on("contact:new", invalidate);
    socket.on("contact:updated", invalidate);
    socket.on("connect", invalidate);

    return () => {
      socket.off("contact:new");
      socket.off("contact:updated");
      socket.off("connect");
      disconnectContactSocket();
    };
  }, [admin, queryClient]);
};

export default useContactRealtime;
