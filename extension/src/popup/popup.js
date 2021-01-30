function showNewUserStuff() {
  document
    .querySelectorAll(".new-user-stuff")
    .forEach((e) => (e.style.display = "block"));
  document
    .querySelectorAll(".old-user-stuff")
    .forEach((e) => (e.style.display = "none"));
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

  if (localStorage.getItem("tracking") == null) {
    stopTracking();
  } else {
    showTracking();
  }
}

function showTracking() {
  document
    .querySelectorAll(".tracking-enabled")
    .forEach((e) => (e.style.display = "block"));

  document.querySelector("#tracking").checked = true;
  document.querySelector("#tracking-message").innerHTML = "Tracking Enabled";
}

function stopTracking() {
  document
    .querySelectorAll(".tracking-enabled")
    .forEach((e) => (e.style.display = "none"));

  document.querySelector("#tracking").checked = false;
  document.querySelector("#tracking-message").innerHTML = "Tracking Disabled";
}

function setCode(code) {
  localStorage.setItem("code", code);
  displayUserStuff();
}

function setUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("activities", JSON.stringify([]));
  displayUserStuff();
}

function removeCode() {
  localStorage.removeItem("code");
  displayUserStuff();
}

function removeUser() {
  localStorage.removeItem("user");
  localStorage.removeItem("code");
  localStorage.removeItem("tracking");
  // TODO: Remove this:
  localStorage.removeItem("activities");
  document.querySelector("input#code").value = "";
  displayUserStuff();
}

function toggleTracking() {
  const current = localStorage.getItem("tracking");
  if (current == null) {
    localStorage.setItem("tracking", "true");
  } else {
    localStorage.removeItem("tracking");
  }
  displayUserStuff();
}

function displayUserStuff() {
  if (localStorage.getItem("user") == null) {
    showNewUserStuff();
  } else {
    const user = JSON.parse(localStorage.getItem("user"));
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
          localStorage.setItem("token", token);
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
    if (val !== "") {
      setCode(val);
    } else {
      removeCode();
    }
  });

  document.querySelector("button#clear").addEventListener("click", () => {
    document.querySelector("input#code").value = "";
    removeCode();
  });

  document.querySelector("input#tracking").addEventListener("change", () => {
    toggleTracking();
  });
  displayUserStuff();
};
