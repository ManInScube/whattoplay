
export const Button = ({eventHandler}) => {
    
    return(
        <button type='onSubmit' onClick={() => eventHandler} className='rounded-lg w-1/5 m-auto mb-10 border border-gray-300 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 focus:ring focus:ring-gray-100 disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400'>Generate List</button>
    )
}