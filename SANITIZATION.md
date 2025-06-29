# Sanitization Utility for Navbar

This site includes a minimal Bash-based sanitization script to remove potentially unsafe content from HTML/JS files.

## Usage

From the `sites/navbar` directory:

```sh
./sanitize.sh <input-file> <output-file>
```

- Removes `<script>` blocks and inline event handlers (e.g., `onclick`) from the input file and writes the sanitized output to the specified output file.
- Designed for simple, automated pre-deployment or CI/CD use.

## Example

```sh
./sanitize.sh navbar.html navbar.sanitized.html
```

## Rationale
- Follows KISS and UNIX principles: no dependencies beyond Bash and coreutils (sed).
- Not a full HTML sanitizer, but effective for basic static site protection.

---

For more details, see the main project documentation.
