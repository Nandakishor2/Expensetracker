
import Text from "../UI/Text";
type FailureType = {
    failureMessage: string
    onClose: () => void
}

function Failure({ failureMessage, onClose }: FailureType) {
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl w-98 p-8 text-center transform transition-all scale-100">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                        <svg
                             className="w-10 h-10 text-red-600"
                             fill="none"
                             stroke="currentColor"
                             viewBox="0 0 24 24"
                        >
                            <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M6 6l12 12M6 18L18 6"
                            />
                        </svg>
                    </div>
                    <p><Text color="danger" size="heading" > Failed</Text></p>
                    <p><Text color="primary" size="body"> {failureMessage}</Text></p>
                    <button
                        onClick={onClose}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
                    >
                        OK
                    </button>

                </div>
            </div>
        </>
    )
}

export default Failure