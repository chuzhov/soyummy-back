const setPagination = (page, limit) => {
  if (page !== 0 && limit !== 0) {
    page = parseInt(page);
    limit = parseInt(limit);
    if (
      !isNaN(page) &&
      page > 0 &&
      !isNaN(limit) &&
      limit > 0
    ) {
      const skip = (page - 1) * limit;
      return { skip, limit };
    }
  }
  return null;
};

module.exports = setPagination;
