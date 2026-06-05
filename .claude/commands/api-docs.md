Generate API documentation from the current controllers.

## Steps

1. Find all `*Controller.java` files under `src/main/java/`.
2. For each controller, read the file and extract:
   - Base path from `@RequestMapping`
   - Each endpoint: HTTP method, path, request body type, response type, auth required
3. Find the matching Request/Response DTO classes and list their fields with types.
4. Read `application.yml` for the server port and context path.

## Output Format

Print a Markdown API reference:

```
# Flat Expenses Tracker — API Reference
Base URL: http://localhost:{port}

---

## {Entity} Endpoints

### POST /api/{path}
**Auth required**: No / Yes (Bearer JWT)

**Request body**:
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| ...   | ...  | ...      | ...   |

**Response** `200 OK`:
| Field | Type | Notes |
|-------|------|-------|
| ...   | ...  | ...   |

**Error responses**: 400, 401, 409 (list relevant ones)

---
```

Repeat for every endpoint found. At the end, note any endpoints that are missing request validation or error handling.
