use soroban_sdk::{contract, contractimpl, Address, Env, Symbol, Vec};

#[contract]
pub struct CreatorHub;

// Errors
#[derive(Debug, Copy, Clone, PartialEq, Eq, PartialOrd, Ord)]
#[repr(u32)]
pub enum ContractError {
    NotAuthorized = 1,
    TaskNotFound = 2,
    InsufficientBalance = 3,
    AlreadyCompleted = 4,
    InvalidAmount = 5,
}

impl ContractError {
    pub fn into_result(self) -> Result<(), ContractError> {
        Err(self)
    }
}

#[contractimpl]
impl CreatorHub {
    /// Initialize contract (called once on deployment)
    ///
    /// # Arguments
    /// * `env` - Soroban environment
    /// * `admin` - Admin address
    ///
    /// # Example
    /// ```
    /// initialize(env, admin_address)
    /// ```
    pub fn initialize(env: Env, admin: Address) {
        admin.require_auth();

        env.storage()
            .instance()
            .set(&Symbol::short("admin"), &admin);
    }

    /// Create escrow for a task (project locks funds)
    ///
    /// # Arguments
    /// * `env` - Soroban environment
    /// * `project` - Project address (fund holder)
    /// * `task_id` - Unique task identifier
    /// * `amount` - Amount in stroops (1 XLM = 10,000,000 stroops)
    /// * `token` - Token address or native asset
    ///
    /// # Returns
    /// Result indicating success or error
    ///
    /// # Example
    /// ```
    /// create_escrow(env, project_addr, "task-123", 1000000, token_addr)
    /// ```
    pub fn create_escrow(
        env: Env,
        project: Address,
        task_id: Symbol,
        amount: i128,
        token: Address,
    ) -> Result<(), ContractError> {
        // Validate amount
        if amount <= 0 {
            return ContractError::InvalidAmount.into_result();
        }

        project.require_auth();

        // Store escrow data
        let key = Symbol::short("escrow").concat(&task_id);
        env.storage().instance().set(&key, &(project, amount));

        Ok(())
    }

    /// Release payment to winner (from escrow)
    ///
    /// # Arguments
    /// * `env` - Soroban environment
    /// * `task_id` - Task identifier
    /// * `winner` - Winner's address
    /// * `amount` - Amount to release
    ///
    /// # Returns
    /// Result indicating success or error
    pub fn release_payment(
        env: Env,
        task_id: Symbol,
        winner: Address,
        amount: i128,
    ) -> Result<(), ContractError> {
        // Get escrow data
        let key = Symbol::short("escrow").concat(&task_id);
        let escrow_data: (Address, i128) = env
            .storage()
            .instance()
            .get(&key)
            .ok_or(ContractError::TaskNotFound)?;

        let (project, escrowed_amount) = escrow_data;

        // Validate amount
        if amount > escrowed_amount {
            return ContractError::InsufficientBalance.into_result();
        }

        project.require_auth();

        // Remove escrow (mark as completed)
        env.storage().instance().remove(&key);

        // TODO: Transfer funds to winner using token contract
        // This would involve calling the token contract's transfer method

        Ok(())
    }

    /// Get escrow details for a task
    ///
    /// # Arguments
    /// * `env` - Soroban environment
    /// * `task_id` - Task identifier
    ///
    /// # Returns
    /// Tuple of (project_address, escrowed_amount) or error
    pub fn get_escrow(
        env: Env,
        task_id: Symbol,
    ) -> Result<(Address, i128), ContractError> {
        let key = Symbol::short("escrow").concat(&task_id);
        env
            .storage()
            .instance()
            .get(&key)
            .ok_or(ContractError::TaskNotFound)
    }

    /// Refund project (if no winner selected)
    ///
    /// # Arguments
    /// * `env` - Soroban environment
    /// * `task_id` - Task identifier
    ///
    /// # Returns
    /// Result indicating success or error
    pub fn refund_project(
        env: Env,
        task_id: Symbol,
    ) -> Result<(), ContractError> {
        let key = Symbol::short("escrow").concat(&task_id);
        let escrow_data: (Address, i128) = env
            .storage()
            .instance()
            .get(&key)
            .ok_or(ContractError::TaskNotFound)?;

        let (project, _amount) = escrow_data;
        project.require_auth();

        // Remove escrow
        env.storage().instance().remove(&key);

        // TODO: Transfer funds back to project

        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use soroban_sdk::testutils::{Address as _, Env as _};

    #[test]
    fn test_initialize() {
        let env = Env::default();
        let admin = Address::random(&env);

        let contract = CreatorHub;
        contract.initialize(env.clone(), admin.clone());

        let stored_admin: Address = env
            .storage()
            .instance()
            .get(&Symbol::short("admin"))
            .unwrap();

        assert_eq!(admin, stored_admin);
    }

    #[test]
    fn test_create_escrow() {
        let env = Env::default();
        let project = Address::random(&env);
        let token = Address::random(&env);

        let contract = CreatorHub;

        let result = contract.create_escrow(
            env.clone(),
            project.clone(),
            Symbol::short("task-1"),
            1000000,
            token,
        );

        assert!(result.is_ok());
    }
}
