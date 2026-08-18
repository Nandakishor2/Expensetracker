import Failure from '../Components/Message/Failure'
import Success from '../Components/Message/Success'
import { useAPIResponse } from '../Context/APIResponse'


function Status() {
    const { executionStatus, message, clearStatus } = useAPIResponse()
    return (
        <>
            {
                executionStatus != null && (
                    executionStatus === true ? (
                        <Success successMessage={message || ""} onClose={clearStatus} />
                    ) : (
                        <Failure failureMessage={message || ""} onClose={clearStatus} />
                    )
                )
            }
        </>
    )
}

export default Status