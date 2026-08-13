import pytest
import uuid

# ====================================================
# HELPER FUNCTIONS
# ====================================================

async def createTransaction(client) -> str:
    payload = {
        "category": "food",
        "description": f"Dinner at restaurant {uuid.uuid4().hex[:4]}",
        "transactionType": "debit",
        "amount": 45.50
    }
    response = await client.post("/Transactions/", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "created successfully" in data.get("message", "")
    transaction_id = data.get("transactionID")
    assert transaction_id is not None
    return transaction_id

async def getTransaction(client, transactionID: str, expect_fail: bool = False) -> dict:
    response = await client.get(f"/Transactions/{transactionID}")
    if expect_fail:
        assert response.status_code == 500
        data = response.json()
        assert "Failed to get transaction" in data.get("message", "")
        return None
    assert response.status_code == 200
    data = response.json()
    assert "fetched successfully" in data.get("message", "")
    transaction = data.get("transaction")
    assert transaction is not None
    assert transaction.get("transactionID") == transactionID
    return transaction

async def updateTransaction(client, transactionID: str) -> dict:
    payload = {
        "description": "Dinner at restaurant Updated",
        "amount": 50.0
    }
    response = await client.put(f"/Transactions/{transactionID}", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "updated successfully" in data.get("message", "")
    transaction = data.get("transaction")
    assert transaction is not None
    assert transaction.get("description") == "Dinner at restaurant Updated"
    assert transaction.get("amount") == 50.0
    return transaction

async def deleteTransaction(client, transactionID: str) -> None:
    response = await client.delete(f"/Transactions/{transactionID}")
    assert response.status_code == 200
    data = response.json()
    assert "deleted successfully" in data.get("message", "")

# ====================================================
# TEST CASES
# ====================================================

@pytest.mark.asyncio
async def test_create_Transaction(client):
    await createTransaction(client)

@pytest.mark.asyncio
async def test_get_Transaction(client):
    transaction_id = await createTransaction(client)
    transaction = await getTransaction(client, transaction_id)
    assert "Dinner at restaurant" in transaction.get("description")
    assert transaction.get("amount") == 45.50
    assert transaction.get("transactionType") == "debit"
    assert transaction.get("category") == "food"

@pytest.mark.asyncio
async def test_update_Transaction(client):
    transaction_id = await createTransaction(client)
    await updateTransaction(client, transaction_id)
    transaction = await getTransaction(client, transaction_id)
    assert transaction.get("description") == "Dinner at restaurant Updated"
    assert transaction.get("amount") == 50.0

@pytest.mark.asyncio
async def test_delete_Transaction(client):
    transaction_id = await createTransaction(client)
    await deleteTransaction(client, transaction_id)
    await getTransaction(client, transaction_id, expect_fail=True)
