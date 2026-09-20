# WattWise AI

**An AI powered energy saver** for the Smart Living hackathon problem.

WattWise monitors simulated household energy usage, highlights high-load devices, estimates monthly consumption and bill, and provides an optimization action.

## Stack
- React + Vite + JavaScript
- Lucide React
- Vercel serverless API
- Simulated appliance data

## Run locally
```bash
npm install
npm run dev
```

Build with `npm run build`.

The prototype uses a demo tariff of **₹8.2/kWh**; it is not the user's actual electricity tariff.

## API
- `GET /api/energy` — service status
- `POST /api/energy` — daily/monthly kWh, estimated bill and top consumers

## Security
Never commit a real `OPENAI_API_KEY`. Use local/Vercel environment variables and server-side calls.

## Roadmap
1. Rule-based insights
2. Historical storage
3. Consumption/bill prediction
4. Anomaly detection
5. Natural-language AI recommendations
6. ESP32 and controllable smart-plug integration

Current sensor readings are simulated for the hackathon prototype.
