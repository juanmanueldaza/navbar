# Asset Versioning for Navbar

This site uses a simple Bash script for asset versioning to enable cache busting of static files (e.g., JS, CSS).

## Usage

From the `sites/navbar` directory:

```sh
./asset-version.sh <asset-file>
```

- The script computes a SHA-1 hash of the asset file, copies it to a new filename with the hash in the name (e.g., `main.js` → `main.v1a2b3c4d.js`), and prints the new filename.
- Update your HTML to reference the versioned asset filename for cache busting.

## Example

```sh
./asset-version.sh navbar.js
# Output: navbar.v1a2b3c4d.js
```

## Rationale
- Follows KISS and UNIX principles: minimal dependencies, portable, and easy to audit.
- No external tools required beyond Bash and coreutils.

---

For more details, see the main project documentation.
