function showNewUserStuff() {
  document
    .querySelectorAll(".new-user-stuff")
    .forEach((e) => (e.style.display = "block"));
  document
    .querySelectorAll(".old-user-stuff")
    .forEach((e) => (e.style.display = "none"));
}

function showCodeNotSet() {
  document
    .querySelectorAll(".code-not-set")
    .forEach((e) => (e.style.display = "block"));
  document
    .querySelectorAll(".code-set")
    .forEach((e) => (e.style.display = "none"));
}

function showCodeSet() {
  const code = localStorage.getItem("code");
  document
    .querySelectorAll(".code-set")
    .forEach((e) => (e.style.display = "block"));
  document
    .querySelectorAll(".code-not-set")
    .forEach((e) => (e.style.display = "none"));
  document.querySelector("input#code").value = code;
}

function showOldUserStuff(user) {
  document
    .querySelectorAll(".old-user-stuff")
    .forEach((e) => (e.style.display = "block"));
  document
    .querySelectorAll(".new-user-stuff")
    .forEach((e) => (e.style.display = "none"));
  document.querySelector("#user-name").innerHTML = user.name;
  document.querySelector("#user-email").innerHTML = user.email;

  if (localStorage.getItem("code") == null) {
    showCodeNotSet();
  } else {
    showCodeSet();
  }
}

function setCode(code) {
  localStorage.setItem("code", code);
  displayUserStuff();
}

function setUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
  displayUserStuff();
}

function removeCode() {
  localStorage.removeItem("code");
  displayUserStuff();
}

function removeUser() {
  localStorage.removeItem("user");
  displayUserStuff();
}

function displayUserStuff() {
  if (localStorage.getItem("user") == null) {
    showNewUserStuff();
  } else {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    showOldUserStuff(user);
  }
}

window.onload = () => {
  document.querySelector("button#sign-up").addEventListener("click", () => {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
        return;
      }
      // chrome.identity.getProfileUserInfo((userInfo) => {
      //     console.log(`Auth token: ${token}`);
      //     console.log(`User info: ${JSON.stringify(userInfo)}`);
      // });

      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" +
          token,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => setUser(result))
        .catch((error) => {
          removeUser();
          console.log("error", error);
        });
    });
  });

  document.querySelector("button#logout").addEventListener("click", () => {
    removeUser();
  });

  document.querySelector("button#save").addEventListener("click", () => {
    const val = document.querySelector("input#code").value;
    if (val !== '') {
      setCode(val);
    } else {
      removeCode();
    }
  });

  document.querySelector("button#clear").addEventListener("click", () => {
    document.querySelector("input#code").value = '';
    removeCode();
  });

  displayUserStuff();
};
