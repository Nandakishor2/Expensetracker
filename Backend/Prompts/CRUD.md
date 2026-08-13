You are a Senior Python Backend Engineer.

You are contributing to an existing production FastAPI backend.

IMPORTANT

Do NOT redesign the project.

Do NOT change the architecture.

Do NOT introduce new coding patterns.

Your responsibility is to generate ONE new module that follows the project's existing architecture exactly.

==================================================
REFERENCE IMPLEMENTATION
==================================================

Study the attached IncomeSource module.

It is the reference implementation for this project.

Analyze

• Folder Structure

• Naming Convention

• Database Layer

• Service Layer

• Route Layer

• Response Models

• Exception Handling

• Logging

• UUID Generation

• Audit Fields

• Async PyMongo

• Pydantic Models

• Response Formatting

• JSONResponse Usage

• Import Ordering

Generate code that looks like it was written by the same developer.

==================================================
PROJECT STACK
==================================================

Python 3.13

FastAPI

Pydantic V2

MongoDB

PyMongo Async

Repository Pattern

Service Layer

Router Layer

UUID Based IDs

Audit Fields

==================================================
MODULE TO BUILD
==================================================

Transactions

==================================================
MODELS PROVIDED
==================================================

Models/Transactions.py

Schema/Transactions.py

Use these models exactly.

Do NOT modify the models.

Do NOT add new fields.

Do NOT remove fields.

Unless there is a compile-time error.

==================================================
GENERATE
==================================================

Generate ONLY these files.

Database/Transactions.py

Services/Transactions.py

Responses/Transactions.py

Routes/Transactions.py

==================================================
DATABASE LAYER
==================================================

Implement

addNewTransaction()

getTransaction()

getTransactionList()

updateTransaction()

deleteTransaction()

Use the same coding style as IncomeSource.

Use

DatabaseReadException

DatabaseWriteException

DatabaseUpdateException

DatabaseDeleteException

Use logging.

Use Async PyMongo.

Use ReturnDocument.AFTER.

Return values identical to the reference implementation.

==================================================
SERVICE LAYER
==================================================

Implement

handleCreateTransaction()

handleGetTransaction()

handleGetTransactionList()

handleUpdateTransaction()

handleDeleteTransaction()

Generate UUID using

generateUUID()

Populate AuditFields.

Return proper Response objects.

==================================================
RESPONSES
==================================================

Generate

CreateTransactionResponse

GetTransactionResponse

UpdateTransactionResponse

DeleteTransactionResponse

Use the project's existing BaseResponse.

==================================================
ROUTES
==================================================

Generate

GET /

GET /{transactionID}

POST /

PUT /{transactionID}

DELETE /{transactionID}

Return JSONResponse.

Follow the project's routing style exactly.

==================================================
CODING RULES
==================================================

Follow existing import ordering.

Reuse project utilities.

Do not duplicate code.

Use model_dump(exclude_unset=True)

Use Async PyMongo.

Use to_list(length=None)

Use ReturnDocument.AFTER

Keep response messages consistent.

Follow existing naming conventions.

==================================================
DO NOT
==================================================

Do not redesign architecture.

Do not introduce generic repositories.

Do not introduce dependency injection.

Do not introduce generic CRUD classes.

Do not introduce BaseRepository.

Do not introduce dataclasses.

Do not introduce SQLAlchemy.

Do not introduce Motor.

Do not rename project functions.

Do not change folder names.

==================================================
OUTPUT
==================================================

Generate files separately.

========== Database/Transactions.py ==========
(code)

========== Services/Transactions.py ==========
(code)

========== Responses/Transactions.py ==========
(code)

========== Routes/Transactions.py ==========
(code)

Ensure all imports are correct.

Ensure the module compiles without modification.

Before finishing, compare the generated code against the IncomeSource module and ensure the architecture, formatting, naming conventions, logging, exception handling, and response structure are identical wherever applicable.