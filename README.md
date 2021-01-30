# T25-Twelfth-Hour: Exambnb 📝 
> Official Repository for DotSlash 4.0 Submission of Team 25: Twelfth Hour

## Table Of Contents 
1. [What is Exambnb](#what-is-exambnb)
2. [The reason on which Exambnb works](#why-exambnb)
3. [How is Exambnb implemented](#how-is-exambnb-implemented)

## What is Exambnb?
We are going to explain by asking a question, how do you manage to wake up early at your home to get ready for college **at your home!** 

It is hard now but that's the general process be it online classes or exams, you rise from the bed, have a hearty breakfast, and go back to the back **just with your laptop**. That's where the *bnb* comes from, now you know!

Exambnb is a proctoring prevention application that takes into consideration of both the faculty and the student's requirement. It is an efficient manner to prevent cheating and a real-time application that lets the faculty be known with any suspicious activity of any students and notifies the student about their behavior as well. ⚒️ 

## Why Exambnb?
It is observed that due to the covid scenario, most of the colleges/schools have opted to conduct online classes. The college/school faculty want to make sure that the students are giving the exams honestly rather than cheating. 

### 👩‍🏫 Teacher's concern 👨‍🏫 
However, there is always a problem. Students tend to always come up with solutions such as google lens, copy fisher, WhatsApp, and plenty of manners to copy despite being recorded on camera. Thus, we need to come up with a better tracking mechanism.

<hr>

### 👩‍🎓 Student's concern 👨‍🎓 
Due to covid scenario, all students are living in their houses but at points, they don't have proper internet connection due to which they can't keep the camera on during exams as it exhausts their mobile data/bandwidth but it's the only mode present right now to prevent cheating (a mode with a lot of flows tho).

Hence, there is a high requirement for a **real-time tracking mechanism and flow to prevent proctoring** which Exambnb provides.

## How is Exambnb implemented?
Exambnb is implemented quickly to allow fast real-time communication with an interface that is easy to get a grasp on. 

Exambnb creates a platform for the school/college admin where they can add the code for the exam duration and view all the student activities and check out their suspicious levels and mark all students not attending as well or late-attendance. 

The above is possible as we also provide an extension that must be installed in each device of the student where they need to enter the code and enable tracking. With this, their movements are tracked and sent to the admin. 

The middleman that allows for the flow of data from the chrome extension to the admin board is *firebase* which we have used as our database currently. 

### Features Provided 
1. A admin dashboard to get collective information on the student's behavior during exams.

2. An easy go-to interface that doesn't require much bandwidth either. The students can use it and not complain about the bandwidth/network problems. 

> Note: They don't require to let the admin know whether they were offline or online for a particular time 'cause our application will do that

3. Prevention from any movement of the students to any website other than the websites permitted by the college during the exam.

## Setting up in your local machine 
This is the easiest part honestly. 

1. Setup a firebase project for **extension** and **admin** modules separately. For each module, you add the config `firebase.config.js` in the `src/config` folder. (You've to create the folder and then place to config file & its respective configuration)

2. For the extension, inside chrome move to `chrome://extensions` and switch on the **developer mode** and click on **load unpacked**. A popup opens where you select the entire **extension** folder.

3. For using the react web application, direct inside the **admin** folder and do the following: 

```
$ cd admin
$ yarn
$ yarn lint
$ yarn start
```

This will start your project at `localhost:3000`.

## Authors 
- *Aemie Jariwala*: [AemieJ](https://github.com/AemieJ/), an open-source dev, outreachy intern 2k20, DSC Lead 2k20-21 & an alpha MLSA.

- *Sahil Bondre*: [godcrampy](https://github.com/godcrampy/), an open-source dev, webpack contributor & a founder of Reneree.

*An application for you by the Twelfth Hour 🕰*