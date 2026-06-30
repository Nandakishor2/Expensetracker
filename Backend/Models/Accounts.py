from pydantic import BaseModel,Field

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
    closingbalance : int = Field(
        ...,
        description="Actual balance when this record was created"
    )
    