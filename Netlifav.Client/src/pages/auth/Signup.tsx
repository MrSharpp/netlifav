import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import classes from "./AuthenticationTitle.module.css";
import { signupApiCall } from "./auth.api";
import { SignupSchema } from "../../schema/auth.schema";

function Signup() {
  const navigate = useNavigate();

  const form = useForm<Zod.infer<typeof SignupSchema>>({
    validate: zodResolver(SignupSchema),
  });

  const mutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: signupApiCall,

    onSuccess(data) {
      localStorage.setItem("auth", JSON.stringify(data));
      navigate("/");
    },

    onError(error) {
      console.log(error);

      form.setErrors({
        email:
          (error as AxiosError)?.response?.status === 409
            ? "email already exists"
            : "Internal server error",
      });
    },
  });

  return (
    <Container size={420} className={classes.container}>
      <div>
        <Title ta="center" className={classes.title}>
          Welcome
        </Title>

        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Already have an account?{" "}
          <Anchor size="sm" component={Link} to="/auth/login">
            Login
          </Anchor>
        </Text>

        <Paper
          withBorder
          shadow="md"
          p={30}
          mt={30}
          radius="md"
          component="form"
          onSubmit={form.onSubmit((values) => mutation.mutate(values))}
        >
          <Stack gap={"10px"}>
            <TextInput
              label="First Name"
              placeholder="John"
              {...form.getInputProps("firstName")}
            />
            <TextInput
              label="Last Name"
              placeholder="Doe"
              {...form.getInputProps("lastName")}
            />
            <TextInput
              label="Email"
              placeholder="john@doe.com"
              {...form.getInputProps("email")}
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              {...form.getInputProps("password")}
            />
          </Stack>

          <Button fullWidth mt="xl" loading={mutation.isPending} type="submit">
            Sign in
          </Button>
        </Paper>
      </div>
    </Container>
  );
}

export default Signup;
