# Won Nothing — Deploy Checklist

Segui questo file dall'alto in basso. Ogni step è indipendente dal precedente solo se segnalato.

---

## PRE-DEPLOY AUDIT

- [x] `index.html` — link a `styles.css` e `script.js` ✓
- [x] `thank-you.html` — link a `styles.css`, `script.js`, `index.html`, `certificate.html` ✓
- [x] `certificate.html` — self-contained, link a `thank-you.html` ✓
- [x] Zero dipendenze esterne (nessun CDN, nessun font Google, nessuna API)
- [x] Zero build step (deploy diretto dei file)
- [x] Responsive mobile testato in styles.css (breakpoint 600px)
- [ ] Sostituire link Stripe (vedi Step 5)
- [ ] Collegare link review Hall of Losers (vedi Step 6)

---

## STEP 1 — Crea il repository GitHub

### Opzione A — Repository dedicato per il sito (raccomandata)

Crea un repo che contiene solo i file della cartella `site/`.
Questo è il metodo più pulito: Vercel deploya tutto quello che è nel repo.

1. Vai su [github.com/new](https://github.com/new)
2. Imposta:
   - **Repository name:** `won-nothing` (o `wonnothing-site`)
   - **Visibility:** Private (puoi rendere pubblico dopo il lancio)
   - **Initialize:** lascia tutto deselezionato
3. Clicca **Create repository**
4. GitHub mostrerà i comandi. Aprire il terminale nella cartella `site/`:

```bash
cd "Product Forge Builds/Won Nothing MVP/site"
git init
git add .
git commit -m "Initial deploy — Won Nothing MVP"
git branch -M main
git remote add origin https://github.com/TUO-USERNAME/won-nothing.git
git push -u origin main
```

### Opzione B — Push della cartella dal repo Discovery Lab (alternativa)

Se vuoi mantenere tutto nel repo esistente, usa questa opzione. In Vercel imposterai la root directory al percorso corretto (vedi Step 2).

```bash
git add "Product Forge Builds/Won Nothing MVP/site/"
git commit -m "Add Won Nothing static site"
git push origin main
```

---

## STEP 2 — Deploy su Vercel

1. Vai su [vercel.com](https://vercel.com) → **Add New → Project**
2. Clicca **Import Git Repository** e seleziona `won-nothing` (o il repo Discovery Lab)
3. **Configura il progetto:**

   | Campo | Valore |
   |-------|--------|
   | Framework Preset | **Other** |
   | Root Directory | `/` se Opzione A · `Product Forge Builds/Won Nothing MVP/site` se Opzione B |
   | Build Command | *(lascia vuoto)* |
   | Output Directory | *(lascia vuoto)* |
   | Install Command | *(lascia vuoto)* |

4. Clicca **Deploy**

Vercel detecta i file HTML statici e deploya in ~30 secondi.
Ricevi un URL di anteprima tipo: `won-nothing.vercel.app`

- [x] Deploy completato su `*.vercel.app`

---

## STEP 3 — Test su URL Vercel (prima del dominio)

Apri `won-nothing.vercel.app` e verifica manualmente:

**index.html:**
- [ ] Titolo "WON NOTHING" visibile nel hero
- [ ] Tabella probabilità visibile con "Nothing → 100%" in evidenza nera
- [ ] FAQ funzionante (click apre/chiude risposta)
- [ ] Bottone "Lose €1" → porta su `stripe-link-placeholder.com` (atteso, placeholder)
- [ ] Layout corretto su mobile (testa con DevTools o telefono reale)

**thank-you.html** (accedi direttamente: `won-nothing.vercel.app/thank-you.html`):
- [ ] Headline "Congratulations. You officially won nothing." visibile
- [ ] Ticket #0001 visibile
- [ ] "Promises kept → 100%" in evidenza nera
- [ ] Bottone "View & Download Certificate" → apre `certificate.html`
- [ ] Link "← Won Nothing" nel nav → torna a `index.html`

**certificate.html** (accedi direttamente: `won-nothing.vercel.app/certificate.html`):
- [ ] Certificato visibile con bordo doppio
- [ ] Numero #0001 visibile in grande
- [ ] Bottone "Save as PDF / Print" → apre dialog di stampa del browser
- [ ] Selezionando "Save as PDF" nel dialog → PDF salvato correttamente
- [ ] Link "← Back" → torna a `thank-you.html`

---

## STEP 4 — Collega wonnothing.com

1. In Vercel, vai al progetto → **Settings → Domains**
2. Clicca **Add** → inserisci `wonnothing.com` → clicca **Add**
3. Ripeti per `www.wonnothing.com`
4. Vercel mostra i DNS record da aggiungere. Vai sul pannello del tuo registrar (dove hai comprato il dominio):

   **Record da aggiungere:**

   | Tipo | Nome | Valore |
   |------|------|--------|
   | A | `@` | `76.76.21.21` |
   | CNAME | `www` | `cname.vercel-dns.com` |

   > I valori esatti li mostra Vercel nel dashboard — usa quelli, non questi se differiscono.

5. Salva i record DNS
6. Attendi propagazione: di solito 5–30 minuti, massimo 48h
7. Vercel rileva automaticamente i DNS e provisiona SSL (HTTPS)

- [ ] `wonnothing.com` risponde con il sito
- [ ] `www.wonnothing.com` reindirizza correttamente
- [ ] HTTPS attivo (lucchetto nel browser)

---

## STEP 5 — Sostituisci il link Stripe

Quando il tuo Stripe Payment Link è pronto (`https://buy.stripe.com/XXXXXX`):

**File da modificare: `index.html`**

Cerca e sostituisci tutte le occorrenze di:
```
https://stripe-link-placeholder.com
```
con il tuo link Stripe reale.

Occorrenze in `index.html`: **2** (Hero CTA, Final CTA)

```bash
# Verifica le righe:
grep -n "stripe-link-placeholder" index.html
```

**In Stripe Dashboard**, imposta la **Success URL** su:
```
https://wonnothing.com/welcome-loser.html
```

> `thank-you.html` è mantenuta come pagina di riserva ma non è più il target di Stripe.

Dopo la modifica:
```bash
git add index.html
git commit -m "Connect Stripe payment link"
git push
```
Vercel re-deploya automaticamente in ~20 secondi.

- [ ] Link Stripe sostituito in `index.html` (riga ~35 e ~157)
- [ ] Success URL in Stripe → `https://wonnothing.com/thank-you.html`
- [ ] Test pagamento reale: €1 → redirect corretto su thank-you.html

---

## STEP 6 — Collega il form Hall of Losers

Quando il tuo form è pronto (Google Forms, Tally, Typeform):

**File da modificare: `thank-you.html`**

Cerca:
```html
<a href="#review" class="btn-outline">Leave a Review</a>
```

Sostituisci `#review` con l'URL del form:
```html
<a href="https://tally.so/r/XXXXXX" class="btn-outline">Leave a Review</a>
```

- [ ] Form Hall of Losers collegato

---

## STEP 7 — Test finale completo

Esegui l'intero flusso utente:

- [ ] Apri `wonnothing.com` su desktop
- [ ] Apri `wonnothing.com` su mobile (iPhone o Android reale)
- [ ] Clicca "Lose €1" → va su Stripe (o placeholder)
- [ ] Naviga manualmente su `wonnothing.com/thank-you.html`
- [ ] Clicca "View & Download Certificate" → apre certificato
- [ ] Clicca "Save as PDF / Print" → salva PDF
- [ ] Verifica che il PDF salvato sembri corretto (numero, testo, layout)
- [ ] Clicca "← Back" → torna a thank-you.html
- [ ] Clicca logo nav "Won Nothing" → torna a index.html
- [ ] FAQ: clicca tutte e 4 le domande → risposta appare/scompare
- [ ] HTTPS attivo su tutte le pagine
- [ ] Nessun errore in console (F12 → Console → nessun errore rosso)

---

## NOTE OPERATIVE

**La thank-you.html è accessibile senza pagamento.**
Su un sito statico puro non è possibile proteggere le pagine lato server. Chi conosce l'URL può accedervi. Per questo MVP è accettabile — la pagina non consegna nulla di valore senza il numero ticket reale. Se in futuro vuoi proteggere la pagina, servirà un backend o Vercel Edge Functions.

**Aggiornamenti futuri.**
Ogni `git push origin main` triggera un re-deploy automatico su Vercel. Nessuna azione manuale richiesta dopo il primo setup.

**Rollback.**
Se un deploy va storto: Vercel → progetto → Deployments → clicca su un deploy precedente → Promote to Production.

---

## FILE TREE FINALE

```
site/
├── index.html            ← Landing page
├── thank-you.html        ← Post-pagamento
├── certificate.html      ← Certificato stampabile/PDF
├── styles.css            ← Design system condiviso
├── script.js             ← FAQ accordion
├── README_DEPLOY.md      ← Guida deploy estesa
└── DEPLOY_CHECKLIST.md   ← Questo file
```
