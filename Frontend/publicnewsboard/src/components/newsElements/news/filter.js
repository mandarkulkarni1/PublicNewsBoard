const filterUtil = function (data, value) {
  if (value === "Local News") {
    const dummy = JSON.parse(sessionStorage.getItem("reader"));
    const city = dummy[0].city;
    return data.filter((data) => data.city.toLowerCase() === city.toLowerCase());
  }
  else if (!value || value === 'ALL') {
    return data;
  }
  return data.filter((data) => data.category === value);
}
export default filterUtil;