from pydantic import BaseModel,Field
from typing import Optional
class Account(BaseModel):
    '''
    Class : Accounts
    Description : Model for storing account details
    Attributes :-
        accountID : Account Identifier
        ifscCode : IFSC Code
        accountType : Savings/Current
        bankName : Name of the Bank where the account is
        closingbalance : Actual balance when this record was created
    '''
    accountID : str = Field(
        ...,
        description="Account Identifier",
        min_length=1
    )
    ifscCode : str = Field(
        ...,
        description="IFSC Code",
        min_length=1
    )
    accountType : str = Field(
        ...,
        description="Account Type",
        min_length=1
    )
    bankName : str = Field(
        ...,
        description="Name of the Bank where the account is",
        min_length=1
    )
    closingBalance : float = Field(
        ...,
        description="Actual balance when this record was created",
        ge=0
    )

class UpdateAccount(BaseModel):
    ifscCode : Optional[str] = Field(
        None,
        description="IFSC Code"
    )
    accountType : Optional[str] = Field(
        None,
        description="Account Type"
    )
    bankName : Optional[str] = Field(
        None,
        description="Name of the Bank where the account is"
    )
    closingBalance : Optional[float] = Field(
        None,
        description="Actual balance when this record was created"
    )

class AccountFilter(BaseModel):
    accountType: Optional[str] = None
    bankName: Optional[str] = None
    minClosingBalance: Optional[float] = None
    maxClosingBalance: Optional[float] = None
    