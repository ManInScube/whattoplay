export const PagesNav = ({handler, offset, pages}) => {
    
    return(
    <div class="flex justify-center">
        <nav aria-label="Pagination">
          <ul class="inline-flex items-center space-x-1 rounded-md text-sm">
            <li>
              <a onClick={() => (handler("prev"))} class="inline-flex items-center space-x-2 rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-500 hover:bg-gray-50">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                </svg>
                <span>Previous</span>
              </a>
            </li>
            <li>
              <span class="inline-flex items-center rounded-md bg-white px-4 py-2 text-gray-500">Page <b class="mx-1">{offset / 100}</b> of <b class="ml-1">{pages}</b></span>
            </li>
            <li>
              <a onClick={() => (handler("next"))} className="items-cente inline-flex space-x-2 rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-500 hover:bg-gray-50">
                <span>Next</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    )
}