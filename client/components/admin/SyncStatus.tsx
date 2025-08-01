import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Wifi, AlertCircle } from "lucide-react";

interface SyncStatusProps {
  lastUpdated?: string;
}

export function SyncStatus({ lastUpdated }: SyncStatusProps) {
  const [status, setStatus] = useState<"synced" | "syncing" | "error">("synced");
  
  useEffect(() => {
    if (lastUpdated) {
      setStatus("syncing");
      const timer = setTimeout(() => {
        setStatus("synced");
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [lastUpdated]);

  const getStatusConfig = () => {
    switch (status) {
      case "syncing":
        return {
          icon: <Wifi className="w-3 h-3 animate-pulse" />,
          text: "Syncing...",
          className: "bg-blue-600 text-white",
        };
      case "synced":
        return {
          icon: <CheckCircle className="w-3 h-3" />,
          text: "Live on website",
          className: "bg-green-600 text-white",
        };
      case "error":
        return {
          icon: <AlertCircle className="w-3 h-3" />,
          text: "Sync error",
          className: "bg-red-600 text-white",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Badge className={`${config.className} text-xs flex items-center space-x-1`}>
      {config.icon}
      <span>{config.text}</span>
    </Badge>
  );
}
