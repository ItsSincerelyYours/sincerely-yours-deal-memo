# Activity Log Setup Guide

## Option 1: Google Sheets Logging (Recommended)

### Step 1: Create a Google Sheet for Logging

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet called "Deal Memo Activity Log"
3. Set up columns:
   - A: Timestamp
   - B: Email
   - C: Name  
   - D: App (US or Canada)
   - E: Status (Success/Denied)
   - F: IP Address (optional)

### Step 2: Enable Google Sheets API

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project
3. Enable "Google Sheets API"

### Step 3: Get the Spreadsheet ID

1. Open your Google Sheet
2. The URL will look like: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
3. Copy the SPREADSHEET_ID part

### Step 4: Share the Sheet

1. Click "Share" in your Google Sheet
2. Share with your Client ID email: `464744009556-3cuv6q0s1tlvta2ig8rp61g6bkfm7v7k@developer.gserviceaccount.com`
3. Give it "Editor" permissions

## Option 2: Email Notifications

Get an email every time someone logs in:

1. Set up email notifications using EmailJS or similar service
2. Receive instant alerts when someone accesses the tool

## Option 3: Google Analytics

Track usage patterns and user sessions:

1. Add Google Analytics to your pages
2. Track custom events for login attempts
3. View reports in Google Analytics dashboard

## Option 4: Vercel Analytics (Built-in)

Use Vercel's built-in analytics:

1. Go to your Vercel dashboard
2. Enable Analytics for both projects
3. View visitor data and page views

Would you like me to implement one of these options?