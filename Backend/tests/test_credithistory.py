import pytest
import uuid

# ====================================================
# HELPER FUNCTIONS
# ====================================================

async def createCreditHistory(client) -> str:
    payload = {
        "peopleID": f"PEOPLE-{uuid.uuid4().hex[:8]}",
        "purpose": f"Medical Help {uuid.uuid4().hex[:4]}",
        "amount": 5000.0,
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
        "amount": 6000.0,
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
    assert details.get("amount") == 6000.0
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
    assert details.get("amount") == 5000.0
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

@pytest.mark.asyncio
async def test_credithistory_datetime_normalization(client):
    # 1. Test UTC input string (Z)
    payload_utc = {
        "peopleID": "PEOPLE-datetime-utc",
        "purpose": "UTC Datetime Test",
        "amount": 100.0,
        "creditPaymentMode": "UPI",
        "recievedDate": "2026-08-21T12:00:00.000Z",
        "dueDate": "2026-08-21T18:00:00.000Z",
        "dueCleared": False
    }
    response = await client.post("/creditHistory/", json=payload_utc)
    assert response.status_code == 200
    credit_id_utc = response.json().get("creditHistoryID")
    
    details = await getCreditHistory(client, credit_id_utc)
    assert "2026-08-21T12:00:00" in details.get("recievedDate")
    assert "2026-08-21T18:00:00" in details.get("dueDate")

    # 2. Test Timezone-aware non-UTC input (e.g. +05:30)
    payload_offset = {
        "peopleID": "PEOPLE-datetime-ist",
        "purpose": "IST Datetime Test",
        "amount": 200.0,
        "creditPaymentMode": "UPI",
        "recievedDate": "2026-08-21T17:30:00.000+05:30",
        "dueDate": "2026-08-21T23:30:00.000+05:30",
        "dueCleared": False
    }
    response = await client.post("/creditHistory/", json=payload_offset)
    assert response.status_code == 200
    credit_id_ist = response.json().get("creditHistoryID")
    
    details_ist = await getCreditHistory(client, credit_id_ist)
    assert "2026-08-21T12:00:00" in details_ist.get("recievedDate")
    assert "2026-08-21T18:00:00" in details_ist.get("dueDate")

    # 3. Test Naive input string
    payload_naive = {
        "peopleID": "PEOPLE-datetime-naive",
        "purpose": "Naive Datetime Test",
        "amount": 300.0,
        "creditPaymentMode": "UPI",
        "recievedDate": "2026-08-21T12:00:00.000",
        "dueDate": "2026-08-21T18:00:00.000",
        "dueCleared": False
    }
    response = await client.post("/creditHistory/", json=payload_naive)
    assert response.status_code == 200
    credit_id_naive = response.json().get("creditHistoryID")
    
    details_naive = await getCreditHistory(client, credit_id_naive)
    assert "2026-08-21T12:00:00" in details_naive.get("recievedDate")
    assert "2026-08-21T18:00:00" in details_naive.get("dueDate")

    # 4. Test Optional None datetime input
    payload_none = {
        "peopleID": "PEOPLE-datetime-none",
        "purpose": "None Datetime Test",
        "amount": 400.0,
        "creditPaymentMode": "UPI",
        "recievedDate": "2026-08-21T12:00:00.000Z",
        "dueDate": "2026-08-21T18:00:00.000Z",
        "dueCleared": False,
        "dueClearedDate": None
    }
    response = await client.post("/creditHistory/", json=payload_none)
    assert response.status_code == 200
    credit_id_none = response.json().get("creditHistoryID")
    
    details_none = await getCreditHistory(client, credit_id_none)
    assert details_none.get("dueClearedDate") is None
