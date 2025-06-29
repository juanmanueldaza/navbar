# Navbar Bash Test Scaffolding

This directory includes a minimal Bash-based test runner for the navbar site's scripts and configuration.

## Usage

From the `sites/navbar` directory:

```sh
./test-navbar.sh
```

- Runs basic tests for the asset versioning script and other Bash utilities.
- Prints PASS/FAIL for each test and exits nonzero on failure.

## Rationale
- Follows KISS and UNIX principles: no dependencies beyond Bash and coreutils.
- Easy to extend with more tests as new scripts or features are added.

---

For more details, see the main project documentation.
