"use client";

import { useState } from "react";
import { CreateCategory, UpdateCategory } from "./buttons";
import CreateCategoryModal from "./createCategoryModal";
import { category } from "@/app/lib/types/types";
import EditCategoryModal from "./editCategoryModal";

export default function CreateCategoryAction() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <CreateCategory onOpen={() => setModalOpen(true)} />
      <CreateCategoryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

export function UpdateCategoryAction({
  categorySelected,
}: {
  categorySelected: category;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <UpdateCategory onOpen={() => setModalOpen(true)} />
      <EditCategoryModal
        category={categorySelected}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
