User-provided PostgreSQL connection settings (provided on 2026-05-06):

DATABASE_URL="postgresql://Makmiller:Rty45678%2B@91.239.232.91:6432/NextERP?schema=public&pgbouncer=true&connect_timeout=10"
DIRECT_URL="postgresql://Makmiller:Rty45678%2B@91.239.232.91:5432/NextERP?schema=public&connect_timeout=10"

Notes:
- DATABASE_URL uses PgBouncer on port 6432.
- DIRECT_URL points to direct Postgres connection on port 5432.
- Keep these values out of git-tracked files and use environment variables.