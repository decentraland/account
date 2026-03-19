# Decentraland Account

[![Coverage Status](https://coveralls.io/repos/github/decentraland/account/badge.svg?branch=main)](https://coveralls.io/github/decentraland/account?branch=main)

Account management UI for Decentraland at account.decentraland.org. Allows authenticated users to manage connected wallets, notification settings, credits balance, and email subscriptions.

## Table of Contents

- [Features](#features)
- [Dependencies & Related Services](#dependencies--related-services)
- [Getting Started](#getting-started)
- [Testing](#testing)
- [AI Agent Context](#ai-agent-context)

## Features

- **Wallet Management**: View connected wallets and MANA balances across chains
- **Notification Settings**: Enable/disable in-app and email notifications per category
- **Credits Settings**: View credits balance and manage credits-related preferences
- **Email Subscription**: Subscribe/unsubscribe and confirm email via token links (`/confirm-email/:token`, `/credits-email-confirmed/:token`, `/confirm-email-challenge/:token`)
- **Sign-In Gate**: All pages require wallet authentication; unauthenticated users are redirected to sign-in

## Dependencies & Related Services

- **Auth UI** ([github.com/decentraland/auth](https://github.com/decentraland/auth)): handles sign-in before users reach protected pages
- **Catalyst / Peer API** ([github.com/decentraland/catalyst](https://github.com/decentraland/catalyst)): fetches profile and avatar data
- **Notifications API**: reads/updates per-user notification subscription settings
- **Credits API**: fetches credits balance and manages credits settings

### What This UI Does NOT Handle

- Profile editing (profile site)
- Social features (social site)
- Wallet transactions and NFT trading (marketplace)
- Authentication logic (auth site)

## Getting Started

### Prerequisites

- Node 20+
- npm

### Installation

```bash
npm install
```

### Configuration

Create a copy of `.env.example` and name it `.env.development`:

```bash
cp .env.example .env.development
```

### Running the UI

```bash
npm run start
```

## Testing

### Running Tests

```bash
npm test
```

### Test Structure

Test files are located in `src/specs/` and `src/tests/`, using the `*.spec.ts` naming convention.

## AI Agent Context

For detailed AI Agent context, see [docs/ai-agent-context.md](docs/ai-agent-context.md).

---
