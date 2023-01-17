import { NavArrow } from '../UI/NavArrow/NavArrow'


export const PagesNav = ({handler, offset, pages}) => {
    
    return(
    <div class="flex justify-center">
        <nav aria-label="Pagination">
          <ul class="inline-flex items-center space-x-1 rounded-md text-sm">
            <li>
                <NavArrow navHandler={handler} dir="prev"/>
            </li>
            <li>
              <span class="inline-flex items-center rounded-md bg-white px-4 py-2 text-gray-500">Page <b class="mx-1">{offset / 100}</b> of <b class="ml-1">{pages}</b></span>
            </li>
            <li>
                <NavArrow navHandler={handler} dir="next"/>
            </li>
          </ul>
        </nav>
      </div>
    )
}