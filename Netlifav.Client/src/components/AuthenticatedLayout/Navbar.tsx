import { useState } from "react";
import classes from "./Navbar.module.css";
import { AppShell, Button } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { axios, getToken } from "../../global";

const navLinks = [
  { link: "/", label: "Movies" },
  { link: "/genres", label: "Genres" },
  { link: "/actors", label: "Actors" },
];

export function Navbar() {
  const [active, setActive] = useState("Movies");
  const navigate = useNavigate();

  const links = navLinks.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <AppShell.Navbar className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>

      <div>
        <Button
          onClick={() => {
            const tokens = getToken();

            axios
              .get(`/auth/logout?rt=${tokens.refreshToken}`)
              .catch(() => {})
              .finally(() => {
                localStorage.clear();
                navigate("/auth/login");
              });
          }}
        >
          Logout
        </Button>
      </div>
    </AppShell.Navbar>
  );
}
