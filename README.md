# PetriRestaurant [![GitHub Repo](https://img.shields.io/badge/View%20on-GitHub-24292e?logo=github)](https://github.com/alfredo-petri/express-knex-PetriRestaurant)


PetriRestaurant is a lightweight backend API built with Node.js and Express.js, designed to manage products, tables, and orders in a restaurant setting. It features CRUD operations for products and orders, and supports table session management. The project uses SQLite with Knex.js for data handling and Zod for input validation.

### Features
- Manage products: create, edit, delete and list products
- Manage orders: create, edit, delete and list orders associated with a table   
- Manage table sessions

### Tech Stack:

| **Category**         | **Technologies**                    |
|------------------|----------------------------------|
| API          | Node.js, Express.js              |
| Database     | sqlite, Knex (query builder)           |
| Validation   | Zod                              |



# Project Setup Guide


## 📋 Requirements
Before running this project, make sure you have installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (comes with Node.js)
---

## How to Run the Project

### 1. Install Project Dependencies

```bash
npm install
```

### 2. Setup the Database

To initialize the database, choose one of the following:

- **Empty database with migrations only:**

```bash
npm run knex-migrate
```

- **Pre-populated database with seed data:**

```bash
npm run create-populated-database
```


### 3. Run the Project in Development Mode

```bash
npm run dev
```

---

## 📚 API Documentation

This project includes interactive API documentation powered by Swagger UI.

Once the server is running, you can access it at:

> [http://localhost:3333/docs](http://localhost:3333/docs)


You can find it defined on [docs/openapi.yaml](https://github.com/alfredo-petri/express-knex-PetriRestaurant/blob/main/docs/openapi.yaml) in the GitHub repository.

💡 Full interactive API documentation available at `/docs`

### 🔌 Insomnia Collection

You can also test all API routes using [Insomnia](https://insomnia.rest/).  

Import the pre-configured request collection:

> [`docs/petri-restaurant-insomnia.json`](https://github.com/alfredo-petri/express-knex-PetriRestaurant/blob/main/docs/petri-restaurant-insomnia.json)


## API Endpoints Overview (Basic)

| **Endpoint** | **Description** |
| -------- | ---------- |
| /products | Manage products  |
| /tables | List tables |
| /tables-sessions | Manage table sessions |
| /orders | Manage orders |

---

## License

This project is open source and available under the MIT License.

---
## 🤝 Contributing

Pull requests are welcome! For major changes, please [open an issue](https://github.com/alfredo-petri/express-knex-PetriRestaurant/issues) first to discuss what you would like to change.
