import React from "react";
import {
  Center,
  LoadingOverlay,
  type LoadingOverlayProps,
} from "@mantine/core";

export const FullscreenLoader: React.FC<LoadingOverlayProps> = ({
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
