Scaffold a complete hexagonal-architecture endpoint for the entity named: $ARGUMENTS

Follow the naming conventions and layer rules in CLAUDE.md. Create all four layers:

## Steps

1. **domain/** — create the entity class `{Entity}.java`
   - JPA `@Entity`, Lombok `@Data @Builder @NoArgsConstructor @AllArgsConstructor`
   - Fields: `id` (Long, `@Id @GeneratedValue`), sensible domain fields, `createdAt` / `updatedAt` with `@CreationTimestamp` / `@UpdateTimestamp`

2. **adapters/dto/** — create request/response DTOs
   - `{Entity}Request.java` — input fields with basic Bean Validation annotations
   - `{Entity}Response.java` — output fields matching what the API returns

3. **application/** — create the service
   - `{Entity}Service.java` — interface with CRUD method signatures
   - `{Entity}ServiceImpl.java` — implementation injecting the repository port

4. **adapters/** — create the controller
   - `{Entity}Controller.java` — `@RestController @RequestMapping("/api/{entities}")`
   - Implement GET (list + by id), POST (create), PUT (update), DELETE (delete) endpoints
   - Return `ResponseEntity<{Entity}Response>`

5. **infrastructure/** — create the JPA repository
   - `{Entity}JpaRepository.java` extending `JpaRepository<{Entity}, Long>`

6. **db/migration/** — create a Flyway migration
   - Determine the next version number from existing files in `src/main/resources/db/migration/`
   - Create `V{N}__{Create_{Entity}_Table}.sql` with the matching schema

After creating all files, run `./gradlew compileJava` to verify it compiles.
