console.log("you are ready to start coding");
import { isValid, formatMoney } from "./utils";
import {
  updateData,
  getData,
  getCategories,
  deleteItemFromSql,
  sendCategory,
} from "./api";
import Box from "./Box";
import "./styles.css";

// we need to add an event that will let us know when the data is finished loading
const dataLoaded = new CustomEvent("onDataLoaded");
window.addEventListener("onDataLoaded", () => {
  console.log("onDataLoaded has been dispatched");
  runSampleCode();
});
const categoriesLoaded = new CustomEvent("onCategoriesLoaded");
window.addEventListener("onCategoriesLoaded", () => {
  runCategoryCode();
});

// create a toast container
const toastContainer = document.createElement("div");
toastContainer.id = "toastContainer";
toastContainer.classList.add("toast-container");
document.body.appendChild(toastContainer);

let data = [];

export const state = {
  items: data,
  currentItem: {
    name: "",
    size: "",
    price: 0,
    category: "",
  },
  priceSortDirection: "down",
  sortType: "price",
  categories: [],
};

const saveCategoryToServer = () => {
  debugger;
  const categoryName = document.getElementById("add-category-input").value;
  sendCategory(categoryName)
    .then((res) => {
      const j = res.data;
      if (j.error == 0) {
        const modal = document.getElementById("modal-one");
        modal.classList.remove("open");
        modal.classList.add("closed");
        buildTable();
      } else {
        createToast(j.msg, "Warning");
      }
    })
    .catch((err) => {
      createToast(err.message, "Error");
    });
};

export const getTotal = () => {
  return filteredData.reduce((acc, cur) => {
    return acc + +cur.price;
  }, 0);
};

export const clearForm = () => {
  Object.keys(state.currentItem).map((key) => {
    document.getElementById(key).value = "";
  });
};

export const compare = (a, b) => {
  const fieldA = a[state.sortType];
  const fieldB = b[state.sortType];

  let descriptor = "priceSortDirection";
  if (state.sortType == "name") {
    descriptor = "nameSortDirection";
  } else if (state.sortType == "size") {
    descriptor = "sizeSortDirection";
  } else if (state.sortType == "category") {
    descriptor = "categorySortDirection";
  }

  let comparison = 0;
  if (fieldA > fieldB) {
    if (state[descriptor] == "down") {
      comparison = 1;
    } else {
      comparison = -1;
    }
  } else if (fieldA < fieldB) {
    if (state[descriptor] == "down") {
      comparison = -1;
    } else {
      comparison = 1;
    }
  }
  return comparison;
};

export const sortData = () => {
  const sortedData = [...filteredData].sort(compare);
  setFilteredData(sortedData);
  buildTable();
};

export const getOurData = () => {
  getData()
    .then((res) => {
      const j = res.data;
      if (j.error === 0) {
        data = j.data;
        filteredData = j.data;
        state.items = j.data;
        window.dispatchEvent(dataLoaded);
        buildTable();
      } else {
        createToast(j.msg, "warning");
      }
    })
    .catch((err) => {
      createToast(err, "Error");
    });
};

getOurData();

const getOurCategories = () => {
  getCategories()
    .then((res) => {
      const j = res.data;
      if (j.error === 0) {
        state.categories = j.data;
        window.dispatchEvent(categoriesLoaded);
      } else {
        createToast(j.msg, "Warning");
      }
    })
    .catch((err) => {
      createToast(err, "Error");
    });
};

getOurCategories();

export let filteredData = data;

export const setFilteredData = (data) => {
  filteredData = data;
};

const getCheapestItem = () => {
  return filteredData.reduce((acc, cur) => {
    if (acc.price < cur.price) {
      return acc;
    } else {
      return cur;
    }
  }, 9999);
};

const displayCheapestItem = () => {
  const parent = document.getElementById("stats");
  const divName = "cheapest-div";
  const existing = document.getElementById(divName);
  if (existing) {
    parent.removeChild(existing);
  }
  const cheapest = getCheapestItem();
  const div = document.createElement("div");
  div.id = divName;
  div.innerHTML = `The cheapest item is ${
    cheapest.name
  } and it is ${formatMoney(cheapest.price)}`;
  parent.appendChild(div);
};

const mostExpensive = () => {
  return filteredData.reduce((acc, cur) => {
    if (acc.price > cur.price) {
      return acc;
    } else {
      return cur;
    }
  }, 0);
};

const displayMostExpensive = () => {
  const parent = document.getElementById("stats");
  const divName = "most-expensive";
  const existing = document.getElementById(divName);
  if (existing) {
    parent.removeChild(existing);
  }
  const highest = mostExpensive();
  const div = document.createElement("div");
  div.id = divName;
  div.innerHTML = `The most expensive item is ${
    highest.name
  } and it is ${formatMoney(highest.price)}`;
  parent.appendChild(div);
};

