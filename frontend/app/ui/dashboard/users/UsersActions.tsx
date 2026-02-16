"use client";

import { useState } from "react";
import { CreateUserButton } from "./buttons";
import CreateUserModal from "./CreateUserModal";

export default function UsersActions() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <CreateUserButton onOpen={() => setModalOpen(true)} />
      <CreateUserModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
