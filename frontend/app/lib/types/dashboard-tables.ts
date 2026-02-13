/**
 * Row types for dashboard list/table components.
 * These describe the shape of data passed to dashboard tables (articles, categories, users)
 * for display, often a subset or view of the full DB model.
 */

/**
 * One row in the dashboard "Mantenimiento artículos" table.
 * Matches the article view used for listing: code, name, category name, price, active flag.
 */
export type ArticleRow = {
  articleID: string;
  articleCOD: string;
  articleName: string;
  articleCategory: string;
  articlePvp: number;
  articleIsActive: boolean | null;
};

/**
 * One row in the dashboard "Mantenimiento categorías" table.
 * Category id and name only.
 */
export type CategoryRow = {
  id: number;
  name: string;
};

/**
 * One row in the dashboard "Mantenimiento usuarios" table.
 * Safe user fields only (no password, no DNI). Used for listing users with pagination.
 */
export type UserRow = {
  id: string;
  email: string;
  name: string;
  surname1: string;
  surname2: string | null;
  is_employee: boolean | null;
  is_admin: boolean | null;
  is_active: boolean | null;
};
