/**
 * Types used by the reusable Pagination component and paginated dashboard pages.
 */

/**
 * Props for the Pagination component.
 * Used to render previous/next and page number links while preserving current URL search params.
 */
export type PaginationProps = {
    /** Total number of items across all pages (used to compute total pages). */
    totalCount: number;
    /** Current 1-based page number. */
    currentPage: number;
    /**
     * Optional list of URL search param keys to preserve when building page links.
     * E.g. ["query", "tab", "dateFrom", "dateTo"] so search and filters are kept when changing page.
     */
    preserveParams?: string[];
};