import { Container, Title, Text, Anchor, Center, Stack } from "@mantine/core";
import { Link } from "react-router";

export const Error404: React.FC = () => {
  return (
    <Container mt="200">
      <Stack>
        <Title ta="center" order={1}>
          404 - Not Found
        </Title>
        <Text ta="center">The page you are looking for does not exist.</Text>
        <Center>
          <Anchor ta="center" component={Link} to="/">
            Go to home page
          </Anchor>
        </Center>
      </Stack>
    </Container>
  );
};
