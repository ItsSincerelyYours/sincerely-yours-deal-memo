# Google Docs Integration Setup Guide

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Create Project"
3. Name it: `Sincerely-Yours-Deal-Memo`
4. Click "Create"

## Step 2: Enable Required APIs

1. In your project, go to "APIs & Services" → "Enable APIs and Services"
2. Search and enable these APIs:
   - **Google Docs API**
   - **Google Drive API**

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "+ CREATE CREDENTIALS" → "OAuth 2.0 Client ID"
3. If prompted, configure OAuth consent screen first:
   - Choose "External"
   - App name: `Deal Memo Generator`
   - User support email: Your email
   - Developer contact: Your email
   - Add scopes: 
     - `https://www.googleapis.com/auth/documents`
     - `https://www.googleapis.com/auth/drive.file`
   - Add test users: Your email

4. Create OAuth 2.0 Client ID:
   - Application type: **Web application**
   - Name: `Deal Memo Web Client`
   - Authorized JavaScript origins:
     - `http://localhost`
     - `https://sincerely-yours-deal-memo.vercel.app`
   - Authorized redirect URIs:
     - `http://localhost`
     - `https://sincerely-yours-deal-memo.vercel.app`

5. Click "Create" and save your:
   - **Client ID**: `XXXXXXXXX.apps.googleusercontent.com`
   - **Client Secret**: Keep this secure

## Step 4: Create API Key

1. Click "+ CREATE CREDENTIALS" → "API key"
2. Restrict the API key:
   - Application restrictions: HTTP referrers
   - Add these websites:
     - `http://localhost/*`
     - `https://sincerely-yours-deal-memo.vercel.app/*`
   - API restrictions: Restrict to Google Docs API and Google Drive API

## Step 5: Update Your Code

1. Open `index-with-google.html`
2. Replace these lines:
   ```javascript
   const CLIENT_ID = 'YOUR_CLIENT_ID.apps.googleusercontent.com';
   const API_KEY = 'YOUR_API_KEY';
   ```
   With your actual credentials:
   ```javascript
   const CLIENT_ID = 'your-actual-client-id.apps.googleusercontent.com';
   const API_KEY = 'your-actual-api-key';
   ```

## Step 6: Deploy

1. Rename the file:
   ```bash
   mv index-with-google.html index.html
   ```

2. Commit and push:
   ```bash
   git add .
   git commit -m "Add Google Docs integration"
   git push
   ```

## How It Works

1. User clicks "Connect Google Account"
2. Google OAuth popup appears
3. User authorizes the app
4. User can now click "Create Google Doc" button
5. A new Google Doc is created with the deal memo content
6. The doc opens in a new tab for editing/sharing

## Security Notes

- Never commit your API credentials to GitHub
- Use environment variables for production
- The Google Doc is created in the user's own Google Drive
- Each user must authorize their own Google account

## Testing

1. Test locally first:
   ```bash
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000`

2. Make sure to add `http://localhost:8000` to your OAuth origins

## Troubleshooting

- **"Invalid origin"**: Add your domain to OAuth origins
- **"Scope not authorized"**: Re-configure consent screen
- **"Token expired"**: User needs to re-authenticate
- **403 errors**: Check API quotas and billing