export const supportedRoles = [
  "owner-role",
  "admin-role",
  "moderator-role",
  "owner-role",
  "user-role",
];

export const getRoleName = (roles: string[]) => {
  let auxRole = "";
  roles.some((role) => {
    if (role === "owner-roles") return (auxRole = "CEO");
    if (role === "admin-roles") return (auxRole = "Administrador");
    if (role === "moderator-roles") return (auxRole = "Moderador");
    if (role === "super-user") return (auxRole = "Super usuario");
    if (role === "user") return (auxRole = "usuario");
  });
  return auxRole;
};
