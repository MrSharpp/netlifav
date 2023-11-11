import { useMutation, useQuery } from "@tanstack/react-query";
import { Table } from "../components/Table";
import { deleteMovieApiCall, getMovies } from "./global.api";
import {
  ActionIcon,
  Button,
  Group,
  LoadingOverlay,
  Title,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { IconPencil, IconTrash } from "@tabler/icons-react";

export default function Movies() {
  const navigate = useNavigate();
  const movieQuery = useQuery({
    queryKey: ["get-movies"],
    queryFn: getMovies,
  });

  const deleteMovieMutation = useMutation({
    mutationKey: ["delete-movie"],
    mutationFn: deleteMovieApiCall,

    onSuccess() {
      movieQuery.refetch();
    },
  });

  return (
    <div>
      <Group mb="md" justify="space-between">
        <Title> Movies </Title>

        <Button component={Link} to={"/create-movie"}>
          Create New
        </Button>
      </Group>

      <LoadingOverlay visible={movieQuery.isLoading} />

      <Table
        data={movieQuery.data ?? []}
        accessors={[
          "title",
          "rating",
          {
            title: "Release Date",
            render(data) {
              return new Date(data.releaseDate).toLocaleString();
            },
          },
          {
            title: "Genre",
            render(data) {
              return data.genre.name;
            },
          },
          {
            title: "Cast",
            render(data) {
              return data.casts
                .map((cast: Record<string, unknown>) => cast.name)
                .join(", ");
            },
          },
          {
            title: "Actions",
            render(data) {
              return (
                <Group>
                  <ActionIcon
                    onClick={() => {
                      navigate(`edit/${data.id}`, { state: data });
                    }}
                  >
                    <IconPencil size={18} />
                  </ActionIcon>

                  <ActionIcon
                    onClick={() => {
                      deleteMovieMutation.mutate(data.id);
                    }}
                    color="red"
                  >
                    <IconTrash size={18} />
                  </ActionIcon>
                </Group>
              );
            },
          },
        ]}
      />
    </div>
  );
}
