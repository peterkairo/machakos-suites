# Deployment

This repository contains a GitHub Actions workflow that builds and deploys the site to GitHub Pages.

Files added for deployment:

- `.github/workflows/deploy.yml` — builds (`npm run build`) and deploys the `./dist` output to GitHub Pages on pushes to `main`.
- `CNAME` — placeholder file containing a single line with the custom domain. Replace `<your.custom.domain.example>` with your real domain.

To finish deployment and enable a custom domain:

1. Replace the placeholder in `CNAME` with your actual domain (for example `stay.mydomain.com`).
2. Commit and push to `main`.
3. Configure DNS with your domain provider:
   - For an apex domain (example.com): add A records pointing to GitHub Pages IP addresses (see GitHub Pages docs).
   - For a subdomain (www.example.com or stay.example.com): add a CNAME pointing to `<username>.github.io` or follow provider docs.
4. After the workflow runs (it triggers on push to `main`), GitHub Pages will serve the site and use the `CNAME` file for the custom domain.

If you'd like, I can:

- Add your custom domain to the `CNAME` file and attempt to push the change to the remote repository (I will prompt before pushing).
- Attempt to push the current branch and trigger the deployment workflow now (requires permission/credentials in the environment).
- Use Vercel or Netlify instead (they provide automatic HTTPS and easier DNS setup) — tell me which provider and I'll prepare the config.

Tell me the custom domain you want and whether you'd like me to attempt pushing the `CNAME` and triggering deployment.
