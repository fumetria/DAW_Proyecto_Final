import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicket,
  faCoins,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

const iconMap: { [key: string]: IconDefinition } = {
  tickets: faTicket,
  revenue: faCoins,
};

export function StatsCard({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "tickets" | "revenue";
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm dark:bg-slate-800">
      <div className="flex p-4">
        {Icon ? (
          <FontAwesomeIcon
            icon={Icon}
            className="h-5 w-5 text-gray-700 dark:text-gray-200"
          />
        ) : null}
        <h3 className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </h3>
      </div>
      <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl font-medium dark:bg-slate-900 dark:text-slate-50">
        {value}
      </p>
    </div>
  );
}

export default function StatsCards({
  totalTickets,
  totalRevenue,
  incomeThisMonth,
  incomeToday,
}: {
  totalTickets: number;
  totalRevenue: number;
  incomeThisMonth: number;
  incomeToday: number;
}) {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        <StatsCard
          title="Ingresos hoy"
          value={`${incomeToday.toFixed(2).toString().replace(".", ",")}€`}
          type="revenue"
        />
        <StatsCard
          title="Ingresos mes en curso"
          value={`${incomeThisMonth.toFixed(2).toString().replace(".", ",")}€`}
          type="revenue"
        />
        <StatsCard
          title="Tickets total año en curso"
          value={totalTickets}
          type="tickets"
        />
        <StatsCard
          title="Ingresos totales año en curso"
          value={`${totalRevenue.toFixed(2).toString().replace(".", ",")}€`}
          type="revenue"
        />
      </section>
    </>
  );
}
