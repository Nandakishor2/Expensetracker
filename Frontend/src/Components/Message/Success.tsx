import Text from "../UI/Text"

type SuccessType = {
    successMessage: string
    onClose: () => void
}

function Success({ successMessage, onClose }: SuccessType) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl w-96 p-8 text-center transform transition-all scale-100">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>

                </div>
                <p>
                    <Text color="secondary" size="heading">
                        Success!
                    </Text></p>
                <p>
                    <Text color="primary" size="body">
                        {successMessage}
                    </Text>
                </p>
                <button
                    onClick={onClose}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
                >
                    OK
                </button>
            </div>
        </div>
    )
}

export default Success