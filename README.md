# ![Thyme](/public/icons/favicon-32x32.png) Thyme

A little web app which allows you to log time data.

### [Use Thyme in your browser right now](https://usethyme.com)

---

[![Build Status](https://travis-ci.org/ThymeApp/thyme.svg?branch=master)](https://travis-ci.org/ThymeApp/thyme)

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
- Automatic rounding of time spent
- Export / Import data
- Saves to localStorage of the browser
- Ability to sync data in the [Thyme Capsule](https://github.com/ThymeApp/thyme-capsule)
- Sync over multiple devices

## How to use

Thyme has been made to be as easy as possible to use. However, there is also documentation available
at [https://usethyme.com/documentation/](https://usethyme.com/documentation/) for further reading.

If you have questions you can leave issues on this repository or send a message to
[support@usethyme.com](mailto:support@usethyme.com)

## Screenshots

![Timesheets screen](/public/screenshots/screenshot_timesheets.png)
> Detailed time logging

![Reports screen](/public/screenshots/screenshot_reports.png)
> Time log reports

![Projects screen](/public/screenshots/screenshot_projects.png)
> Adding and adjusting projects

---

## Running your own instance

1. Clone the repository, navigate to the created folder, and run `npm install`.
2. Use `npm build` to build the application. Assets will be available in `build/`.
3. Change the location of [Thyme Capsule](https://github.com/ThymeApp/thyme-capsule) by setting the `REACT_APP_API_ROOT` environment variable before building.
4. Run `npx serve build` to serve your build on localhost.

## Building browser extensions

1. Follow the steps for running your own instance.
2. Use `npm run build:extensions` to compile and zip the browser extensions.

## Generating sample data

To generate sample data to be used for development, or just to clean your development state, you can
use the following command:

```
npm run generate-sample
```

This will create a new file called `sample.json` in the root of the project. Use the "Export / Import data"
section of the settings page to import the sample data.

## Development

You can help out with development using the following steps.

1. Clone the repository, navigate to the created folder, and run `npm install`.
2. Copy the staging environment variables to a local version `cp .env.staging .env.local`. Adjust if needed.
3. Open a development server by executing `npm start`.
4. Find source files for the app in `./src`.

## Made with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## License

MIT
