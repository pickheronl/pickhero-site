m"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface BarcodeScannerProps {
  isScanning: boolean;
  className?: string;
  lineColor?: string;
  duration?: number;
}

export function BarcodeScanner({
  isScanning,
  className,
  lineColor = "rgb(239, 68, 68)", // red-500
  duration = 1.5,
}: BarcodeScannerProps) {
  const lineStyle = {
    backgroundColor: lineColor,
    boxShadow: `0 0 8px ${lineColor}, 0 0 16px ${lineColor}`,
  };

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      {isScanning && (
        <>
          {/* Line moving upward */}
          <div
            className="absolute left-0 right-0 h-0.5 opacity-80 animate-scan-up"
            style={{
              ...lineStyle,
              animationDuration: `${duration}s`,
            }}
          />
          {/* Line moving downward */}
          <div
            className="absolute left-0 right-0 h-0.5 opacity-80 animate-scan-down"
            style={{
              ...lineStyle,
              animationDuration: `${duration}s`,
            }}
          />
        </>
      )}
    </div>
  );
}

interface BarcodeScannerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  scannerClassName?: string;
  lineColor?: string;
  duration?: number;
}

export function BarcodeScannerButton({
  children,
  className,
  scannerClassName,
  lineColor,
  duration,
  ...props
}: BarcodeScannerButtonProps) {
  const [isScanning, setIsScanning] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsScanning(true);
    props.onClick?.(e);

    // Auto-stop after a few cycles (optional - remove if you want manual control)
    setTimeout(() => setIsScanning(false), (duration || 1.5) * 3 * 1000);
  };

  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-lg overflow-hidden",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <BarcodeScanner
        isScanning={isScanning}
        className={cn("absolute inset-0", scannerClassName)}
        lineColor={lineColor}
        duration={duration}
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
