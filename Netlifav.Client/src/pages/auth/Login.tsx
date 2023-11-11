import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import classes from "./AuthenticationTitle.module.css";
import { useForm, zodResolver } from "@mantine/form";
import { LoginSchema } from "../../schema/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { loginApiCall } from "./auth.api";
import { AxiosError } from "axios";

function Login() {
  const navigate = useNavigate();

  const form = useForm<Zod.infer<typeof LoginSchema>>({
    validate: zodResolver(LoginSchema),
  });

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: loginApiCall,

    onSuccess(data) {
      localStorage.setItem("auth", JSON.stringify(data));
      navigate("/");
    },

    onError(error) {
      form.setErrors({
        email:
          (error as AxiosError)?.response?.status === 401
            ? "Invalid email or password"
            : "Internal server error",
      });
    },
  });

  return (
    <Container size={420} className={classes.container}>
      <div>
        <Title ta="center" className={classes.title}>
          Welcome back!
        </Title>

        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor size="sm" component={Link} to="/auth/signup">
            Create account
          </Anchor>
        </Text>

        <Paper
          withBorder
          shadow="md"
          p={30}
          mt={30}
          radius="md"
          component="form"
          onSubmit={form.onSubmit((vals) => mutation.mutate(vals))}
        >
          <TextInput
            label="Email"
            placeholder="john@doe.com"
            required
            {...form.getInputProps("email")}
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps("password")}
          />

          <Button fullWidth mt="xl" type="submit" loading={mutation.isPending}>
            Sign in
          </Button>
        </Paper>
      </div>
    </Container>
  );
}

export default Login;
