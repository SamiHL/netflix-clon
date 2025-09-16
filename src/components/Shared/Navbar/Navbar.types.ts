import { UserNetflix } from "@prisma/client";
import { User } from "next-auth";

export type NavbarProps = {
    users: UserNetflix[]
};