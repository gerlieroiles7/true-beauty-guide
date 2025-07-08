
# 💄 True Beauty Guide – Funnel Blueprint (Project 1)

This is the first working funnel for Hypatia Ventures’ **Growth & Testing Lab**, combining a responsive landing page, Lemon Squeezy checkout, and full server-side tracking with Facebook Conversions API (CAPI).

## 🚀 Overview

✅ Built with **Next.js (App Router) + TypeScript**  
✅ Checkout via **Lemon Squeezy API**  
✅ Backend webhook (PHP) for post-purchase handling  
✅ Sends **server-side Purchase event** to **Facebook CAPI**  
✅ Captures `clid` and `_p` values for attribution  
✅ Works fully in **test mode** and verified via `events_received: 1`

## 🧰 Tech Stack

- **Next.js (App Router)** — Frontend framework
- **TypeScript** — Type safety and maintainability
- **PHP** — Webhook & Facebook CAPI integration
- **Lemon Squeezy API** — Checkout session + webhook
- **Facebook CAPI** — Purchase conversion tracking
- **Ngrok** — For local webhook testing

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/true-beauty-guide.git
cd true-beauty-guide
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy the example file and fill in your API keys:

```bash
cp .env.example .env
```

Update the values in `.env`:

```env
LEMON_SQUEEZY_API_KEY=your-lemon-squeezy-api-key
FACEBOOK_PIXEL_ID=your-facebook-pixel-id
FACEBOOK_ACCESS_TOKEN=your-facebook-capi-token
```

### 4. Start the Development Server

```bash
npm run dev
```

Visit the site at [http://localhost:3000](http://localhost:3000)

### 5. Start the PHP Webhook Server (Optional)

If testing locally:

```bash
php -S localhost:8001 -t api
```

### 6. Start Ngrok for Webhook Tunnel

```bash
ngrok http 8001
```

Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`) and use it in your Lemon Squeezy dashboard as your webhook URL:

```
https://abc123.ngrok.io/webhook.php
```

## ✅ How to Test the Funnel

1. Load the landing page at `http://localhost:3000`
2. Click the **Buy Now** button
3. A checkout session is created using Lemon Squeezy API
4. After a successful (test) purchase:
   - Lemon Squeezy sends a webhook to your endpoint
   - The webhook verifies the signature and parses the payload
   - Purchase data is sent to Facebook Conversions API
5. Facebook responds with:

```json
{
  "events_received": 1
}
```

## 📝 Environment Variables (.env)

```env
LEMON_SQUEEZY_API_KEY=your_api_key
FACEBOOK_PIXEL_ID=your_pixel_id
FACEBOOK_ACCESS_TOKEN=your_fb_token
```

## 📦 Next Steps

- Switch to **live mode** when you're ready for real purchases
- Deploy the webhook to a live VPS or server
- Use a reserved ngrok domain or custom domain for stable webhook URLs
- Replace landing page content for future funnel tests

## 🙋‍♀️ Author

**Gerlie Roiles**  
Lead Developer – 

## 📜 License

MIT — Free to use with attribution.
