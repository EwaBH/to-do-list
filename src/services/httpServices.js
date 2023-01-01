const API_URL = "https://todo-api.coderslab.pl/api";
const API_KEY = "7ee2b73d-3efd-4a42-9569-337eb633cc42";

const header = {
  Authorization: API_KEY,
  "Content-Type": "application/json",
};

export function getTasks() {
  return fetch(`${API_URL}/tasks`, {
    headers: header,
  }).then((response) => response.json());
}

export function createTask(title, description, status) {
  return fetch(`${API_URL}/tasks`, {
    method: "POST",
    body: JSON.stringify({ title, description, status }),
    headers: header,
  }).then((response) => response.json());
}

export function updateTask(id, title, description, status) {
  return fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, description, status }),
    headers: header,
  }).then((response) => response.json());
}

export function deleteTask(id) {
  return fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: header,
  }).then((response) => response.json());
}

export function getTasksOperations(id) {
  return fetch(`${API_URL}/tasks/${id}/operations`, {
    headers: header,
  }).then((response) => response.json());
}

export function createTasksOperations(id, description) {
  return fetch(`${API_URL}/tasks/${id}/operations`, {
    method: "POST",
    body: JSON.stringify({ description, timeSpent: 0 }),
    headers: header,
  }).then((response) => response.json());
}

export function getOperation(id) {
  return fetch(`${API_URL}/operations/${id}`, {
    headers: header,
  }).then((response) => response.json());
}

export function updateOperation(id, description, timeSpent) {
  if (!timeSpent) {
    timeSpent = 0;
  }
  return fetch(`${API_URL}/operations/${id}`, {
    method: "PUT",
    body: JSON.stringify({ description, timeSpent }),
    headers: header,
  }).then((response) => response.json());
}

export function deleteOperation(id) {
  return fetch(`${API_URL}/operations/${id}`, {
    method: "DELETE",
    headers: header,
  }).then((response) => response.json());
}
