import { Button, Container, Paper, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { CreateActorOrGenreSchema } from "../schema/create-actor-genre.schema";
import { createActor, createGenre } from "./global.api";
import classes from "./global.module.css";

function CreateActorOrGenre(props: { type: "genre" | "actor" }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<Zod.infer<typeof CreateActorOrGenreSchema>>({
    validate: zodResolver(CreateActorOrGenreSchema),
  });

  const mutation = useMutation({
    mutationKey: ["create", props.type],
    mutationFn: props.type === "actor" ? createActor : createGenre,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [props.type === "actor" ? "get-actors" : "get-genres"],
      });

      navigate(-1);
    },

    onError(error) {
      console.log(error);
    },
  });

  return (
    <Container size={420} className={classes.container}>
      <div>
        <Title ta="center" className={classes.title}>
          Create New {props.type}
        </Title>

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
            label="Name"
            placeholder={`${props.type} Name`}
            required
            {...form.getInputProps("name")}
          />

          <Button fullWidth mt="xl" type="submit" loading={mutation.isPending}>
            Create {props.type}
          </Button>
        </Paper>
      </div>
    </Container>
  );
}

export default CreateActorOrGenre;
