function showNewUserStuff() {
  document
    .querySelectorAll(".new-user-stuff")
    .forEach((e) => (e.style.display = "block"));
  document
    .querySelectorAll(".old-user-stuff")
    .forEach((e) => (e.style.display = "none"));
}

function showOldUserStuff() {
  document
    .querySelectorAll(".old-user-stuff")
    .forEach((e) => (e.style.display = "block"));
  document
    .querySelectorAll(".new-user-stuff")
    .forEach((e) => (e.style.display = "none"));
}

function setUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
  console.log(user);
  document.querySelector("#user-name").innerHTML = user.name;
  document.querySelector("#user-email").innerHTML = user.email;
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
    showOldUserStuff();
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

  displayUserStuff();
};
