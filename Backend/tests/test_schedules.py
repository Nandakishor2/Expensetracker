import pytest
import uuid

# ====================================================
# HELPER FUNCTIONS
# ====================================================

async def createSchedule(client) -> str:
    payload = {
        "name": f"Utility Bill Payment {uuid.uuid4().hex[:4]}",
        "description": "Monthly water and electricity bill",
        "dueDate": "2026-08-05",
        "loanID": "loan-uuid-123",
        "billID": "bill-uuid-123",
        "incomeID": "income-uuid-123",
        "transactionType": "debit",
        "amount": 250.0,
        "sessionStatus": "pending"
    }
    response = await client.post("/Schedules/", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "created successfully" in data.get("message", "")
    schedule_id = data.get("scheduleID")
    assert schedule_id is not None
    return schedule_id

async def getSchedule(client, scheduleID: str, expect_fail: bool = False) -> dict:
    response = await client.get(f"/Schedules/{scheduleID}")
    if expect_fail:
        assert response.status_code == 500
        data = response.json()
        assert "Failed to get schedule" in data.get("message", "")
        return None
    assert response.status_code == 200
    data = response.json()
    assert "fetched successfully" in data.get("message", "")
    schedule = data.get("schedule")
    assert schedule is not None
    assert schedule.get("scheduleID") == scheduleID
    return schedule

async def updateSchedule(client, scheduleID: str) -> dict:
    payload = {
        "name": "Utility Bill Payment Updated",
        "sessionStatus": "completed"
    }
    response = await client.put(f"/Schedules/{scheduleID}", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "updated successfully" in data.get("message", "")
    schedule = data.get("schedule")
    assert schedule is not None
    assert schedule.get("name") == "Utility Bill Payment Updated"
    assert schedule.get("sessionStatus") == "completed"
    return schedule

async def deleteSchedule(client, scheduleID: str) -> None:
    response = await client.delete(f"/Schedules/{scheduleID}")
    assert response.status_code == 200
    data = response.json()
    assert "deleted successfully" in data.get("message", "")

# ====================================================
# TEST CASES
# ====================================================

@pytest.mark.asyncio
async def test_create_schedule(client):
    await createSchedule(client)

@pytest.mark.asyncio
async def test_get_schedule(client):
    schedule_id = await createSchedule(client)
    schedule = await getSchedule(client, schedule_id)
    assert "Utility Bill Payment" in schedule.get("name")
    assert schedule.get("amount") == 250.0
    assert schedule.get("transactionType") == "debit"
    assert schedule.get("sessionStatus") == "pending"

@pytest.mark.asyncio
async def test_update_schedule(client):
    schedule_id = await createSchedule(client)
    await updateSchedule(client, schedule_id)
    schedule = await getSchedule(client, schedule_id)
    assert schedule.get("name") == "Utility Bill Payment Updated"
    assert schedule.get("sessionStatus") == "completed"

@pytest.mark.asyncio
async def test_delete_schedule(client):
    schedule_id = await createSchedule(client)
    await deleteSchedule(client, schedule_id)
    await getSchedule(client, schedule_id, expect_fail=True)
