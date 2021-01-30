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
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    });
  });
};
