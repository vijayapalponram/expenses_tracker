# Feature: Corpus Fund Expense Logging

**Priority**: Medium
**Estimation**: 3 story points
**Status**: Not Started

---

**Goal**
Allow admins to record and categorize expenses drawn from the apartment's corpus fund, and give residents visibility into how the fund is being spent and what the current balance is.

**Background / Context**
The corpus fund is a maintenance reserve collected from residents. Without structured expense logging, there is no audit trail and residents cannot verify how the fund is used. This feature introduces expense tracking and live balance updates against the fund.

---

## User Stories

- As an **admin**, I want to log an expense against the corpus fund so that every withdrawal is recorded with a category, amount, and description.
  - Acceptance criteria:
    - [ ] Endpoint accepts amount, category, description, and expense date
    - [ ] Corpus fund balance decreases by the expense amount immediately
    - [ ] Expense is persisted with the admin's user ID as `recordedBy`
    - [ ] Returns 400 if amount ≤ 0, category is invalid, or required fields are missing
    - [ ] Returns 400 if the expense would take the balance below zero

- As an **admin**, I want to categorize each expense so that spending can be analysed by type.
  - Acceptance criteria:
    - [ ] Category must be one of: `MAINTENANCE`, `REPAIRS`, `UTILITIES`, `SECURITY`, `CLEANING`, `OTHER`
    - [ ] Invalid category returns 400 with a clear error message

- As a **resident**, I want to view the full corpus fund expense history so that I can verify how the fund is being spent.
  - Acceptance criteria:
    - [ ] Paginated list of all expenses, sorted by date descending
    - [ ] Each entry shows: amount, category, description, date, and name of the admin who recorded it
    - [ ] Accessible to both residents and admins

- As a **resident**, I want to see the current corpus fund balance so that I know how much is available in the reserve.
  - Acceptance criteria:
    - [ ] Returns the current balance as a single value
    - [ ] Balance reflects all recorded expenses

---

## API Contract

### Log a corpus fund expense

```
POST /api/corpus-fund/expenses
Auth: required — role = admin
```

**Request**
```json
{
  "amount": 4500.00,
  "category": "REPAIRS",
  "description": "Replaced water pump on rooftop",
  "expenseDate": "2026-06-06"
}
```

**Response** `201 Created`
```json
{
  "id": 1,
  "amount": 4500.00,
  "category": "REPAIRS",
  "description": "Replaced water pump on rooftop",
  "expenseDate": "2026-06-06",
  "recordedBy": {
    "id": 3,
    "name": "Ravi Kumar"
  },
  "createdAt": "2026-06-06T10:30:00Z"
}
```

**Error cases**
| Status | Condition |
|--------|-----------|
| 400 | `amount` ≤ 0, missing required field, invalid category, or insufficient balance |
| 401 | Not authenticated |
| 403 | Authenticated user is not an admin |

---

### List corpus fund expenses

```
GET /api/corpus-fund/expenses?page=0&size=20
Auth: required — any role
```

**Response** `200 OK`
```json
{
  "content": [
    {
      "id": 1,
      "amount": 4500.00,
      "category": "REPAIRS",
      "description": "Replaced water pump on rooftop",
      "expenseDate": "2026-06-06",
      "recordedBy": {
        "id": 3,
        "name": "Ravi Kumar"
      },
      "createdAt": "2026-06-06T10:30:00Z"
    }
  ],
  "page": 0,
  "size": 20,
  "totalElements": 1,
  "totalPages": 1
}
```

**Error cases**
| Status | Condition |
|--------|-----------|
| 401 | Not authenticated |

---

### Get corpus fund balance

```
GET /api/corpus-fund/balance
Auth: required — any role
```

**Response** `200 OK`
```json
{
  "balance": 125000.00,
  "lastUpdatedAt": "2026-06-06T10:30:00Z"
}
```

**Error cases**
| Status | Condition |
|--------|-----------|
| 401 | Not authenticated |

---

## Domain Model

### New entity: `CorpusFundExpense`
| Field | Type | Notes |
|-------|------|-------|
| `id` | `Long` | PK, auto-increment |
| `amount` | `BigDecimal` | Must be > 0 |
| `category` | `ExpenseCategory` (enum) | `MAINTENANCE`, `REPAIRS`, `UTILITIES`, `SECURITY`, `CLEANING`, `OTHER` |
| `description` | `String` | Free text, max 500 chars |
| `expenseDate` | `LocalDate` | Date the money was spent |
| `recordedBy` | `User` (ManyToOne) | Admin who logged it |
| `createdAt` | `Instant` | Set on insert |

### New entity: `CorpusFundAccount`
Singleton record holding the current balance.

| Field | Type | Notes |
|-------|------|-------|
| `id` | `Long` | Always `1` |
| `balance` | `BigDecimal` | Updated atomically on each expense |
| `lastUpdatedAt` | `Instant` | Updated on each write |

### New value object: `ExpenseCategory` (enum)
`MAINTENANCE`, `REPAIRS`, `UTILITIES`, `SECURITY`, `CLEANING`, `OTHER`

---

## Database Changes

- `V2__Create_Corpus_Fund_Tables.sql` — creates `corpus_fund_expenses` and `corpus_fund_account` tables; seeds `corpus_fund_account` with an initial balance of `0.00`

---

## Security

| Endpoint | Allowed roles |
|----------|---------------|
| `POST /api/corpus-fund/expenses` | `admin` only |
| `GET /api/corpus-fund/expenses` | `admin`, `resident` |
| `GET /api/corpus-fund/balance` | `admin`, `resident` |

Role is read from the `role` claim in the JWT. Residents must be authenticated but cannot write.

---

## Out of Scope

- Corpus fund contributions / top-ups (separate feature)
- Editing or deleting an expense once logged
- Expense approval workflow
- Receipt / document attachments
- Notifications to residents when an expense is logged
- Per-category spending analytics or reports

---

## Open Questions / Assumptions

| # | Assumption / Question |
|---|----------------------|
| 1 | **Assumption**: "Carpus fund" = "Corpus fund" (common apartment maintenance reserve in India). Rename if incorrect. |
| 2 | **Assumption**: Initial corpus fund balance is seeded as `0.00` in the migration. The actual opening balance should be set via a separate admin action or directly in the seed SQL before going live. |
| 3 | **Question**: Should an expense be allowed if it would take the balance below zero (e.g. balance not yet seeded)? Spec assumes **no** — returns 400. Confirm with stakeholder. |
| 4 | **Assumption**: JWT-based auth is the target (aligns with CLAUDE.md), even though the current `SecurityConfig` still uses basic auth. This spec assumes JWT role claims are available by the time this feature is implemented. |
