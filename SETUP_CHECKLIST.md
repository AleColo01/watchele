# Watchio - Setup Checklist

## ✅ Before Running Locally

- [ ] Created Supabase account at supabase.com
- [ ] Created new Supabase project
- [ ] Ran SQL from DATABASE_SETUP.sql in Supabase SQL Editor
- [ ] Copied Project URL from Supabase API settings
- [ ] Copied anon public key from Supabase API settings
- [ ] Updated SUPABASE_URL in app.js
- [ ] Updated SUPABASE_ANON_KEY in app.js

## ✅ Testing Locally

- [ ] Started local server (python -m http.server 8000)
- [ ] Opened http://localhost:8000 in browser
- [ ] Added test entry successfully
- [ ] Verified entry appears in list
- [ ] Deleted test entry
- [ ] Refreshed page and confirmed data persists

## ✅ Before Deploying to Vercel

- [ ] Verified app works perfectly on localhost
- [ ] Credentials are correct in app.js
- [ ] Initialized git repository: `git init`
- [ ] Created GitHub account (if you don't have one)
- [ ] Created new GitHub repository named "watchio"

## ✅ Deployment to Vercel

- [ ] Pushed code to GitHub:
  ```bash
  git add .
  git commit -m "Initial commit: Watchio app"
  git branch -M main
  git remote add origin https://github.com/YOUR_USERNAME/watchio.git
  git push -u origin main
  ```
- [ ] Signed up for Vercel
- [ ] Imported GitHub repository to Vercel
- [ ] Clicked Deploy
- [ ] Verified deployed app works at Vercel URL

## ✅ Post-Deployment

- [ ] Saved Vercel deployment URL
- [ ] Shared link with others (it's public!)
- [ ] Tested all features on deployed version
- [ ] (Optional) Added custom domain in Vercel settings

## 📞 Common Issues

If app doesn't work:
1. Check browser console (F12 → Console) for errors
2. Verify Supabase credentials in app.js
3. Make sure movies table exists in Supabase
4. Check that RLS policy allows anonymous access

## 🎉 You're Done!

Your app is live and ready to use. Start adding your favorite movies and series!
