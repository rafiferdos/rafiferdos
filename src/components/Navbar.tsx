"use client";

import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";

const Navbar = ({ className }: { className?: string }) => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <>
      <div
        className={cn(
          "fixed top-7 inset-x-0 max-w-4xl mx-auto z-50",
          className
        )}
      >
        <Menu setActive={setActive}>
          <Link href={"/"}>
            <MenuItem setActive={setActive} active={active} item="Home" />
          </Link>
          <Link href={"/projects"}>
            <MenuItem
              setActive={setActive}
              active={active}
              item="My Projects"
            />
          </Link>
          <Link href={"/skills"}>
            <MenuItem setActive={setActive} active={active} item="My Skills" />
          </Link>
          <Link href={"/about_me"}>
            <MenuItem setActive={setActive} active={active} item="About Me" />
          </Link>
          <Link href={"/education"}>
            <MenuItem setActive={setActive} active={active} item="Education" />
          </Link>
          <Link href={"/contact"}>
            <MenuItem setActive={setActive} active={active} item="Contact" />
          </Link>
        </Menu>
      </div>
    </>
  );
};

export default Navbar;
