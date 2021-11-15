export async function fetchDataAPI(api_point) {
  const token = localStorage.getItem("token");
  const request = await fetch(`/api/${api_point}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const requestJSON = request.json();
  return requestJSON;
}

export async function fetchData(payload) {
  const token = localStorage.getItem("token");
  const request = await fetch("/api/get_data", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const result = {
    status: request.status,
    data: null,
  };

  if (request.status === 200) {
    result.status = request.status;
    result.data = await request.json();
  }

  return result;
}

export async function updateRequestInterventionType(payload) {
  const token = localStorage.getItem("token");
  const request = await fetch("/api/request-classification", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  return request;
}
