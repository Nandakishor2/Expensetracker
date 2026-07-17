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
        description="Account Identifier"
    )
    ifscCode : str = Field(
        ...,
        description="IFSC Code"
    )
    accountType : str = Field(
        ...,
        description="Account Type"
    )
    bankName : str = Field(
        ...,
        description="Name of the Bank where the account is"
    )
    closingBalance : int = Field(
        ...,
        description="Actual balance when this record was created"
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
    closingBalance : Optional[int] = Field(
        None,
        description="Actual balance when this record was created"
    )