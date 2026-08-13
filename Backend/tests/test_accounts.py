import pytest
import uuid

# ====================================================
# HELPER FUNCTIONS
# ====================================================

async def createAccount(client) -> str:
    account_id = f"ACC-{uuid.uuid4().hex[:8]}"
    payload = {
        "accountID": account_id,
        "ifscCode": "SBIN0001234",
        "accountType": "Savings",
        "bankName": "State Bank of India",
        "closingBalance": 50000
    }
    response = await client.post("/accounts/create", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "created successfully" in data.get("message", "")
    assert data.get("accountID") == account_id
    return account_id

async def getAccount(client, accountID: str, expect_fail: bool = False) -> dict:
    response = await client.get("/accounts/")
    assert response.status_code in [200, 201]
    data = response.json()
    accounts = data.get("accountDetailsList", [])
    account = next((acc for acc in accounts if acc.get("accountID") == accountID), None)
    if expect_fail:
        assert account is None
        return None
    assert account is not None
    assert account.get("accountID") == accountID
    return account

async def updateAccount(client, accountID: str) -> dict:
    payload = {
        "bankName": "State Bank of India Updated",
        "closingBalance": 55000
    }
    response = await client.patch(f"/accounts/update/{accountID}", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "updated successfully" in data.get("message", "")
    updated = data.get("updatedAccountDetails", {})
    assert updated.get("bankName") == "State Bank of India Updated"
    assert updated.get("closingBalance") == 55000
    return updated

async def deleteAccount(client, accountID: str) -> None:
    response = await client.delete(f"/accounts/delete/{accountID}")
    assert response.status_code == 200
    data = response.json()
    assert "deleted successfully" in data.get("message", "")

# ====================================================
# TEST CASES
# ====================================================

@pytest.mark.asyncio
async def test_create_account(client):
    await createAccount(client)

@pytest.mark.asyncio
async def test_get_account(client):
    account_id = await createAccount(client)
    account = await getAccount(client, account_id)
    assert account.get("bankName") == "State Bank of India"
    assert account.get("accountType") == "Savings"
    assert account.get("closingBalance") == 50000

@pytest.mark.asyncio
async def test_update_account(client):
    account_id = await createAccount(client)
    await updateAccount(client, account_id)
    account = await getAccount(client, account_id)
    assert account.get("bankName") == "State Bank of India Updated"
    assert account.get("closingBalance") == 55000

@pytest.mark.asyncio
async def test_delete_account(client):
    account_id = await createAccount(client)
    await deleteAccount(client, account_id)
    await getAccount(client, account_id, expect_fail=True)
