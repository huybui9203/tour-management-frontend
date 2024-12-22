const formatLocalDate = (date) => {
  if (!date) {
    return;
  }
  const utcDate = new Date(date);

  const newTime = new Date(utcDate.getTime() + 7 * 60 * 60 * 1000);

  return newTime.toISOString();
};

export default formatLocalDate;
