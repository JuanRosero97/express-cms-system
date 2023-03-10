import { CollectionConfig } from "payload/types";
import { isAdmin, isAdminFieldLevel } from "../access/isAdmin";
import { isAdminOrSelf } from "../access/isAdminOrSelf";

const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
    disableDuplicate: true,
  },
  access: {
    // Only admins can create users
    create: isAdmin,
    // Admins can read all, but any other logged in user can only read themselves
    read: isAdminOrSelf,
    // Admins can update all, but any other logged in user can only update themselves
    update: isAdminOrSelf,
    // Only admins can delete
    delete: isAdmin,
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "Nombre",
          type: "text",
          required: true,
        },
        {
          name: "Apellido",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "roles",
      saveToJWT: true,
      type: "select",
      hasMany: false,
      defaultValue: ["editor"],
      access: {
        // Only admins can create or update a value for this field
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "Editor",
          value: "editor",
        },
        {
          label: "Lector",
          value: "lector",
        },
      ],
    },
  ],
};

export default Users;
