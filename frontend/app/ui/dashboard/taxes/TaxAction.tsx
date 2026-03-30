"use client";

import { useState } from "react";
import { CreateTax, UpdateTax } from "./buttons";
import CreateTaxModal from "./createTaxModal";
import { tax } from "@/app/lib/types/types";
import EditTaxModal from "./editTaxModal";

export default function CreateTaxAction() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <CreateTax onOpen={() => setModalOpen(true)} />
      <CreateTaxModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

export function UpdateTaxAction({
  taxSelected,
}: {
  taxSelected: tax;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <UpdateTax onOpen={() => setModalOpen(true)} />
      <EditTaxModal
        tax={taxSelected}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
