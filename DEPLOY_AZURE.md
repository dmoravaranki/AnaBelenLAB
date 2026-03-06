# Deploying Bee AI to Azure Static Web Apps

Follow these steps to deploy your Next.js Bee AI app to Azure:

## 1. Prerequisites
- Azure account (https://portal.azure.com)
- GitHub account (for CI/CD)
- Azure CLI installed (optional, for local deployment)

## 2. Push Your Code to GitHub
1. Create a new GitHub repository (private or public).
2. Push your Bee AI project code to this repo.

## 3. Create Azure Static Web App
1. Go to the Azure Portal.
2. Click **Create a resource** > **Static Web App**.
3. Fill in:
   - **Subscription**: Your Azure subscription
   - **Resource Group**: Create new or use existing
   - **Name**: bee-ai (or your choice)
   - **Region**: Closest to you
   - **Plan type**: Free (or Standard)
   - **Source**: GitHub
   - **Repository**: Select your repo
   - **Branch**: main (or your default branch)
4. Click **Next: Build >**
   - **Build Presets**: Next.js
   - **App location**: /
   - **Api location**: /api
   - **Output location**: .next
5. Click **Review + Create** and then **Create**.

## 4. Configure Environment Variables
1. In Azure Portal, go to your Static Web App resource.
2. Under **Settings**, select **Configuration**.
3. Add these variables:
   - `AZURE_OPENAI_ENDPOINT`
   - `AZURE_OPENAI_API_KEY`
   - `AZURE_OPENAI_DEPLOYMENT`
4. Save and restart the app.

## 5. Test Your App
- After deployment, Azure provides a public URL (e.g., https://<your-app>.azurestaticapps.net).
- Open it in your browser and test the chat.

## 6. Updating Your App
- Push changes to your GitHub repo. Azure will auto-deploy.

---

**Docs:**
- https://learn.microsoft.com/en-us/azure/static-web-apps/deploy-nextjs
- https://learn.microsoft.com/en-us/azure/ai-services/openai/

For advanced features (custom domains, auth, etc.), see Azure Static Web Apps documentation.