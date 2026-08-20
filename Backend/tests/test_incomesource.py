import pytest
import uuid

# ====================================================
# HELPER FUNCTIONS
# ====================================================

async def createIncomeSource(client) -> str:
    payload = {
        "sourceName": f"Salary {uuid.uuid4().hex[:4]}",
        "creditedDate": 25,
        "amount": 7500.0,
        "accountID": f"ACC-{uuid.uuid4().hex[:8]}",
        "incomeSourceStatus": True
    }
    response = await client.post("/IncomeSource/", json=payload)
    assert response.status_code == 200
    data = response.json()
    #assert data.get("statusCode") == 200
    assert "created successfully" in data.get("message", "")
    income_id = data.get("incomeID")
    assert income_id is not None
    return income_id

async def getIncomeSource(client, incomeSourceID: str, expect_fail: bool = False) -> dict:
    response = await client.get(f"/IncomeSource/{incomeSourceID}")
    if expect_fail:
        assert response.status_code == 500
        data = response.json()
        assert "Failed to get income source" in data.get("message", "")
        return None
    assert response.status_code == 200
    data = response.json()
    #assert data.get("statusCode") == 200
    assert "fetched successfully" in data.get("message", "")
    income_source = data.get("incomeSource")
    assert income_source is not None
    assert income_source.get("incomeID") == incomeSourceID
    return income_source

async def updateIncomeSource(client, incomeSourceID: str) -> dict:
    payload = {
        "sourceName": "Salary (Bonus Included)",
        "amount": 9000.0
    }
    response = await client.put(f"/IncomeSource/{incomeSourceID}", json=payload)
    assert response.status_code == 200
    data = response.json()
    #assert data.get("statusCode") == 200
    assert "updated successfully" in data.get("message", "")
    income_source = data.get("incomeSource")
    assert income_source is not None
    assert income_source.get("sourceName") == "Salary (Bonus Included)"
    assert income_source.get("amount") == 9000.0
    return income_source

async def deleteIncomeSource(client, incomeSourceID: str) -> None:
    response = await client.delete(f"/IncomeSource/{incomeSourceID}")
    assert response.status_code == 200
    data = response.json()
    #assert data.get("statusCode") == 200
    assert "deleted successfully" in data.get("message", "")

# ====================================================
# TEST CASES
# ====================================================

@pytest.mark.asyncio
async def test_create_incomesource(client):
    await createIncomeSource(client)

@pytest.mark.asyncio
async def test_get_incomesource(client):
    income_id = await createIncomeSource(client)
    income = await getIncomeSource(client, income_id)
    assert "Salary" in income.get("sourceName")
    assert income.get("amount") == 7500.0
    assert income.get("incomeSourceStatus") is True

@pytest.mark.asyncio
async def test_update_incomesource(client):
    income_id = await createIncomeSource(client)
    await updateIncomeSource(client, income_id)
    income = await getIncomeSource(client, income_id)
    assert income.get("sourceName") == "Salary (Bonus Included)"
    assert income.get("amount") == 9000.0

@pytest.mark.asyncio
async def test_delete_incomesource(client):
    income_id = await createIncomeSource(client)
    await deleteIncomeSource(client, income_id)
    await getIncomeSource(client, income_id, expect_fail=True)
