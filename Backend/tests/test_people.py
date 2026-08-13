import pytest
import uuid

# ====================================================
# HELPER FUNCTIONS
# ====================================================

async def createPeople(client) -> str:
    unique_email = f"test-{uuid.uuid4().hex[:8]}@example.com"
    payload = {
        "name": f"Jane Doe {uuid.uuid4().hex[:4]}",
        "contactNumber": "9876543210",
        "whatsappNumber": "9876543210",
        "email": unique_email
    }
    response = await client.post("/people/", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data.get("statusCode") == 200
    assert "Success" in data.get("message", "")
    person_id = data.get("personID")
    assert person_id is not None
    return person_id

async def getPeople(client, personID: str, expect_fail: bool = False) -> dict:
    response = await client.get("/people/")
    assert response.status_code == 200
    data = response.json()
    people_list = data.get("peopleList", [])
    matched_person = next((p for p in people_list if p.get("personID") == personID), None)
    if expect_fail:
        assert matched_person is None
        return None
    assert matched_person is not None
    assert matched_person.get("personID") == personID
    return matched_person

async def updatePeople(client, personID: str) -> dict:
    payload = {
        "name": "Jane Doe Updated",
        "contactNumber": "8888888888"
    }
    response = await client.put(f"/people/{personID}", json=payload)
    print(response.json())
    assert response.status_code == 200
    data = response.json()
    # assert data.get("statusCode") == 200
    assert "Success" in data.get("message", "")
    person = data.get("personDetails")
    assert person is not None
    assert person.get("name") == "Jane Doe Updated"
    assert person.get("contactNumber") == "8888888888"
    return person

async def deletePeople(client, personID: str) -> None:
    response = await client.delete(f"/people/{personID}")
    assert response.status_code == 200
    data = response.json()
    assert data.get("statusCode") == 200
    assert "Success" in data.get("message", "")

# ====================================================
# TEST CASES
# ====================================================

@pytest.mark.asyncio
async def test_create_people(client):
    await createPeople(client)

@pytest.mark.asyncio
async def test_get_people(client):
    person_id = await createPeople(client)
    person = await getPeople(client, person_id)
    assert "Jane Doe" in person.get("name")
    assert person.get("contactNumber") == "9876543210"

@pytest.mark.asyncio
async def test_update_people(client):
    person_id = await createPeople(client)
    await updatePeople(client, person_id)
    person = await getPeople(client, person_id)
    assert person.get("name") == "Jane Doe Updated"
    assert person.get("contactNumber") == "8888888888"

@pytest.mark.asyncio
async def test_delete_people(client):
    person_id = await createPeople(client)
    await deletePeople(client, person_id)
    await getPeople(client, person_id, expect_fail=True)
