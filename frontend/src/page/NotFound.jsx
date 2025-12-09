const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center bg-slate-50">
            <img src=""/>
            <p className="text-xl font-semibold">
                404 not found
            </p>

            <a href="/" className="inline-block px-6 py3 mt-6 font-medium text-white transition shadow-md bg-primary hover:bg-primary rounded-2xl hover:bg-primary-dark">
                Go Home
            </a>
        </div>
    )
}
export default NotFound