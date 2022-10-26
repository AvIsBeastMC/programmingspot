import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

interface NavProps {
  title: string;
  href: string;
}

export const NavLink = (props: NavProps) => {
  const router = useRouter();

  return (
    <Link href={props.href}>
      <a
        className={
          props.href == router.pathname
            ? `border-b-2 border-dashed border-gray-500 mr-5 hover:text-black`
            : "mr-5 hover:text-black"
        }
      >
        {props.title}
      </a>
    </Link>
  );
};