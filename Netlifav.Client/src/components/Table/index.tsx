import {
  Center,
  Group,
  ScrollArea,
  Table,
  Text,
  TextInput,
  UnstyledButton,
  keys,
  rem,
} from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconSelector,
} from "@tabler/icons-react";
import { useLayoutEffect, useState } from "react";
import classes from "./Table.module.css";

type RowData = Record<string, string>;

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => String(item[key]).toLowerCase().includes(query))
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return String(b[sortBy]).localeCompare(String(a[sortBy]));
      }

      return String(a[sortBy]).localeCompare(String(b[sortBy]));
    }),
    payload.search
  );
}

type AccessorString<T extends RowData[]> = keyof T[number];
type AccessorObject<T extends RowData[]> = {
  render(data: T[number]): JSX.Element | string;
  title: string;
};

interface Props<T extends RowData[]> {
  data: T;
  accessors: Array<AccessorString<T> | AccessorObject<T>>;
}

function TableSort<T extends RowData[]>({ data, accessors }: Props<T>) {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  useLayoutEffect(() => {
    setSortedData(
      sortData(data as unknown as RowData[], {
        sortBy,
        reversed: reverseSortDirection,
        search,
      }) as unknown as T
    );
  }, [data]);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);

    setSortedData(
      sortData(data as unknown as RowData[], {
        sortBy: field,
        reversed,
        search,
      }) as unknown as T
    );
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data as unknown as RowData[], {
        sortBy,
        reversed: reverseSortDirection,
        search: value,
      }) as unknown as T
    );
  };

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.id}>
      {accessors.map((accessor) => {
        if (typeof accessor === "string") {
          return <Table.Td key={accessor.toString()}>{row[accessor]}</Table.Td>;
        }

        return (
          <Table.Td key={(accessor as AccessorObject<T>).title}>
            {(accessor as AccessorObject<T>).render(row)}
          </Table.Td>
        );
      })}
    </Table.Tr>
  ));

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        leftSection={
          <IconSearch
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        }
        value={search}
        onChange={handleSearchChange}
      />
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        layout="fixed"
      >
        <Table.Thead>
          <Table.Tr>
            {accessors.map((accessor) => {
              const title =
                typeof accessor === "string"
                  ? accessor
                  : (accessor as AccessorObject<T>).title;

              return (
                <Th
                  sorted={sortBy === title.toLowerCase()}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting(title.toLowerCase())}
                  key={title}
                >
                  {title}
                </Th>
              );
            })}
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={data[0] ? Object.keys(data[0]).length : 1}>
                <Text fw={500} ta="center">
                  Nothing found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}

export { TableSort as Table };
