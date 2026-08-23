"use client";

import React from "react";
import { AssetRecord } from "@/modules/assets/types/asset_types";

interface MapCanvasProps {
  visibleAssets: AssetRecord[];
  selectedPinAsset: AssetRecord | null;
  onSelectPin: (asset: AssetRecord) => void;
  isLoading: boolean;
}

export function MapCanvas({
  visibleAssets,
  selectedPinAsset,
  onSelectPin,
  isLoading,
}: MapCanvasProps) {
  const minLat = 8.98;
  const maxLat = 9.04;
  const minLng = 38.73;
  const maxLng = 38.79;

  const toMapX = (lng: number) => {
    const norm = (lng - minLng) / (maxLng - minLng);
    return Math.max(10, Math.min(90, norm * 80 + 10));
  };

  const toMapY = (lat: number) => {
    const norm = (lat - minLat) / (maxLat - minLat);
    return Math.max(10, Math.min(90, (1 - norm) * 80 + 10));
  };

  if (isLoading) {
    return (
      <div className="text-sm font-normal text-muted-foreground">
        Loading GIS telemetry data...
      </div>
    );
  }

  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full object-cover select-none cursor-crosshair"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1" className="text-border/60" />
        </pattern>
        <radialGradient id="subcityGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="100" height="100" fill="url(#grid)" />
      <circle cx="50" cy="50" r="45" fill="url(#subcityGlow)" />

      {/* Stylized Municipal Road Arteries */}
      <path
        d="M 15 20 Q 45 40 85 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        className="text-border"
        strokeDasharray="2 1"
      />
      <path
        d="M 25 85 Q 50 50 75 15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        className="text-border"
      />
      <path
        d="M 10 50 L 90 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
        className="text-border/40"
      />
      <path
        d="M 50 10 L 50 90"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
        className="text-border/40"
      />

      <ellipse
        cx="50"
        cy="50"
        rx="32"
        ry="28"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        className="text-primary/30"
        strokeDasharray="1 1"
      />

      {/* Sub-City Labels */}
      <text x="30" y="32" className="text-[2.2px] fill-muted-foreground select-none font-normal" opacity="0.6">BOLE SUB-CITY</text>
      <text x="65" y="70" className="text-[2.2px] fill-muted-foreground select-none font-normal" opacity="0.6">KIRKOS SUB-CITY</text>
      <text x="20" y="75" className="text-[2.2px] fill-muted-foreground select-none font-normal" opacity="0.6">NIFAS SILK</text>
      <text x="60" y="25" className="text-[2.2px] fill-muted-foreground select-none font-normal" opacity="0.6">YEKA SUB-CITY</text>

      {/* Interactive Pins */}
      {visibleAssets.map((asset) => {
        const x = toMapX(asset.longitude);
        const y = toMapY(asset.latitude);
        const isSelected = selectedPinAsset?.id === asset.id;

        let fillColor = "#10b981";
        if (asset.status === "UNDER_MAINTENANCE") fillColor = "#f59e0b";
        if (asset.status === "DAMAGED") fillColor = "#ef4444";
        if (asset.status === "INACTIVE" || asset.status === "DECOMMISSIONED") fillColor = "#64748b";

        return (
          <g
            key={asset.id}
            onClick={() => onSelectPin(asset)}
            className="cursor-pointer transition-transform duration-150 hover:scale-125"
            style={{ transformOrigin: `${x}px ${y}px` }}
          >
            {asset.status === "DAMAGED" && (
              <circle
                cx={x}
                cy={y}
                r="3.5"
                fill="none"
                stroke="#ef4444"
                strokeWidth="0.4"
                opacity="0.7"
                className="animate-ping"
              />
            )}

            {isSelected && (
              <circle
                cx={x}
                cy={y}
                r="4"
                fill="none"
                stroke="#ffffff"
                strokeWidth="0.6"
                strokeDasharray="1 0.5"
              />
            )}

            <circle
              cx={x}
              cy={y}
              r={isSelected ? "2.2" : "1.6"}
              fill={fillColor}
              stroke="#000000"
              strokeWidth="0.4"
            />

            <text
              x={x + 2.5}
              y={y + 0.8}
              className="text-[1.8px] font-medium fill-foreground select-none pointer-events-none drop-shadow-md"
            >
              {asset.asset_code}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
