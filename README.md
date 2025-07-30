Unish Giri
Contact Book
A simple contact book web application built with Vue 3, Vue Router 4, and Vite. This app allows you to manage your contacts efficiently. All data is stored in the browser's localStorage, ensuring it persists between sessions.

Features
📄 View all contacts sorted alphabetically by last name
🔍 Search/filter contacts by first or last name
➕ Add a new contact
✏️ Edit an existing contact
🗑️ Delete a contact
👤 View contact details
Technologies Used
Vue 3 – Frontend framework for building reactive user interfaces
Vue Router 4 – Client-side routing for navigating between views
Vite – Lightning-fast development build tool
localStorage – Browser storage for data persistence
Installation and Setup
Follow these steps to run the project locally:

Open your terminal and run: git clone https://github.com/90541138318/contact-book.git

css Copy Edit Then, navigate to the project folder: cd contact-book

csharp Copy Edit

2. Install dependencies
Make sure you have Node.js (version 16 or higher) installed. Install the project dependencies by running: npm install

perl Copy Edit

3. Install Vue (optional)
If you want to use Vue CLI globally for creating or managing Vue projects: npm install -g @vue/cli

bash Copy Edit

4. Start the development server
Run the following command to start the app: npm run dev

arduino Copy Edit

The app will now be running at http://localhost:5173 (or the port displayed in your terminal).

5. Build for production (optional)
To generate optimized production files: npm run build

yaml Copy Edit This will create a dist folder with the production-ready code.

Project Structure
contact-book/ ├── public/ # Static assets ├── src/ │ ├── assets/ # Images, icons, styles │ ├── components/ # Reusable UI components │ ├── router/ # Vue Router configuration │ ├── views/ # Page components │ └── main.js # App entry point ├── package.json └── vite.config.js

yaml Copy Edit

License
This project is open-source and available under the MIT
