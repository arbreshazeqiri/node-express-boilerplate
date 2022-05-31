const allRoles = {
  user: ['manageProducts','getProducts', 'getUsers', 'manageUsers'],
  admin: ['getUsers', 'manageUsers','manageProducts','getProducts'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
