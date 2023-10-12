### Live Link: https://book-catelog-server.onrender.com/

### Application Routes:

#### User

- api/v1/auth/signup (POST)
- api/v1/auth/signing (POST) User Signing by email and password => Generate Token
- api/v1/users (GET)
- api/v1/users/a09e6d32-25d2-45d5-b6f4-f1813e48cf2a (Single GET)
- api/v1/users/a09e6d32-25d2-45d5-b6f4-f1813e48cf2a (PATCH)
- api/v1/users/a09e6d32-25d2-45d5-b6f4-f1813e48cf2a (DELETE)
- api/v1/profile (GET)

### Category

- api/v1/categories/create-category (POST)
- api/v1/categories (GET)
- api/v1/categories/2ba952dc-0ceb-4d89-99df-06f672810155 (Single GET)
- api/v1/categories/2ba952dc-0ceb-4d89-99df-06f672810155 (PATCH)
- api/v1/categories/2ba952dc-0ceb-4d89-99df-06f672810155 (DELETE)

### Books

- api/v1/books/create-book (POST)

```
Book Json for create (with Token)
{
  "title": "The Nightingale",
  "author": "Kristin Hannah",
  "genre": "Fiction",
  "price": 500,
  "publicationDate": "1951-07-16",
  "categoryId": "1b425c2e-9b00-4b50-987b-cc1ffd8a8a62"
}
```

- api/v1/books/b77b20d1-79d8-48ce-934a-7fbcbed113c1/category (GET)
- api/v1/books (GET)
- api/v1/books/a8d5ac60-ee00-434d-8f6d-97fb12418154 (GET)
- api/v1/books/a8d5ac60-ee00-434d-8f6d-97fb12418154 (PATCH)
- api/v1/books/a8d5ac60-ee00-434d-8f6d-97fb12418154 (DELETE)

### Orders

- api/v1/orders/create-order (POST)

```
Request Order Json Data
{
    "orderedBooks": [
        {
            "bookId": "f2d360e2-0001-44c9-9f5d-978d849e01f5",
            "quantity": 2
        }
    ]
}
```

- api/v1/orders (GET)
- api/v1/orders/9202df66-0558-4136-b2c1-01a11a6040b1 (GET)
