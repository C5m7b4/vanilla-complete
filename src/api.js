import axios from "axios";
import { state } from "./index";
import { formatMoney } from "./utils";

export async function saveEdits() {
  let json = await axios({
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
  let json = await axios({
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
  let json = await axios({
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
  let json = await axios({
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
  let json = await axios({
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
