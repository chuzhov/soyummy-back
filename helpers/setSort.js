const setSort = (
  Model,
  sort_field,
  sort_order
) => {
  if (
    Object.keys(Model.schema.paths).indexOf(
      sort_field
    ) > -1 &&
    (sort_order === "1" ||
      sort_order === "-1" ||
      sort_order === "asc" ||
      sort_order === "desc")
  ) {
    return { sort: { [sort_field]: sort_order } };
  }
  return null;
};

module.exports = setSort;
