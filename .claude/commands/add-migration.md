Create a new Flyway SQL migration for: $ARGUMENTS

## Steps

1. List existing migrations in `src/main/resources/db/migration/` to find the highest version number.

2. Create the next migration file:
   - Path: `src/main/resources/db/migration/V{N}__{Description}.sql`
   - Version N = highest existing version + 1
   - Description: derive from the argument using underscores (e.g. "add expenses table" → `Add_Expenses_Table`)

3. Write the SQL — follow the existing migration style:
   - Use `CREATE TABLE IF NOT EXISTS` for new tables
   - Include `id BIGINT AUTO_INCREMENT PRIMARY KEY`
   - Add `created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP` and `updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`
   - End each statement with `;`

4. Confirm the file was created and show its contents.
