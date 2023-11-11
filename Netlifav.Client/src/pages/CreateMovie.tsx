import {
  Button,
  Container,
  MultiSelect,
  NumberInput,
  Paper,
  Select,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { CreateMovieSchema } from "../schema/create-movie.schema";
import { createMovie, getActors, getGenres } from "./global.api";
import classes from "./global.module.css";

import "@mantine/dates/styles.css";

function CreateMovie() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const genreQuery = useQuery({
    queryKey: ["get-genres"],
    queryFn: getGenres,
    select(data) {
      return data.map((genre: Record<string, unknown>) => ({
        label: genre.name,
        value: genre.id,
      }));
    },
  });

  const actorsQuery = useQuery({
    queryKey: ["get-actors"],
    queryFn: getActors,
    select(data) {
      return data.map((actors: Record<string, unknown>) => ({
        label: actors.name,
        value: actors.id,
      }));
    },
  });

  const form = useForm<Zod.infer<typeof CreateMovieSchema>>({
    validate: zodResolver(CreateMovieSchema),
  });

  const mutation = useMutation({
    mutationKey: ["create-movie"],
    mutationFn: createMovie,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["get-movies"],
      });

      navigate(-1);
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
          Create Movie
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
          <Stack gap={"10px"}>
            <TextInput
              label="Name"
              placeholder="Movie Name"
              required
              {...form.getInputProps("name")}
            />

            <NumberInput
              label="Rating"
              placeholder="eg: 7.9"
              max={10}
              min={0}
              decimalScale={1}
              required
              {...form.getInputProps("rating")}
            />

            <DatePickerInput
              label="Release Date"
              placeholder="10/10/2002"
              required
              {...form.getInputProps("releaseDate")}
            />

            <Select
              data={genreQuery.data ?? []}
              label="Genre"
              {...form.getInputProps("genre")}
            />

            <MultiSelect
              data={actorsQuery.data ?? []}
              label="Cast"
              {...form.getInputProps("casts")}
            />

            <Button
              fullWidth
              mt="xl"
              type="submit"
              loading={mutation.isPending}
            >
              Add movie
            </Button>
          </Stack>
        </Paper>
      </div>
    </Container>
  );
}

export default CreateMovie;
