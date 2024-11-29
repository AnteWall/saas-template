import React from "react";
import classes from "./AuthLayoutWrapper.module.css";
import { Affix, Anchor, Center, Group, Stack, Title } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Logo } from "../../Logo";

export interface AuthLayoutWrapperProps {
  title: string | React.ReactNode;
  subTitle: React.ReactNode;
  children: React.ReactNode;
}

const BACK_TO_APP_URL = "http://localhost:3000";

export const AuthLayoutWrapper: React.FC<AuthLayoutWrapperProps> = ({
  title,
  subTitle,
  children,
}) => {
  return (
    <div>
      <div className={classes.background} />
      <Affix
        position={{
          top: 0,
          left: 0,
        }}
        className={classes.affix}
      >
        <Anchor href={BACK_TO_APP_URL} fz="sm">
          <Group gap={4}>
            <IconArrowLeft size={16} stroke={1.6} />
            Back to App
          </Group>
        </Anchor>
      </Affix>
      <Center>
        <div className={classes.wrapper}>
          <Stack gap="sm">
            <Center>
              <Logo />
            </Center>
            <Title ta="center" order={1}>
              {title}
            </Title>
            {subTitle}
            {children}
          </Stack>
        </div>
      </Center>
    </div>
  );
};
