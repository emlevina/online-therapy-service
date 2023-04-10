const Wrapper = ({ children }) => {
    return (
        <div className='container mx-auto flex-grow flex flex-col justify-center pt-4'>
            {children}
        </div>
    )
}

export default Wrapper;