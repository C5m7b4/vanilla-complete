// import axios from "axios";
import avion from "avion";
import { state } from "./index";
import { formatMoney } from "./utils";

export async function saveEdits() {
  let json = await avion({
    method: "PUT",
    cors: true,
    headers: {
      "Content-Type": "application/json",
    },
    url: "http://localhost:3000",
    data: {
      name: state.currentItem.name,
      size: state.currentItem.size,
      price: state.currentItem.price,
      category: state.currentItem.category,
      id: state.currentItem.id,
    },
  });
  return json;
}

export async function updateData() {
  let json = await avion({
    method: "POST",
    cors: true,
    headers: {
      "Content-Type": "application/json",
    },
    url: "http://localhost:3000",
    data: {
      name: state.currentItem.name,
      size: state.currentItem.size,
      price: formatMoney(state.currentItem.price),
      category: state.currentItem.category,
    },
  });
  return json;
}

export async function getData() {
  let json = await avion({
    method: "GET",
    cors: true,
    headers: {
      "Content-Type": "application/json",
    },
    url: "http://localhost:3000/products",
  });
  return json;
}

export async function getCategories() {
  let json = await avion({
    method: "GET",
    cors: true,
    headers: {
      "Content-Type": "application/json",
    },
    url: "http://localhost:3000/categories",
  });
  return json;
}

export async function deleteItemFromSql(id) {
  let json = await avion({
    method: "DELETE",
    cors: true,
    headers: {
      "Content-Type": "application/json",
    },
    url: "http://localhost:3000",
    data: {
      id,
    },
  });
  return json;
}

export async function sendCategory(name) {
  let json = await avion({
    method: "POST",
    cors: true,
    headers: {
      "Content-Type": "application/json",
    },
    url: "http://localhost:3000/category",
    data: {
      name,
    },
  });
  return json;
}
