# Story: Persist Registration Details in Database

**Execution Order**: 3

**Description**: Store user registration details in a persistent database instead of in-memory storage.

## Acceptance Criteria
- User registration details are saved in a database (e.g., SQLite, MongoDB, PostgreSQL, or Firestore).
- Registration API uses the database for persistence.
- Data remains available after server restarts.

**Priority**: High
**Estimation**: 2 story points

**Tasks**:
- [ ] Add cloud Firestore database configuration to the backend
- [ ] Update registration logic to use Firestore for persistence

**Status**: Not Started
