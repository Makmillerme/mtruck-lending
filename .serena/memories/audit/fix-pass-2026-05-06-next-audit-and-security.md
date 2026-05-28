User requested professional fix pass with /audit.

Actions executed:
1) Next.js runtime audit via user-next-devtools MCP
   - init completed
   - nextjs_index found server on port 3000
   - get_errors: no config/session runtime errors
   - get_routes: /, /admin, /api/admin/login
   - get_logs path inspected, no significant runtime errors

2) Next.js docs-grounded decisions (nextjs_docs)
   - Reviewed /docs/app/api-reference/directives/use-client
   - Reviewed /docs/app/getting-started/server-and-client-components
   - Reviewed /docs/app/api-reference/config/next-config-js/typescript
   Conclusions applied:
   - Keep client boundaries narrow
   - Avoid dangerous ignoreBuildErrors in production config

3) Code changes (implemented through Serena)
   - Added components/landing/home-client.tsx (client entry for interactive landing state)
   - Converted app/page.tsx into server wrapper that renders <HomeClient />
   - Updated next.config.mjs to remove typescript.ignoreBuildErrors and keep only images.unoptimized

4) Dependency/security handling
   - Re-ran npm audit: still 3 moderate vulnerabilities, all chained through next -> nested postcss advisory GHSA-qx2v-qp2m-jg93
   - Upstream limitation remains with current available next version in environment
   - Installed eslint devDependency so lint binary exists (lint config still missing in repo)

5) Current status
   - /audit critical code-quality improvements applied (server/client boundary + build safety)
   - Residual security issue remains upstream in Next dependency chain; no safe non-breaking local patch available now
   - Additional task suggested: add proper eslint flat config for repository linting workflow.