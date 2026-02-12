# 📄 Invoice OCR Full-Stack Web Application

## 📌 Project Overview

This project is a full-stack web application that extracts structured
data from invoice images using Optical Character Recognition (OCR).

The system uses: - A **Flask (Python) API** integrated with an AI-based
OCR model for text extraction - A **Node.js REST API** for managing and
storing extracted data - **MongoDB** as the database - A frontend built
with **HTML, CSS, and JavaScript**

I developed both the frontend and backend entirely myself.

------------------------------------------------------------------------

## 🏗️ Architecture

Frontend (HTML/CSS/JS)\
⬇\
Flask API (Python - OCR Processing)\
⬇\
Node.js REST API\
⬇\
MongoDB Database

### Flow:

1.  User uploads an invoice image.
2.  Flask API processes the image using OCR and extracts text data.
3.  Extracted data is sent to the Node.js REST API.
4.  The REST API stores the structured invoice data in MongoDB.
5.  The frontend displays the extracted and stored information.

------------------------------------------------------------------------

## 🛠️ Technologies Used

### Backend (OCR Service)

-   Python
-   Flask
-   OCR / AI Model (e.g., Tesseract)

### Backend (Data Management API)

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose

### Frontend

-   HTML
-   CSS
-   JavaScript (Fetch API / AJAX)

------------------------------------------------------------------------

## 📂 Project Structure

/js_back_end → Node.js REST API (MongoDB integration)\
/js_front_end → Frontend application\
/pyhton_back_end → Flask OCR API

------------------------------------------------------------------------

## 🚀 Installation & Setup

### 1️⃣ Clone Repository

``` bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

------------------------------------------------------------------------

## 🔹 Setup Python OCR Backend

``` bash
cd pyhton_back_end
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Runs on: http://localhost:5000

------------------------------------------------------------------------

## 🔹 Setup Node.js Backend

``` bash
cd js_back_end
npm install
npm start
```

Runs on: http://localhost:3000

Make sure MongoDB is running locally or update your MongoDB connection
string.

------------------------------------------------------------------------

## 🔹 Setup Frontend

Open the index.html file inside:

/js_front_end

Or run with a simple live server:

``` bash
npx serve .
```

------------------------------------------------------------------------

## 📸 Features

-   Upload invoice images
-   Extract text using OCR
-   Structure invoice data
-   Store invoices in MongoDB
-   Retrieve stored invoices
-   Display results in the browser

------------------------------------------------------------------------

## 🔮 Future Improvements

-   Improve OCR accuracy with advanced AI models
-   Add authentication system
-   Deploy to cloud (AWS / Render)
-   Add invoice data validation
-   Export data as PDF or CSV

------------------------------------------------------------------------

## 👨‍💻 Author

Developed entirely by Zana Sobhani
