export const isValid = (v) => {
  if (typeof v !== "undefined" && v !== null) return true;
  return false;
};

export const formatMoney = (input) => {
  if (!isValid(input)) return "";
  input = input.toString();
  const pos = input.indexOf(".");
  if (pos >= 0) {
    const left = input.substring(0, pos);
    let right = input.substring(pos + 1);
    if (right.length === 1) {
      right += "0";
    }
    if (right.length > 2) {
      right = right.substring(0, 2);
    }
    const result = `${left}.${right}`;
    return Number(result).toFixed(2);
  }
  return "0.00";
};

export const getTotal = (filteredData) => {
  return filteredData.reduce((acc, cur) => {
    return acc + +cur.price;
  }, 0);
};

export const getItemCategory = (c, state) => {
  if (typeof c === "number") {
    const categoryRecord = state.categories.find((cat) => cat.id === c);
    if (categoryRecord) {
      return categoryRecord.name;
    } else {
      return "";
    }
  }
  return c;
};
