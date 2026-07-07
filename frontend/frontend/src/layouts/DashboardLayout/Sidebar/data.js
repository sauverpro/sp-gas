import {
  AssignmentTurnedInOutlined,
  GridViewOutlined,
  StorefrontOutlined,
  LocalGasStationOutlined,
  AccountCircleOutlined,
  InboxOutlined,
  PriceCheckOutlined,
  ManageAccountsRounded,
  AddBusinessOutlined,
  DeliveryDining,
} from "@material-ui/icons/";

export const adminMenu = [
  {
    title: "Dashboard",
    icon: GridViewOutlined,
    href: "/dashboard/stats",
  },
  {
    title: "Stock",
    icon: StorefrontOutlined,
    href: "/dashboard/adminstock",
  },
  {
    title: "Stations",
    icon: LocalGasStationOutlined,
    href: "/dashboard/adminstations",
  },
  {
    title: "Station Orders",
    icon: AssignmentTurnedInOutlined,
    href: "/dashboard/adminstationorders",
  },
  {
    title: "User Orders",
    icon: AccountCircleOutlined,
    href: "/dashboard/adminuserorders",
  },
  {
    title: "External Orders",
    icon: InboxOutlined,
    href: "/dashboard/adminexternalorders",
  },
  {
    title: "Tarrifs",
    icon: PriceCheckOutlined,
    href: "/dashboard/admintariff",
  },
  {
    title: "Add Ons Stock",
    icon: StorefrontOutlined,
    href: "/dashboard/adminaddons",
  },
  {
    title: "Managers",
    icon: ManageAccountsRounded,
    href: "/dashboard/adminmanagers",
  },
  {
    title: "Drivers",
    icon: DeliveryDining,
    href: "/dashboard/drivers",
  },
];

export const managerMenu = [
  {
    title: "Dashboard",
    icon: GridViewOutlined,
    href: "/dashboard/stationmanagerdashboard",
  },
  {
    title: "Stock",
    icon: StorefrontOutlined,
    href: "/dashboard/stationmanagerstock",
  },
  {
    title: "Request Stock",
    icon: AddBusinessOutlined,
    href: "/dashboard/stationmanagerrequestedstock",
  },
  {
    title: "Assigned Orders ",
    icon: AccountCircleOutlined,
    href: "/dashboard/stationmanagerassignedorder",
  },
  {
    title: "External Order",
    icon: InboxOutlined,
    href: "/dashboard/stationmanagerexternalorder",
  },
];
