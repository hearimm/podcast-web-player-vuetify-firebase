export default value => {
  const date = new Date(value);
  const dateString = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  if (dateString === "Invalid Date") {
    return "";
  }
  return dateString;
};
