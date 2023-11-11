import { useQuery } from "@tanstack/react-query";
import { Button, Group, LoadingOverlay, Title } from "@mantine/core";
import { Table } from "../components/Table";
import { getActors } from "./global.api";
import { Link } from "react-router-dom";

function Actors() {
  const actorsQuery = useQuery({
    queryKey: ["get-actors"],
    queryFn: getActors,
  });

  console.log(actorsQuery.data ?? []);

  return (
    <div>
      <Group mb="md" justify="space-between">
        <Title> Actors (movie cast) </Title>

        <Button component={Link} to={"/create-actor"}>
          Create New
        </Button>
      </Group>

      <LoadingOverlay visible={actorsQuery.isLoading} />

      <Table data={actorsQuery.data ?? []} accessors={["id", "name"]} />
    </div>
  );
}

export default Actors;
