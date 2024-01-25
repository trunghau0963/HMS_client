import { ToolItemsProps } from "./config/model";
export const MAX_FREE_COUNT = 5;

export const THEME_MODES = [
  {
    label: "Light",
    value: "light",
  },
  {
    label: "Dark",
    value: "dark",
  },
];

export const NAVIGATIONS: ToolItemsProps[] = [
  {
    title: "Dashboard",
    icon: "/icons/dashboard.svg",
    url: "/dashboard",
  },
  {
    title: "Records",
    icon: "/icons/records.svg",
    url: "/records",
  },
  {
    title: "invoices",
    icon: "/icons/invoice.svg",
    url: "/invoices",
  },
  {
    title: "drugs",
    icon: "/icons/drugs.svg",
    url: "/drugs",
  },
  {
    title: "services",
    icon: "/icons/services.svg",
    url: "/services",
  },
  {
    title: "Settings",
    icon: "/icons/setting.svg",
    url: "/settings",
  },
];

export const NAVIGATIONS_LIGHT: ToolItemsProps[] = [
  {
    title: "Dashboard",
    icon: "/icons/dashboard-light.svg",
    url: "/dashboard",
  },
  {
    title: "Records",
    icon: "/icons/records-light.svg",
    url: "/records",
  },
  {
    title: "invoices",
    icon: "/icons/invoices-light.svg",
    url: "/invoices",
  },
  {
    title: "drugs",
    icon: "/icons/drugs-light.svg",
    url: "/drugs",
  },
  {
    title: "services",
    icon: "/icons/services-light.svg",
    url: "/services",
  },
  {
    title: "Settings",
    icon: "/icons/setting-light.svg",
    url: "/settings",
  },
];
