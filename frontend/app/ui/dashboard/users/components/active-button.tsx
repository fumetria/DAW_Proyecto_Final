"use client";

import type { UserRow } from "@/app/lib/types/types";
import { toggleUserActive } from "@/app/lib/actions";

interface IsActiveUserProps {
  user: UserRow;
}

export default function IsActiveUser({ user }: IsActiveUserProps) {
  return (
    <form action={toggleUserActive}>
      <input type="hidden" name="userId" value={user.id} />
      <input
        type="checkbox"
        name="isActive"
        defaultChecked={!!user.is_active}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className="h-5 w-5 cursor-pointer accent-blue-600 dark:accent-cyan-600"
      />
    </form>
  );
}
