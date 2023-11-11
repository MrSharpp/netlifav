import { AppShell } from "@mantine/core";
import { Navigate, Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

function AuthenticatedLayout() {
  const token = localStorage.getItem("auth");

  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <AppShell navbar={{ width: 300, breakpoint: "sm" }} padding="md">
      <Navbar />

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default AuthenticatedLayout;
