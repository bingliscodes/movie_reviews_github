import SidebarWithHeader from "./UserSidebar";

export default function UserDetails({ userData }) {
  const { name, email } = userData;

  return <SidebarWithHeader />;
}
