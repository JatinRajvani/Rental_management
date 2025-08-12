# 🏠✨ Rental Management System

A **full-stack web application** designed to make the rental process seamless, transparent, and efficient for both **customers** and **admins**.  
From browsing products to secure online payments and real-time email notifications, this system covers the **entire rental lifecycle**.

Whether it’s **vehicles, electronics, tools, or any other rentable items**, this platform lets users rent with just a few clicks while giving admins the power to manage everything in one dashboard.

---
**Links:**
- Figma Design – [Figma Design](https://www.figma.com/design/DTPG3EnZsGCmoRPZSl4mS2/Untitled?node-id=1-13&t=oT22fwxmlNmFj36b-1)
- Video Link – [Youtube video](https://youtu.be/7GKUQdv_xFU)

## 📌 Table of Contents
- Features  
- Tech Stack  
- Installation  
- Running the Project  
- Stripe Payment Flow  
- Nodemailer Notifications  
- Project Structure  
- Security Measures  
- Future Enhancements  
- License  
- Contributors  

---

## ✨ Features

### 👤 **Customer Features**
- 🔍 **Browse & Search Products** – Filter items based on type, availability, and rental duration.
- 📅 **Flexible Booking** – Hourly, daily, weekly, monthly, or yearly rental plans.
- 📂 **Detailed Product Pages** – High-quality images, pricing, and availability status.
- 🛒 **Add to Cart** – Choose multiple products before checkout.
- 💳 **Secure Payment Integration** – Powered by **Stripe** for reliability and safety.
- 📩 **Instant Email Notifications** – Booking confirmations, reminders, and updates via **Nodemailer**.
- 📱 **Mobile Friendly** – Fully responsive design for smartphones, tablets, and desktops.

### 🛠️ **Admin Features**
- 📦 **Product Management** – Add, edit, or remove rental listings with ease.
- 💰 **Dynamic Pricing** – Set unique prices for different durations.
- 📊 **Booking Dashboard** – View, approve, or decline requests.
- 📧 **Automated Notifications** – Stay updated with every new booking.
- 🔐 **Role-Based Access Control** – Separate login and privileges for admins and customers.

### 🔗 **Core Functionalities**
- 💳 **Stripe Payment Gateway** – PCI-compliant online transactions.
- 📩 **Nodemailer** – Two-way communication between admins and users.
- 🔑 **JWT Authentication** – Secure login sessions.
- 🗄 **MongoDB** – Robust and scalable database for storing data.
- 🎨 **Tailwind CSS** – Modern and responsive user interface.

---

## 🛠️ Tech Stack

**Frontend:**
- ⚛️ React.js – Component-based UI
- 🎨 Tailwind CSS – Responsive styling
- 🔄 Axios – API calls
- 🚏 React Router – Client-side navigation

**Backend:**
- 🟢 Node.js – Server-side runtime
- 🚀 Express.js – API framework
- 🗄 MongoDB + Mongoose – Database & ORM
- 💳 Stripe API – Payment processing
- 📩 Nodemailer – Email notifications

**Other Tools:**
- 🔑 JWT Authentication – Secure user sessions
- 🔒 bcrypt.js – Password encryption
- ⚙️ dotenv – Environment variable management
  
---

  
## 📦 Installation

### 1️⃣ Clone Repository
```bash
git clone https://github.com/JatinRajvani/Rental_management.git
cd Rental_management
