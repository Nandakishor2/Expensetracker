import pytest
import uuid

# ====================================================
# HELPER FUNCTIONS
# ====================================================

async def createCreditHistory(client) -> str:
    payload = {
        "peopleID": f"PEOPLE-{uuid.uuid4().hex[:8]}",
        "purpose": f"Medical Help {uuid.uuid4().hex[:4]}",
        "creditPaymentMode": "UPI",
        "recievedDate": "2026-07-30T12:00:00Z",
        "dueDate": "2026-08-30T12:00:00Z",
        "dueCleared": False
    }
    response = await client.post("/creditHistory/", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data.get("statusCode") == 200
    assert "Created Successfully" in data.get("message", "")
    credit_history_id = data.get("creditHistoryID")
    assert credit_history_id is not None
    return credit_history_id

async def getCreditHistory(client, creditHistoryID: str, expect_fail: bool = False) -> dict:
    response = await client.get(f"/creditHistory/{creditHistoryID}")
    if expect_fail:
        assert response.status_code == 500
        data = response.json()
        assert "Credit History not found" in data.get("message", "")
        return None
    assert response.status_code == 200
    data = response.json()
    assert data.get("statusCode") == 200
    assert "Fetched Successfully" in data.get("message", "")
    details = data.get("creditHistoryDetails")
    assert details is not None
    assert details.get("creditHistoryID") == creditHistoryID
    return details

async def updateCreditHistory(client, creditHistoryID: str) -> dict:
    payload = {
        "purpose": "Updated medical help purpose",
        "dueCleared": True,
        "dueClearedDate": "2026-08-01T10:00:00Z",
        "repaymentMode": "Bank Transfer"
    }
    response = await client.put(f"/creditHistory/{creditHistoryID}", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data.get("statusCode") == 200
    assert "Fetched Successfully" in data.get("message", "")
    details = data.get("creditHistoryDetails")
    assert details is not None
    assert details.get("purpose") == "Updated medical help purpose"
    assert details.get("dueCleared") is True
    assert details.get("repaymentMode") == "Bank Transfer"
    return details

async def deleteCreditHistory(client, creditHistoryID: str) -> None:
    response = await client.delete(f"/creditHistory/{creditHistoryID}")
    assert response.status_code == 200
    data = response.json()
    assert data.get("statusCode") == 200
    assert "Deleted Successfully" in data.get("message", "")

# ====================================================
# TEST CASES
# ====================================================

@pytest.mark.asyncio
async def test_create_credithistory(client):
    await createCreditHistory(client)

@pytest.mark.asyncio
async def test_get_credithistory(client):
    credit_history_id = await createCreditHistory(client)
    details = await getCreditHistory(client, credit_history_id)
    assert "Medical Help" in details.get("purpose")
    assert details.get("creditPaymentMode") == "UPI"
    assert details.get("dueCleared") is False

@pytest.mark.asyncio
async def test_update_credithistory(client):
    credit_history_id = await createCreditHistory(client)
    await updateCreditHistory(client, credit_history_id)
    details = await getCreditHistory(client, credit_history_id)
    assert details.get("purpose") == "Updated medical help purpose"
    assert details.get("dueCleared") is True
    assert details.get("repaymentMode") == "Bank Transfer"

@pytest.mark.asyncio
async def test_delete_credithistory(client):
    credit_history_id = await createCreditHistory(client)
    await deleteCreditHistory(client, credit_history_id)
    await getCreditHistory(client, credit_history_id, expect_fail=True)
