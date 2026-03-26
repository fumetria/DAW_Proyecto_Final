"use client";

import { useState } from "react";
import { CreatePaymentMethod, UpdatePaymentMethod } from "./buttons";
import { paymentMethod } from "@/app/lib/types/types";
import CreatePaymentMethodModal from "./createPaymentMethodModal";
import EditPaymentMethodModal from "./editPaymentMethodModal";

export function CreatePaymentMethodAction() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <CreatePaymentMethod onOpen={() => setModalOpen(true)} />
      <CreatePaymentMethodModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

export function UpdatePaymentMethodAction({
  paymentMethodSelected,
}: {
  paymentMethodSelected: paymentMethod;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <UpdatePaymentMethod onOpen={() => setModalOpen(true)} />
      <EditPaymentMethodModal
        paymentMethod={paymentMethodSelected}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
