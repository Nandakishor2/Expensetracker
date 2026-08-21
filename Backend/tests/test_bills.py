import pytest
import uuid

# ====================================================
# HELPER FUNCTIONS
# ====================================================

async def createBill(client) -> str:
    payload = {
        "organization": f"Water Corp {uuid.uuid4().hex[:4]}",
        "description": "Monthly water charges",
        "dueDate": 15
    }
    response = await client.post("/Bills/", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "created successfully" in data.get("message", "")
    bill_id = data.get("billID")
    assert bill_id is not None
    return bill_id

async def getBill(client, billID: str, expect_fail: bool = False) -> dict:
    response = await client.get(f"/Bills/{billID}")
    if expect_fail:
        assert response.status_code == 500
        data = response.json()
        assert "Failed to get bill" in data.get("message", "")
        return None
    assert response.status_code == 200
    data = response.json()
    assert "fetched successfully" in data.get("message", "")
    bill = data.get("bill")
    assert bill is not None
    assert bill.get("billID") == billID
    return bill

async def updateBill(client, billID: str) -> dict:
    payload = {
        "organization": "Water Corp Updated",
        "description": "Updated monthly water charges",
        "dueDate": 25
    }
    response = await client.put(f"/Bills/{billID}", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "updated successfully" in data.get("message", "")
    bill = data.get("bill")
    assert bill is not None
    assert bill.get("organization") == "Water Corp Updated"
    assert bill.get("description") == "Updated monthly water charges"
    assert bill.get("dueDate") == 25
    return bill

async def deleteBill(client, billID: str) -> None:
    response = await client.delete(f"/Bills/{billID}")
    assert response.status_code == 200
    data = response.json()
    assert "deleted successfully" in data.get("message", "")

# ====================================================
# TEST CASES
# ====================================================

@pytest.mark.asyncio
async def test_create_bills(client):
    await createBill(client)

@pytest.mark.asyncio
async def test_get_bills(client):
    bill_id = await createBill(client)
    bill = await getBill(client, bill_id)
    assert "Water Corp" in bill.get("organization")
    assert bill.get("description") == "Monthly water charges"
    assert bill.get("dueDate") == 15

@pytest.mark.asyncio
async def test_update_bills(client):
    bill_id = await createBill(client)
    await updateBill(client, bill_id)
    bill = await getBill(client, bill_id)
    assert bill.get("organization") == "Water Corp Updated"
    assert bill.get("description") == "Updated monthly water charges"
    assert bill.get("dueDate") == 25

@pytest.mark.asyncio
async def test_delete_bills(client):
    bill_id = await createBill(client)
    await deleteBill(client, bill_id)
    await getBill(client, bill_id, expect_fail=True)
