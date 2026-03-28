# SNBT Degree College Website Clone

A fully responsive, interactive clone of the SNBT Degree College website. This project combines a modern HTML/CSS/JavaScript frontend with a custom Node.js backend to emulate a real-world college website, complete with student data processing and mobile app compatibility via Capacitor.

## Features

- 📱 **Mobile-Ready**: Fully responsive design with an integrated mobile app build system using Capacitor (Android & iOS).
- ⚙️ **Custom Node.js Backend**: Includes a built-in Express server (`server.js`) handling mock API routing, status checks, and data manipulation.
- 💾 **Local File System Database**: Stores and retrieves student marks locally using `data/students.json` without requiring an external database.
- 🎨 **Modern Frontend**: Built with HTML, CSS, vanilla JavaScript, and jQuery for dynamic DOM manipulation and UI states.

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

You need to have **Node.js** installed on your computer. If you haven't already, download and install it from [Node.js Official Website](https://nodejs.org/).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dineshmeka/SNBT_v2.git
   ```

2. **Navigate into the project directory:**
   ```bash
   cd SNBT_v2
   ```

3. **Install the dependencies:**
   This command installs the backend server components (Express, body-parser, CORS) and the Capacitor CLI.
   ```bash
   npm install
   ```

---

## 💻 Running the Application

### 1. Start the Local Web Server

Run the following command to boot up the backend API and serve the frontend files:

```bash
npm start
```
*The server will automatically map your `PORT` to dynamic clouds (like Heroku or Render). If run locally, it falls back safely to port `8080`.*

### 2. View in Browser

Once the server is running, open your favorite web browser and navigate to:

```text
http://localhost:8080
```

---

## 📱 Mobile App Building (Capacitor)

This project is configured turning the web application into a native mobile app using **Capacitor**.

To sync your web code to the Native iOS and Android projects, run:

```bash
npm run build:mobile
```

*Note: This runs the custom `build.js` workflow and then syncs the native web assets via `npx cap sync`. You will need Android Studio (for Android) or Xcode (for iOS) installed on your machine to open, build, and run the native apps.*

---

## 🛠️ Built With

* **Frontend:** HTML5, CSS3, JavaScript, jQuery
* **Backend:** [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/) built for API serving
* **Cross-Platform:** [Capacitor](https://capacitorjs.com/) by Ionic

## License
This project is for educational and portfolio purposes. Licensed under the ISC License.
