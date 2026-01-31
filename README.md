TikTok Ads Creative Flow (Frontend Assignment)

Overview

This project is a frontend-only application that simulates a TikTok Ads creative setup flow.
The focus is on OAuth integration, conditional validation, and graceful API error handling, not on building a full Ads Manager.

The application allows a user to:

Connect a TikTok Ads account using OAuth
Create a minimal ad with creative details
Handle real-world API errors in a user-friendly way
Tech Stack

Library: React
Styling: Minimal CSS
Backend: Not required
API Integration: TikTok Ads API (mocked where necessary)
How to Run the Project

Prerequisites

Node.js (v16 or later recommended)
npm or yarn

Install dependencies
npm install

Start development server
npm run dev

The app will be available at:

http://localhost:5173

OAuth Setup Steps (TikTok Ads)

This project uses TikTok Ads OAuth – Authorization Code Flow.

Step 1: Create TikTok Developer Account
Sign up at TikTok for Developers — Enable TikTok Ads access

Step 2: Create a TikTok Ads App

Go to the TikTok Developer dashboard
Create a new Ads App
Note down: Client Key, Client Secret
Step 3: Configure OAuth
Set Redirect URI to:
http://localhost:5173/oauth/callback

Enable required scope:
ads_management

Step 4: Update Project Config
Add your client_key in the OAuth config file

The app will:

Redirect users to TikTok OAuth
Receive authorization code
Exchange it for an access token
Store the token in localStorage
OAuth Error Handling

The UI converts OAuth/API errors into human-readable messages, including:

Invalid client credentials
Missing permission scopes
Expired or revoked tokens
Geo-restriction (403 errors)
⚠️ Raw API error JSON is never shown to users.

Music Selection Logic

The app supports three music options:

Existing Music ID

User enters a Music ID
Validated via API or mocked endpoint
Invalid ID blocks submission
Upload / Custom Music

Upload is simulated
A mock Music ID is generated
Validation errors are handled gracefully
No Music

Allowed only if Objective = Traffic
Blocked if Objective = Conversions
All rules are enforced in the UI before submission.

Submission & Error Handling

On ad submission, the app handles:

Invalid or expired OAuth token
Missing permissions
Invalid music ID
Geo-restriction errors
UX Strategy

Field-level errors: Inline messages
System-level errors: Global error banner
Clear guidance on how to fix issues
Assumptions & Shortcuts

To keep the project focused and realistic under time constraints, the following assumptions were made:

No backend is used; token storage is handled on the frontend
Some TikTok Ads APIs are mocked due to geo or access restrictions
Music upload is simulated (no real file handling)
Access token is stored in localStorage for simplicity
UI styling is minimal to prioritize logic and correctness
No retry or refresh-token logic implemented
All assumptions are documented intentionally.

Possible Improvements

With more time, the following could be added:

Backend-based OAuth token handling
Token refresh mechanism
Retry logic for failed API calls
Better loading and success states
Unit and integration tests
Final Note

This project is designed to reflect a real-world frontend feature built under time pressure, focusing on decision-making, validation logic, and error handling, rather than feature completeness.

Plain text (presentation / slide-friendly)

TikTok Ads Creative Flow — Frontend Assignment

Overview:
A frontend-only demo that simulates a TikTok Ads creative flow: OAuth, conditional validation, and clear API error handling. Not a full Ads Manager.

User capabilities:

Connect a TikTok Ads account (OAuth)
Create a minimal ad (creative details)
Receive user-friendly API error messages
Tech stack:
React, minimal CSS, frontend-only; TikTok APIs mocked where necessary.

How to run:
Prereqs: Node.js v16+, npm/yarn
Commands:

npm install
npm run dev
App: http://localhost:5173
OAuth setup (Authorization Code Flow):

Create TikTok Developer account and enable Ads access.
Create an Ads App in TikTok dashboard; note Client Key & Client Secret.
Set redirect URI to: http://localhost:5173/oauth/callback
Enable scope: ads_management
Add client_key to project config. Flow: redirect → receive code → POST /api/auth/exchange → exchange server-side → store access token in localStorage.
OAuth errors handled:

Invalid credentials, missing scopes, expired/revoked tokens, geo-restriction (403). UI shows friendly messages; raw API JSON is hidden.
Music selection rules:

Existing Music ID: validated (invalid ID blocks submit)
Upload/Custom music: simulated; returns mock ID
No music: allowed only for Objective=Traffic; blocked for Conversions
All enforced client-side before submission.
Submission & error handling:
Handles invalid/expired tokens, missing permissions, invalid music IDs, geo-restrictions. UX: inline field errors + a global error banner with fix guidance.

Assumptions & shortcuts:

No backend; token stored in localStorage (demo-only)
Some TikTok APIs mocked for geo/access limits
Music upload simulated (no real files)
No refresh-token or secure cookie flows
Minimal styling; focus on logic
All assumptions documented in README

For any questions or further information, feel free to contact:
Saurabh Nariya
📧 saurabhnariya1234@gmail.com