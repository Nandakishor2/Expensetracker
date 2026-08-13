import pytest
import uuid

# ====================================================
# HELPER FUNCTIONS
# ====================================================

async def createLoan(client) -> str:
    loan_id = f"LOAN-{uuid.uuid4().hex[:8]}"
    payload = {
        "loanID": loan_id,
        "accountID": f"ACC-{uuid.uuid4().hex[:8]}",
        "companyName": f"Bank of America {uuid.uuid4().hex[:4]}",
        "purpose": "Study Loan",
        "loanAmount": 30000.0,
        "startDate": "2026-07-30T12:00:00Z",
        "emiDate": 15,
        "rateOfIntrest": 7.5,
        "emiAmount": 650.0,
        "activeStatus": True
    }
    response = await client.post("/loans/", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data.get("statusCode") == 200
    assert "created successfully" in data.get("message", "").lower()
    returned_loan_id = data.get("loanID")
    assert returned_loan_id == loan_id
    return loan_id

async def getLoan(client, loanID: str, expect_fail: bool = False) -> dict:
    response = await client.get(f"/loans/{loanID}")
    if expect_fail:
        assert response.status_code == 404
        data = response.json()
        assert "Loan Not Found" in data.get("message", "")
        return None
    assert response.status_code == 200
    data = response.json()
    assert data.get("statusCode") == 200
    assert "fetched successfully" in data.get("message", "").lower()
    loan = data.get("loanDetails")
    assert loan is not None
    assert loan.get("loanID") == loanID
    return loan

async def updateLoan(client, loanID: str) -> dict:
    payload = {
        "companyName": "Bank of America Updated",
        "loanAmount": 35000.0
    }
    response = await client.put(f"/loans/{loanID}", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data.get("statusCode") == 200
    assert "updated successfully" in data.get("message", "").lower()
    loan = data.get("loanDetails")
    assert loan is not None
    assert loan.get("companyName") == "Bank of America Updated"
    assert loan.get("loanAmount") == 35000.0
    return loan

async def deleteLoan(client, loanID: str) -> None:
    response = await client.delete(f"/loans/{loanID}")
    assert response.status_code == 200
    data = response.json()
    assert data.get("statusCode") == 200
    assert "deleted successfully" in data.get("message", "").lower()

# ====================================================
# TEST CASES
# ====================================================

@pytest.mark.asyncio
async def test_create_loan(client):
    await createLoan(client)

@pytest.mark.asyncio
async def test_get_loan(client):
    loan_id = await createLoan(client)
    loan = await getLoan(client, loan_id)
    assert "Bank of America" in loan.get("companyName")
    assert loan.get("purpose") == "Study Loan"
    assert loan.get("loanAmount") == 30000.0

@pytest.mark.asyncio
async def test_update_loan(client):
    loan_id = await createLoan(client)
    await updateLoan(client, loan_id)
    loan = await getLoan(client, loan_id)
    assert loan.get("companyName") == "Bank of America Updated"
    assert loan.get("loanAmount") == 35000.0

@pytest.mark.asyncio
async def test_delete_loan(client):
    loan_id = await createLoan(client)
    await deleteLoan(client, loan_id)
    await getLoan(client, loan_id, expect_fail=True)
