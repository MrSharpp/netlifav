import { useQuery } from "@tanstack/react-query";
import { getGenres } from "./global.api";
import { Button, Group, LoadingOverlay, Title } from "@mantine/core";
import { Table } from "../components/Table";
import { Link } from "react-router-dom";

function Genre() {
  const genreQuery = useQuery({
    queryKey: ["get-genres"],
    queryFn: getGenres,
  });

  return (
    <div>
      <Group mb="md" justify="space-between">
        <Title> Genre </Title>

        <Button component={Link} to={"/create-genre"}>
          Create New
        </Button>
      </Group>
      <LoadingOverlay visible={genreQuery.isLoading} />

      <Table data={genreQuery.data ?? []} accessors={["id", "name"]} />
    </div>
  );
}

export default Genre;
