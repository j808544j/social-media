# All Posts API

This API endpoint retrieves all posts created by an authenticated user, including associated comments and likes.

## Endpoint

GET /api/all_posts

## Authentication

Required. `Bearer <Token>`

## Request

### Headers

- `Authorization`: Bearer token provided upon successful login.

## Response

- **Status Code:** 200 (OK) - Successful request.
- **Status Code:** 401 (Unauthorized) - If the provided token is invalid or missing.
- **Status Code:** 500 (Internal Server Error) - If an error occurs on the server.

### Response Body

An array of objects, each representing a post created by the authenticated user. Each object has the following properties:

- `id` (string): The unique identifier of the post.
- `title` (string): The title of the post.
- `desc` (string): The description of the post.
- `created_at` (string): The date and time when the post was created.
- `comments` (array): An array of comment objects associated with the post.
  - `id` (string): The unique identifier of the comment.
  - `text` (string): The content of the comment.
  - `created_at` (string): The date and time when the comment was created.
- `likes` (number): The number of likes on the post.

# Authentication API

This API endpoint allows users to authenticate by providing valid credentials and returns a JSON Web Token (JWT) if authentication is successful.

## Endpoint

POST /api/authenticate

## Request

### Headers

None

### Body

The request body should contain the following fields:

- `email` (string): The email address of the user.
- `password` (string): The password associated with the user's account.

#### Example Request Body

```json
{
  "email": "user@example.com",
  "password": "secretpassword"
}
```
