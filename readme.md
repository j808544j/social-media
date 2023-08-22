# User Registration

This API endpoint allows users to register for an account.

## Endpoint

POST /register

## Request

### Request Body

The request body should contain the following fields:

- `email` (string): The email address for the new user.
- `password` (string): The password for the new user.

#### Example Request Body

````json
{
  "email": "newuser@example.com",
  "password": "securepassword"
}
```

## Response

- **Status Code:** 200 (OK) - Successful request.
- **Status Code:** 400 (Bad Request) - If the provided data is invalid.


# Get All Posts

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

# User Authentication

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

# Add Comment to Post

This API endpoint allows authenticated users to add comments to a specific post.

## Endpoint

POST /api/comment/:id

## Authentication

Required : `Bearer <your-auth-token>`

## Request Parameters

- `id`: The ID of the post to which the comment is being added.

## Request Body

- `text` (string): The text content of the comment.

## Responses

### Success

- **Status:** 201 Created
- **Response Body:**
  ```json
  {
    "commentId": "<comment-id>"
  }
  ```

# Delete Post

This API endpoint allows authenticated users to delete their own posts.

## Endpoint

DELETE /api/posts/:id

## Authentication

`Bearer <your-auth-token>`

## Request Parameter

- `id`: The ID of the post to be deleted.

## Responses

### Success

- **Status:** 200 OK
- **Response Body:**
  ```json
  {
    "message": "Post deleted successfully."
  }
  ```

# Follow User API

This API endpoint allows an authenticated user to follow another user.

## Endpoint

POST /api/follow/:id

## Authentication

Required. `Bearer <Token>`

## Request

### Headers

- `Authorization`: Bearer token provided upon successful login.

### Parameters

- `id` (string): The ID of the user to follow.

## Response

- **Status Code:** 200 (OK) - Successful request.
- **Status Code:** 400 (Bad Request) - If the provided data is invalid.
- **Status Code:** 401 (Unauthorized) - If the provided token is invalid or missing.
- **Status Code:** 404 (Not Found) - If the authenticated user or the user to follow is not found.
- **Status Code:** 500 (Internal Server Error) - If an error occurs on the server.

### Response Body

If the follow operation is successful, the response will include a success message.

#### Example Response

```json
{
  "message": "Successfully followed the user."
}
```

# Like Post

This API endpoint allows authenticated users to like a specific post.

## Endpoint

POST /api/like/:id

## Authentication

Bearer <your-auth-token>

## Request Parameter

- `id`: The ID of the post to be liked.

## Responses

### Success

- **Status:** 200 OK
- **Response Body:**
  ```json
  {
    "message": "Post liked successfully."
  }
  ```

# Create Post API

This API endpoint allows an authenticated user to create a new post.

## Endpoint

POST /api/posts

## Authentication

Required. `Bearer <Token>`

## Request

### Headers

- `Authorization`: Bearer token provided upon successful login.

### Request Body

The request body should contain the following fields:

- `title` (string): The title of the post.
- `description` (string): The description of the post.

#### Example Request Body

```json
{
  "title": "New Post Title",
  "description": "This is the content of the new post."
}
```

## Response

- **Status Code:** 200 (OK) - Successful request.
- **Status Code:** 400 (Bad Request) - If the provided data is invalid.
- **Status Code:** 401 (Unauthorized) - If the provided token is invalid or missing.
- **Status Code:** 500 (Internal Server Error) - If an error occurs on the server.

### Response Body

If the follow operation is successful, the response will be like below.

```json
{
  "postId": "post_id_123",
  "title": "New Post Title",
  "description": "This is the content of the new post.",
  "createdAt": "2023-08-25T10:00:00Z"
}
```

# Get Post by ID

This API endpoint retrieves a specific post by its ID, including associated likes and comments.

## Endpoint

GET /api/posts/:id

## Request

### Parameters

- `id` (string): The ID of the post to retrieve.

## Response

- **Status Code:** 200 (OK) - Successful request.
- **Status Code:** 400 (Bad Request) - If the provided data is invalid.
- **Status Code:** 404 (Not Found) - If the requested post is not found.
- **Status Code:** 500 (Internal Server Error) - If an error occurs on the server.

### Response Body

If the post retrieval is successful, the response will include the details of the post along with the number of likes and comments associated with it.

# Unfollow User

This API endpoint allows an authenticated user to unfollow another user.

## Endpoint

POST /api/unfollow/:id

## Authentication

Required. `Bearer <Token>`

## Request

### Headers

- `Authorization`: Bearer token provided upon successful login.

### Parameters

- `id` (string): The ID of the user to unfollow.

## Response

- **Status Code:** 200 (OK) - Successful request.
- **Status Code:** 400 (Bad Request) - If the provided data is invalid.
- **Status Code:** 401 (Unauthorized) - If the provided token is invalid or missing.
- **Status Code:** 404 (Not Found) - If the authenticated user or the user to unfollow is not found.
- **Status Code:** 500 (Internal Server Error) - If an error occurs on the server.

### Response Body

If the unfollow operation is successful, the response will include a success message.

#### Example Response

```json
{
  "message": "Successfully unfollowed the user."
}
```

# Unlike Post

This API endpoint allows an authenticated user to unlike a post.

## Endpoint

POST /api/unlike/:id

## Authentication

Required. `Bearer <Token>`

## Request

### Headers

- `Authorization`: Bearer token provided upon successful login.

### Parameters

- `id` (string): The ID of the post to unlike.

## Response

- **Status Code:** 200 (OK) - Successful request.
- **Status Code:** 400 (Bad Request) - If the provided data is invalid.
- **Status Code:** 401 (Unauthorized) - If the provided token is invalid or missing.
- **Status Code:** 404 (Not Found) - If the requested post is not found or if the user hasn't liked the post.
- **Status Code:** 500 (Internal Server Error) - If an error occurs on the server.

### Response Body

If the unlike operation is successful, the response will include a success message.

#### Example Response

```json
{
  "message": "Post unliked successfully."
}
```

# Get User Profile

This API endpoint retrieves the profile information of an authenticated user.

## Endpoint

GET /api/user

## Authentication

Required. `Bearer <Token>`

## Request

### Headers

- `Authorization`: Bearer token provided upon successful login.

## Response

- **Status Code:** 200 (OK) - Successful request.
- **Status Code:** 401 (Unauthorized) - If the provided token is invalid or missing.
- **Status Code:** 404 (Not Found) - If the authenticated user is not found.
- **Status Code:** 500 (Internal Server Error) - If an error occurs on the server.

### Response Body

If the user profile retrieval is successful, the response will include the user's email along with the counts of followers and followings.

#### Example Response

```json
{
  "email": "user@example.com",
  "followers": 100,
  "followings": 50
}
```
````
