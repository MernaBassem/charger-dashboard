export const paths = {
  index: "/",
  // router.push(paths.auth.signin);
  auth: {
    signin: "/auth/signin",
  },
  chargers: {
    index: "/chargers",
    add: "/chargers/add",
    edit: "/chargers/edit/[chargerId]",
    addConnectors: "/chargers/edit/[chargerId]/connectors",
    ocpp: "/chargers/ocpp/[chargerId]",
  },
  locations: {
    index: "/locations",
  },
  sessions: {
    index: "/sessions",
  },
  revenue: {
    index: "/revenue",
  },
  tariffs: {
    index: "/tariffs",
    edit: "/tariffs/edit/[ownerId]",
  },
  customers: {
    index: "/customers",
    edit: "/customers/edit",
  },
  account: {
    index: "/account",
  },
};
