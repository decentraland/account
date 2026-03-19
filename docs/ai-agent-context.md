# AI Agent Context

**Service Purpose:**

The Account site (`account.decentraland.org`) is the user account management dApp for Decentraland. It allows authenticated users to manage their wallets, MANA token balances (Ethereum and Polygon), email notification subscriptions, and Marketplace Credits settings. It requires wallet-based authentication and gates all primary functionality behind a `ProtectedRoute`.

**Key Capabilities:**

- Wallet management: view connected wallets, deposit/withdraw MANA between Ethereum L1 and Polygon L2, bridge transactions via Polygon SDK and Transak/MoonPay on-ramp integrations
- Notification settings: manage email notification subscriptions for Decentraland platform events (via `@dcl/schemas` `SubscriptionDetails`)
- Credits settings: view Marketplace Credits enrollment status and opt-out from the credits program via the credits-server API
- Email confirmation flows: handle `/confirm-email/:token` and `/credits-email-confirmed/:token` paths, with a unified confirmation page at `/confirm-email-challenge/:token`
- Cloudflare Turnstile bot verification (feature-flagged)
- Referral program support (feature-flagged)
- Sentry error tracking and Segment analytics
- Intercom live support widget (shown on main page, hidden on email confirmation pages)

**Communication Pattern:**

- HTTP REST: communicates with the credits-server API (`CREDITS_SERVER_URL`), Transactions API (`TRANSACTIONS_API_URL`), and Marketplace API (`MARKETPLACE_API_URL`)
- Ethereum JSON-RPC via ethers.js / decentraland-connect for wallet interactions
- Polygon SDK (`@maticnetwork/maticjs`) for L1<->L2 MANA bridging
- Thirdweb SDK for additional wallet connection options

**Technology Stack:**

- Runtime: Node.js 20+
- Language: TypeScript
- Frontend framework: React 18 with Vite 5
- Routing: React Router v5
- State management: Redux + Redux-Saga + Reselect
- UI libraries: `decentraland-ui`, `decentraland-ui2`, MUI (via `decentraland-ui2`)
- Animations: Lottie (lottie-react)
- Internationalisation: react-intl
- Testing: Jest 29 + @testing-library/react, with redux-saga-test-plan for saga tests
- Linting/formatting: ESLint (`@dcl/eslint-config`) + Prettier, Husky pre-commit hooks
- Build: Vite with SWC

**External Dependencies:**

- `CREDITS_SERVER_URL` (credits.decentraland.org) — credits enrollment status and opt-out
- `TRANSACTIONS_API_URL` (transactions-api.decentraland.org) — meta-transaction relay for gasless transactions
- `MARKETPLACE_API_URL` (marketplace-api.decentraland.org) — marketplace data
- `PEER_URL` (peer.decentraland.org) — Decentraland catalyst peer
- `MARKETPLACE_URL` — link target for marketplace navigation
- `AUTH_URL` — authentication endpoint (relative `/auth`)
- Transak / MoonPay — fiat on-ramp widget integrations (API keys in env config)
- Sentry (`SENTRY_DSN`) — error monitoring
- Segment (`SEGMENT_API_KEY`) — analytics
- Intercom (`INTERCOM_APP_ID`) — support chat widget
- Cloudflare Turnstile (`REACT_APP_CLOUDFLARE_TURNSTILE_SITE_KEY`) — bot protection

**Key Concepts:**

- **ProtectedRoute**: All main account pages require a connected wallet. Unauthenticated users are redirected to `/sign-in` (`SignInPage`).
- **MANA bridging**: The `mana` module handles depositing (L1 to L2) and withdrawing (L2 to L1) MANA using the Polygon SDK. The `decentraland-transactions` library is used for meta-transactions.
- **Subscription module**: Manages email notification preferences using the `SubscriptionDetails` type from `@dcl/schemas`. Actions follow the Request/Success/Failure Redux pattern.
- **Credits settings**: The `creditsSettings` module calls the credits-server API to fetch enrollment status (`enrolled`, `opted_out`, `not_registered`) and allows users to opt out. The API client lives at `src/lib/api/credits.ts`.
- **Feature flags**: Feature availability is controlled via `decentraland-dapps` feature flags (e.g., streaming, Turnstile verification, referrals). Selectors are in `src/modules/features/selectors.ts`.
- **@dcl/ui-env config pattern**: Environment-specific config values (dev/stg/prod) are stored in `src/config/env/*.json` and accessed via `config.get('KEY')` from `@dcl/ui-env`.

**Out of Scope:**

- Authentication and wallet connection flows — handled by `auth` (`decentraland.org/auth`)
- Marketplace browsing and trading — handled by the Marketplace dApp
- Governance proposals and voting — handled by `governance-ui`
- User profile avatar/wearable customisation — handled by the Builder or auth setup flow

**Project Structure:**

```
src/
  components/        UI components (Routes, MainPage, Wallets, Notifications, CreditsSettings, Navbar, Footer, Modals, etc.)
  config/            @dcl/ui-env config setup; env JSONs in config/env/
  contracts/         TypeChain-generated ethers contract bindings
  hooks/             React hooks
  images/            Static image assets
  lib/               Non-Redux utilities; lib/api/ contains API clients (credits, coingecko)
  locales/           i18n translation JSON files
  modules/           Redux modules: analytics, creditsSettings, features, location, mana, modal, subscription, wallet
  specs/             Integration-level test specs
  tests/             Unit tests
  themes/            CSS theme overrides
```

**Configuration:**

Config is managed via `@dcl/ui-env` (`src/config/index.ts`). The active environment is set by `VITE_REACT_APP_DCL_DEFAULT_ENV` at build time. Key variables from `src/config/env/prod.json`:

- `CHAIN_ID` — Ethereum chain (1 = mainnet)
- `PEER_URL` — Catalyst peer URL
- `MARKETPLACE_API_URL` — Marketplace API
- `TRANSACTIONS_API_URL` — Meta-transaction relay
- `CREDITS_SERVER_URL` — Credits service
- `AUTH_URL` — Auth service path
- `SEGMENT_API_KEY` — Analytics
- `SENTRY_DSN` — Error tracking
- `INTERCOM_APP_ID` — Support chat
- `REACT_APP_CLOUDFLARE_TURNSTILE_SITE_KEY` — Bot protection
- `MANA_CONTRACT_ADDRESS`, `ERC20_PREDICATE_CONTRACT_ADDRESS`, `ROOT_CHAIN_MANAGER_CONTRACT_ADDRESS` — Polygon bridge contracts

**Testing:**

Tests run with `npm test` (Jest 29 + jsdom environment). Saga tests use `redux-saga-test-plan`. Component tests use `@testing-library/react`. Test files live alongside source in `src/specs/` and `src/tests/`, and also as `.spec.tsx` files co-located with modules (e.g., `src/modules/subscription/reducer.spec.ts`). Coverage via `npm run test:coverage`.
