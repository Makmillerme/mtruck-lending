User ran npm install in D:\Project\mtruck\mtrucklending.

Observed output:
- Deprecation warning: @types/bcryptjs@3.0.0 is a stub; bcryptjs already ships its own types.
- Installed: 230 packages.
- Audit summary: 3 moderate severity vulnerabilities.
- npm suggested: npm audit fix --force (breaking changes possible).

Recommended safe follow-up:
1) Run npm audit to inspect exact vulnerable packages/paths.
2) Prefer targeted upgrades or npm audit fix without --force first.
3) Remove @types/bcryptjs from devDependencies to avoid redundant typings warning.

Status:
- Install completed successfully.
- Security remediation pending review.