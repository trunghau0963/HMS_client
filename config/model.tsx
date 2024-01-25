export interface ToolItemsProps {
  icon: string;
  title: string;
  url: string;
}

export type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  admin: boolean;
};
