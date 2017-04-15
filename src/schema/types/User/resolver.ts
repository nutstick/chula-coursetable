const resolver = {
  User: {
    coursetables(root, args) {
      return root.coursetables;
    },
    coursetable(root, { id }) {
      return root.coursetables.find((ct) => ct._id === id);
    },
  },
};

export default resolver;
