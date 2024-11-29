import React from "react";
import {
  Center,
  LoadingOverlay,
  LoadingOverlayProps,
  Overlay,
} from "@mantine/core";

export interface FullscreenLoaderProps extends LoadingOverlayProps {}

export const FullscreenLoader: React.FC<FullscreenLoaderProps> = ({
  visible = true,
  overlayProps,
}) => {
  return (
    <LoadingOverlay
      overlayProps={{
        backgroundOpacity: 1,
        color: "var(--mantine-color-dark-9)",
        ...overlayProps,
      }}
      visible={visible}
    >
      <Center>Loading...</Center>
    </LoadingOverlay>
  );
};
