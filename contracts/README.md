# Creator Hub - Smart Contracts

Stellar Soroban smart contracts for Creator Hub escrow and payment management.

## 🚀 Quick Start

### Prerequisites

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Stellar CLI
curl https://install.stellar.org | bash

# Verify installations
rustc --version
stellar --version
```

### Development

```bash
# Build contract
stellar contract build

# Run tests
cargo test

# Generate WASM
stellar contract build --release
```

### Deployment to Testnet

```bash
# Set up testnet account
stellar contract deploy --source-account <PUBLIC_KEY> --network testnet

# Store contract ID for backend
export STELLAR_CONTRACT_ID=<DEPLOYED_CONTRACT_ID>
```

## 📋 Contract Functions

### `initialize(admin: Address)`

Initialize contract with admin address.

**Authorization**: Admin must sign
**Parameters**:
- `admin`: Admin wallet address

**Example**:
```rust
contract.initialize(env, admin_address)
```

---

### `create_escrow(project: Address, task_id: Symbol, amount: i128, token: Address)`

Create escrow for a task (project locks funds).

**Authorization**: Project must sign
**Parameters**:
- `project`: Project address funding the task
- `task_id`: Unique identifier for task
- `amount`: Reward amount in stroops (1 XLM = 10,000,000 stroops)
- `token`: Token address (native XLM or USDC contract)

**Returns**: Result<(), ContractError>

**Example**:
```rust
contract.create_escrow(
    env,
    project_addr,
    Symbol::short("task-123"),
    10_000_000, // 1 XLM
    usdc_token_addr
)
```

---

### `release_payment(task_id: Symbol, winner: Address, amount: i128)`

Release funds from escrow to winner.

**Authorization**: Project must sign
**Parameters**:
- `task_id`: Task identifier
- `winner`: Winner's wallet address
- `amount`: Amount to transfer

**Returns**: Result<(), ContractError>

**Example**:
```rust
contract.release_payment(
    env,
    Symbol::short("task-123"),
    winner_addr,
    10_000_000
)
```

---

### `get_escrow(task_id: Symbol)`

Get escrow details for a task.

**Parameters**:
- `task_id`: Task identifier

**Returns**: Result<(Address, i128), ContractError>

**Example**:
```rust
let (project, amount) = contract.get_escrow(env, Symbol::short("task-123"))?;
```

---

### `refund_project(task_id: Symbol)`

Refund project if no winner selected.

**Authorization**: Project must sign
**Parameters**:
- `task_id`: Task identifier

**Returns**: Result<(), ContractError>

**Example**:
```rust
contract.refund_project(env, Symbol::short("task-123"))
```

---

## 🔗 Integration with Backend

Once deployed, update backend with contract ID:

```bash
# In backend/.env
STELLAR_CONTRACT_ID=CAG...QQXA
```

Backend uses contract for:
- Creating escrows when tasks are posted
- Releasing payments when winners selected
- Validating escrow balances
- Handling refunds

## 📚 Resources

- [Soroban Documentation](https://soroban.stellar.org)
- [Stellar SDKs & Docs](https://developers.stellar.org)
- [Rust Book](https://doc.rust-lang.org/book)
- [Contract Examples](https://github.com/stellar/rs-soroban-sdk/tree/main/examples)

## 🧪 Testing

```bash
# Run all tests
cargo test

# Run specific test
cargo test test_create_escrow -- --nocapture

# Generate test coverage
cargo tarpaulin
```

## 🛠️ Development Tools

### Stellar CLI Commands

```bash
# Build contract
stellar contract build

# Build optimized release
stellar contract build --release

# Generate WASM
stellar contract build --output-dir ./target

# Deploy to testnet
stellar contract deploy \
  --source-account <PUBLIC_KEY> \
  --network testnet \
  --wasm ./target/wasm32-unknown-unknown/release/creator_hub_contract.wasm
```

### Local Testing with Sandbox

```bash
# Start Stellar Quickstart (local sandbox)
docker pull stellar/quickstart:latest
docker run --rm -it \
  -p 8000:8000 \
  -p 5432:5432 \
  -p 6379:6379 \
  stellar/quickstart:latest \
  /start testnet

# In another terminal, run tests
cargo test
```

## 📦 Project Structure

```
contracts/
├── src/
│  ├── lib.rs          # Main contract implementation
│  ├── errors.rs       # Error definitions (coming soon)
│  └── events.rs       # Event emissions (coming soon)
├── Cargo.toml         # Rust dependencies
├── Cargo.lock         # Dependency lock file
└── README.md          # This file
```

## 🔐 Security Considerations

- ✅ Input validation (amount must be positive)
- ✅ Authorization checks (require_auth)
- ✅ Escrow state management
- ⚠️ TODO: Multi-sig support for large amounts
- ⚠️ TODO: Formal security audit before mainnet

## 🚀 Deployment Checklist

- [ ] Unit tests passing
- [ ] Contract builds without warnings
- [ ] Testnet deployment successful
- [ ] Backend integration tested
- [ ] Fee structure verified
- [ ] Security audit completed
- [ ] Mainnet testnet successful
- [ ] Public announcement ready

## 🤝 Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

## 📄 License

Open Source - See LICENSE file
