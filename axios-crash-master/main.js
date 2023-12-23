// GET REQUEST
async function getTodos() {
  // try {
  //   const response = await axios({
  //     method: "get",
  //     url: "https://jsonplaceholder.typicode.com/todos",
  //     param: {
  //       //?? we can get only 5 in data when we console.log
  //       _limit: 5,
  //     },
  //   });
  //   console.log(response);
  // } catch (error) {
  //   console.log(error);
  // }

  //!! there is a shortcut to
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos?_limit=5"
      // { params: { _limit: 5 } }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

// POST REQUEST
async function addTodo() {
  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        title: "new sagar",
        done: "work",
      }
    );
    // const responseData = response.data;
    // console.log(responseData.title);
  } catch (err) {
    console.log(err);
  }
}

// PUT/PATCH REQUEST
async function updateTodo() {
  //?? for updating
  try {
    const response = await axios.put(
      "https://jsonplaceholder.typicode.com/todos/1",
      {
        title: "old sagar",
        done: "no work",
      }
    );
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

// DELETE REQUEST
async function removeTodo() {
  try {
    const response = await axios.delete(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
  } catch (err) {
    console.log(err);
  }
}

// SIMULTANEOUS DATA
// async function getData() {
//   try {
//     const [todos, posts] = await axios.all([
//       axios.get("https://jsonplaceholder.typicode.com/todos"),
//       axios.get("https://jsonplaceholder.typicode.com/posts"),
//     ]);
//     console.log(todos, posts);
//   } catch (err) {
//     console.log(err);
//   }
// }
async function getData() {
  try {
    const response = await axios.all([
      axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5"),
      axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"),
    ]);

    axios.spread((todos, posts) => {
      console.log(todos, posts);
      // Perform any actions with todos and posts here
    })(response);
  } catch (err) {
    console.log(err);
  }
}

// CUSTOM HEADERS
async function customHeaders() {
  const config = {
    headers: {
      "Content-type": "sagar/json",
      Authorization: "sometoken",
    },
  };
  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        title: "New todo",
        completed: false,
      },
      config
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  console.log("Transform Response");
}

// ERROR HANDLING
function errorHandling() {
  console.log("Error Handling");
}

// CANCEL TOKEN
function cancelToken() {
  console.log("Cancel Token");
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  (config) => {
    console.log(
      `${config.method.toUpperCase()} request send to ${
        config.url
      } at ${new Date().getTime()}`
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
