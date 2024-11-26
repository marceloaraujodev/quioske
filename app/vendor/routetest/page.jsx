'use client'
import { useEffect, useState } from "react";
import CategoryList from "../../components/Category/CategoryList";
import Category from "../../components/Category/Category";
import MenuBtn from "@/app/ui/Menu/Menu";
import Footer from "../Footer/Footer";

export default function TestRoutes() {
  return (
    <>
      <MenuBtn />
      <CategoryList />
      <Category />
      <Footer />
    </>
  )
}