const buildDeleteLinks = () => {
  console.log("building delete links");
  const deletes = document.querySelectorAll("td[data-delete]");
  for (let del of deletes) {
    del.addEventListener("click", (e) => {
      deleteItem(+e.currentTarget.id.substring(3));
    });
  }
};

// const addPlusSvg = () => {
//   const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//   const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
//   svg.setAttribute("viewbox", "0 0 122.88 122.88");
//   svg.setAttribute("height", "60px");
//   svg.setAttribute("width", "60px");
//   path.setAttribute(
//     "d",
//     "M0,0v60h60V0H0z M51,32H32v19h-4V32H9v-4h19V9h4v19h19V32z"
//   );
//   svg.appendChild(path);
//   const div = document.getElementById("add-button");
//   div.appendChild(svg);
// };
// addPlusSvg();

const addSvg = () => {
  state.items.forEach((i) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svg.setAttribute("viewbox", "0 0 24 24");
    svg.setAttribute("height", "24px");
    svg.setAttribute("width", "24px");

    path.setAttribute(
      "d",
      "M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"
    );
    //path.setAttribute('fill', 'none');
    svg.appendChild(path);
    const div = document.getElementById("trash-" + i.id);
    div.appendChild(svg);
  });
};

const assignCaretEvent = () => {
  const caret = document.getElementById("price-caret");
  caret.addEventListener("click", handleSortClick);
};

const changeState = (element) => {
  const { id, value } = element.target;
  if (!isValid(value) || !isValid(id)) return;

  setValue(id, value);

  const result = {
    ...state,
    currentItem: {
      ...(state.currentItem[id] = value),
    },
  };
  console.log(result);
  return result;
};

const setValue = (id, value) => {
  if (isValid(value)) {
    document.getElementById(id).value = value;
  }
};

const handleSortClick = () => {
  const caret = document.getElementById("price-caret");
  caret.classList.remove("top");
  caret.classList.remove("down");
  sortData();
  if (state.priceSortDirection == "down") {
    state.priceSortDirection = "top";
    caret.classList.add("top");
  } else {
    state.priceSortDirection = "down";
    caret.classList.add("down");
  }
  caret.removeEventListener("click", handleSortClick);
};

const inputs = document.getElementsByTagName("input");
for (let input of inputs) {
  input.addEventListener("change", changeState);
}

const getItemCategory = (c) => {
  if (typeof c === "number") {
    const categoryRecord = state.categories.find((cat) => cat.id === c)[0];
    if (categoryRecord) {
      return categoryRecord.name;
    } else {
      return "";
    }
  }
  return c;
};

export const buildTable = () => {
  let html = `<table style="width: 90%; margin: 20px auto; color: #000">`;
  html += `<tr><th>Products</th><th>Size</th><th class="header-sort"><span>Price</span><span id="price-caret" class="chevron ${state.priceSortDirection}"</span></th><th>Category</th><th>Delete</th></tr>`;
  filteredData.map((item) => {
    const { name, id, price, category, size } = item;
    html += `<tr><td>${name}</td><td>${size}</td><td>${formatMoney(
      price
    )}</td><td>${getItemCategory(
      category
    )}</td><td id="tr-${id}" style="cursor: pointer;" data-delete="${id}"><div style="text-align: center;" id="trash-${id}"></div></td></tr>`;
  });
  html += `<tr><td colspan="2"></td><td>${formatMoney(
    getTotal()
  )}</td><td colspan="2"></td></tr>`;
  html += "</table>";
  document.getElementById("items").innerHTML = html;
  buildDeleteLinks();
  displayCheapestItem();
  displayMostExpensive();
  addSvg();
  assignCaretEvent();
  runCategoryCode();
};

buildTable();

Array.prototype.unique = function (field) {
  const newArray = [];
  this.forEach((record) => {
    const { [field]: targetField } = record;
    if (!newArray.includes(targetField)) {
      newArray.push(targetField);
    }
  });
  return newArray;
};

const handleFilterChange = (e) => {
  if (e.target.value == "0") {
    filteredData = state.items;
  } else {
    filteredData = state.items.filter((d) => d.category == e.target.value);
  }
  buildTable();
};

