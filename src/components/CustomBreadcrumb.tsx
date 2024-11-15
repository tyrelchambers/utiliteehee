"use client";

import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { data } from "@/index.routes";

const CustomBreadcrumb = () => {
  const [currentPath, setCurrentPath] = useState<string | undefined>("");
  useEffect(() => {
    const path = window.location.pathname;
    const entry = data.navMain.find((item) =>
      item.items.some((i) => i.url === path)
    );

    const currentPath = entry?.items.find((i) => i.url === path);
    setCurrentPath(currentPath?.title);
  }, []);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>{currentPath}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
