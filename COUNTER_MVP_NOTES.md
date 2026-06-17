# Counter MVP Notes

## Current System

The site uses a static `counter.json` file as the single source of truth for public loser statistics.
`script.js` fetches it on page load and populates any element with `data-counter` or `data-loser-number` attributes.
If the fetch fails, HTML fallback values remain in place (site stays elegant).

## Current Manual Update Flow

After a real successful payment, manually increment `official_losers` in `counter.json`, commit and push.

```json
{
  "official_losers": 1,
  "prizes_distributed": 0,
  "complaints": 0,
  "promises_broken": 0
}
```

## Why Manual For Now

This avoids premature backend complexity before validating whether external users actually pay.

## Future Upgrade Trigger

When Won Nothing reaches **5 external real payments**, implement Stripe webhook automation.

## Future Architecture

```
Stripe successful payment
→ serverless webhook
→ increment persistent counter
→ generate unique official loser number
→ redirect user with unique number in URL
→ certificate displays assigned number
```

## Risks

- Manual update may lag behind real payments.
- Multiple payments close together could temporarily show the same number.
- This is acceptable only during early validation.

## Product Reason

The official loser number and homepage counter are not decoration.
They are social proof and identity infrastructure.