const deleteItem = (id) => {
  deleteItemFromSql(id)
    .then((res) => {
      const j = res.data;
      if (j.error === 0) {
        getOurData();
      } else {
        console.log(j.msg);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const saveItem = () => {
  const copiedItems = [...state.items, state.currentItem];
  state.items = copiedItems;
  filteredData = copiedItems;
  // buildTable();
  clearForm();
  updateData()
    .then((res) => {
      console.log(res);
      getOurData();
    })
    .catch((err) => {
      console.log(err);
    });
};

const saveButton = document.getElementById("save-item");
saveButton.addEventListener("click", saveItem);

function runSampleCode() {
  // lets add curry to the mix
  const filterData = (property) => {
    return function (value) {
      return data.filter((i) => i[property] == value);
    };
  };

  const curriedFilter = filterData("category");
  const fruits = curriedFilter("fruits");
  const bevs = curriedFilter("beverages");
  const candy = curriedFilter("candy");
  console.log("fruits", fruits);
  console.log("bevs", bevs);
  console.log("candy", candy);

  const findCategoryMostExpensiveItem = (array) => {
    return array.reduce((acc, cur) => {
      return acc.price > cur.price ? acc : cur;
    }, 0);
  };
  const compose =
    (...fns) =>
    (...args) =>
      fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

  const pipedFn = compose(
    findCategoryMostExpensiveItem,
    curriedFilter
  )("beverages");
  console.log(pipedFn);

  const getFoodBetweenOneAndTwo = (data) =>
    Box(data)
      .map((x) => x.filter((f) => f.category === "beverages"))
      .map((x) => x.filter((f) => f.price > 1.0))
      .map((x) => x.filter((f) => f.price <= 2.0))
      .map((x) => x.map((f) => f.price))
      .map((x) => x.map((f) => parseFloat(f)))
      .map((x) => x.reduce((a, c) => a + c))
      .fold((x) => x);

  console.log("*****************");
  const r2 = getFoodBetweenOneAndTwo(state.items);
  console.log(r2);

  const serialKillers = [
    {
      boy: "jeffry",
      faction: "bathhouse",
    },
    {
      boy: "steven",
      faction: "hitchhiker",
    },
  ];

  const findJeffry = (data) =>
    Box(data)
      .map((x) => x.filter((b) => b.faction === "bathhouse")[0])
      .map((x) => x.boy)
      .fold((x) => x);

  console.log(findJeffry(serialKillers));

  const buildFilterBox = () => {
    const categories = data.unique("category");
    let html =
      '<select id="category-filter"><option value="0">Select a category to filter by</option>';
    categories.map((c) => {
      html += `<option value="${c}">${c}</option>`;
    });
    html += "</select>";
    document.getElementById("filter").innerHTML = html;
    const newSelect = document.getElementById("category-filter");
    newSelect.addEventListener("change", handleFilterChange);
  };
  buildFilterBox();
}

function runCategoryCode() {
  const createItemCategory = () => {
    let html = `<select id="category"><option value="0">Select a Category</option>`;
    state.categories.map((c) => {
      html += `<option value="${c.id}">${c.name}</option>`;
    });
    html += "</select";
    document.getElementById("item-category").innerHTML = html;
    const newSelect = document.getElementById("category");
    newSelect.addEventListener("change", changeState);
  };
  createItemCategory();
}

const createToast = (text, title = "", duration = 4000, type) => {
  const toastElem = document.createElement("div");
  toastElem.classList.add("toast");
  if (type) toastElem.classList.add(type);

  const titleElem = document.createElement("p");
  titleElem.classList.add("t-title");
  titleElem.innerHTML = title;
  toastElem.appendChild(titleElem);

  const textElem = document.createElement("p");
  textElem.classList.add("t-text");

  if (Array.isArray(text)) {
    const s = text
      .map((s) => {
        if (typeof s == "object") {
          return s.name;
        } else {
          return s;
        }
      })
      .join(", ");
    textElem.innerHTML = s;
  } else {
    textElem.innerHTML = text;
  }
  toastElem.appendChild(textElem);

  const toastContainer = document.getElementById("toastContainer");
  toastContainer.appendChild(toastElem);

  setTimeout(() => {
    toastElem.classList.add("active");
  }, 1);

  setTimeout(() => {
    toastElem.classList.remove("active");
    setTimeout(() => {
      toastElem.remove();
    }, 350);
  }, duration);
};

const toastTest = () => {
  createToast("hello bitches");
};

const toastButton = document.getElementById("toast-button");
toastButton.addEventListener("click", toastTest);

const modals = document.querySelectorAll("[data-modal]");

modals.forEach(function (trigger) {
  trigger.addEventListener("click", function (event) {
    event.preventDefault();
    const modal = document.getElementById(trigger.dataset.modal);
    modal.classList.add("open");
    const exits = modal.querySelectorAll(".modal-exit");
    exits.forEach(function (exit) {
      exit.addEventListener("click", function (event) {
        event.preventDefault();
        modal.classList.remove("open");
      });
    });
  });
});

const showModal = () => {
  const modal = document.getElementById("modal-one");
  modal.classList.add("open");
  const exits = modal.querySelectorAll(".modal-exit");
  exits.forEach((exit) => {
    exit.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.remove("open");
    });
  });
};

const addButton = document.getElementById("add-button");
addButton.addEventListener("click", showModal);

const saveNewCategory = document.getElementById("save-new-category");
saveNewCategory.addEventListener("click", saveCategoryToServer);
