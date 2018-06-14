# ![Thyme](/public/favicon-32x32.png) Thyme

A little web app which allows you to log time data.

---

### [Use Thyme in your browser right now](https://usethyme.com)

---

[![Build Status](https://travis-ci.org/Gaya/thyme.svg?branch=master)](https://travis-ci.org/Gaya/thyme)

Thyme is a time logging web application which enables you to add and store time spent on different 
projects you work on.

It displays all the added time entries in a single table with their corresponding duration and
project notes.

Create reports with detailed information spent per project over selected periods of time.

## Features

- Integrated timer
- Create date, start and end time
- Create projects and sub-projects
- Assign time sheet entries to projects
- Reports of total time spent per project
- Export / Import data
- Saves to localStorage of the browser
- Ability to sync data in the [Thyme Capsule](https://github.com/Gaya/thyme-capsule)
- Sync over multiple devices

---

## Screenshots

![Timesheets screen](/public/screenshot_timesheets.png)
> Detailed time logging

![Reports screen](/public/screenshot_reports.png)
> Time log reports

![Projects screen](/public/screenshot_projects.png)
> Adding and adjusting projects

---

## Running your own instance

1. Clone the repository and run `npm install`.
2. Use `npm build` to build the application. Assets will be available in `build/`.
3. Change the location of [Thyme Capsule](https://github.com/Gaya/thyme-capsule) by setting the `REACT_APP_API_ROOT` environment variable before building.

---

## Made with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## License

MIT
