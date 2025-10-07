import UserSidebar from "./UserSidebar";

export default function UserDetails({ userData }) {
  const { name, email } = userData;

  return <UserSidebar />;
}
