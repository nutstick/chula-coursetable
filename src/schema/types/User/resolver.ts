const resolver = {
  User: {
    coursetables(root, args) {
      return root.coursetables;
    },
  },
};

export default resolver;
