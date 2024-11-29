import React from "react";
import { Grid, Title, Text, GridProps, Stack } from "@mantine/core";

export interface SplitSectionProps extends GridProps {
  title: string;
  description: string | React.ReactNode;
  children: React.ReactNode;
}

export const SplitSection: React.FC<SplitSectionProps> = ({
  title,
  description,
  children,
  ...otherProps
}) => {
  return (
    <Grid {...otherProps}>
      <Grid.Col span={{ base: 12, md: 5 }}>
        <Stack gap="sm">
          <Title fz="md" order={2}>
            {title}
          </Title>
          <Text fz="sm" c="dimmed" component="div">
            {description}
          </Text>
        </Stack>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 7 }}>{children}</Grid.Col>
    </Grid>
  );
};
