chrome.runtime.onInstalled.addListener(function () {
  // eslint-disable-next-line no-undef
  var db = firebase.firestore();

  setInterval(() => {
    // 1. Check if code is set
    // 2. Check if tracking is set
    // 3. Check if user is set
    // 4. Check if activites is set
    if (
      localStorage.getItem("user") !== null &&
      localStorage.getItem("code") !== null &&
      localStorage.getItem("tracking") !== null &&
      localStorage.getItem("activities") !== null
    ) {
      let user = JSON.parse(localStorage.getItem("user"));
      let id = localStorage.getItem("code") + user.email;

      var userRef = db.collection("users").doc(id);

      return (
        userRef
          .update({
            lastSeen: new Date().getTime(),
          })
          .then(function () {
            console.log("Document successfully updated!");
          })
          // eslint-disable-next-line no-unused-vars
          .catch(function (error) {
            // create the id
            db.collection("users")
              .doc(id)
              .set({
                email: user.email,
                code: localStorage.getItem("code"),
                lastSeen: new Date().getTime(),
                activities: JSON.stringify([]),
              })
              .then(function () {
                console.log("Document successfully written!");
              })
              .catch(function (error) {
                console.error("Error writing document: ", error);
              });
          })
      );
    }
  }, 1000 * 10);

  setInterval(() => {
    if (
      localStorage.getItem("user") !== null &&
      localStorage.getItem("code") !== null &&
      localStorage.getItem("tracking") !== null &&
      localStorage.getItem("activities") !== null &&
      JSON.parse(localStorage.getItem("activities")).length !== 0
    ) {
      let user = JSON.parse(localStorage.getItem("user"));
      let id = localStorage.getItem("code") + user.email;

      var userRef = db.collection("users").doc(id);

      userRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            const data = doc.data();
            console.log("Document data:", data);
            let activities = JSON.parse(data.activities);
            Array.prototype.push.apply(activities, JSON.parse(localStorage.getItem("activities")));
            userRef
              .update({
                activities: JSON.stringify(activities),
              })
              .then(function () {
                console.log("Activities successfully updated!");
                localStorage.setItem("activities", JSON.stringify([]));
              })
              // eslint-disable-next-line no-unused-vars
              .catch(function (error) {
                console.log("YOU ARE OFFLINE!");
              });
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
  }, 1000 * 10);
});
