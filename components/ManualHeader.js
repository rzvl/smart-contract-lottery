import { useEffect } from "react"
import { useMoralis } from "react-moralis"

function ManualHeader() {
    const { enableWeb3, isWeb3Enabled, deactivateWeb3, isWeb3EnableLoading, account, Moralis } =
        useMoralis()

    useEffect(() => {
        if (
            !isWeb3Enabled &&
            typeof window !== "undefined" &&
            window.localStorage.getItem("connected")
        ) {
            enableWeb3()
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null Account found")
            }
        })
    }, [])

    return (
        <div>
            {account ? (
                <div>
                    Connected to {account.slice(0, 6)}....{account.slice(account.length - 4)}
                </div>
            ) : (
                <button
                    onClick={async () => {
                        // await walletModal.connect()
                        const ret = await enableWeb3()
                        if (typeof ret !== "undefined") {
                            // depends on what button they picked
                            if (typeof window !== "undefined") {
                                window.localStorage.setItem("connected", "injected")
                                // window.localStorage.setItem("connected", "walletconnect")
                            }
                        }
                    }}
                    disabled={isWeb3EnableLoading}
                >
                    Connect
                </button>
            )}
        </div>
    )
}

export default ManualHeader
