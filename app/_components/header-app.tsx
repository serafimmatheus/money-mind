"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Logo from "./logo";
import { usePathname } from "next/navigation";

const HeaderApp = () => {
  const pathName = usePathname();

  const isPageSize = window.screen.width < 768;

  return (
    <header className="mb-8 border-b py-6">
      <div className="container flex items-center justify-between">
        <nav className="flex items-center space-x-12">
          <Logo />

          <ul className="hidden items-center space-x-4 md:flex">
            <Link href={"/"}>
              <li
                className={`text-muted-foreground hover:underline ${
                  pathName === "/" ? "text-primary-foreground" : ""
                }`}
              >
                Dashboard
              </li>
            </Link>

            <Link href={"/transacoes"}>
              <li
                className={`text-muted-foreground hover:underline ${
                  pathName === "/transacoes" ? "text-primary-foreground" : ""
                }`}
              >
                Transações
              </li>
            </Link>

            <Link href={"/assinaturas"}>
              <li
                className={`text-muted-foreground hover:underline ${
                  pathName === "/assinaturas" ? "text-primary-foreground" : ""
                }`}
              >
                Assinaturas
              </li>
            </Link>
          </ul>
        </nav>

        {isPageSize ? <UserButton /> : <UserButton showName />}
      </div>
    </header>
  );
};

export default HeaderApp;
