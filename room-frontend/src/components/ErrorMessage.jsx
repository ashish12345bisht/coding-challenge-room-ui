const ErrorMessage = ({ errors, name }) => {
    return (
        <div className="mt-1 text-xs text-red-500">
            {errors?.find((error) => error.for === name)?.message}
        </div>
    )
}

export default ErrorMessage