import { faSort } from "@fortawesome/free-solid-svg-icons/faSort"
import { faCloud } from "@fortawesome/free-solid-svg-icons/faCloud"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown"
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons/faSignOutAlt"
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash"
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt"
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner"
import { faEdit, faPenAlt } from "@fortawesome/free-solid-svg-icons"
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen"
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye"

export const loadIcons = () => {
  library.add(
    faSort,
    faCloud,
    faSignOutAlt,
    faCaretDown,
    faTrash,
    faTrashAlt,
    faSpinner,
    faEdit,
    faPen,
    faPenAlt,
    faEye
  )
}
