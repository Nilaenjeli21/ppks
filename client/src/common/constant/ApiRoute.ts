const apiRoute = {
  users: {
    index: "/users",
    login: "/users/login",
    register: "/users/register",
    current: "/users/current",
    detail: "/users/:id",
    password: "/users/:id/password",
  },
  complaints: {
    index: "/complaints",
    destroy: `/complaints/:id`,
    create: "/complaints",
    status: "/complaints/status-count",
    close: "/complaints/:id/close",
  },
  upload: {
    index: "/file-upload",
  },
  proof: {
    index: "/proofs",
  },
  recommendation: {
    index: "/recommendations",
  },
  applog: {
    index: "/applogs",
  },
  user: {
    index: "/user",
  },
  rule: {
    index: "/rules",
    detail: "/rules/:id",
  },
};

export default apiRoute;
