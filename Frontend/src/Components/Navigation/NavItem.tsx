import type { IconType } from "react-icons"

type NavItemProps = {
  name: string;
  onClick: () => void;
  Icon: IconType
}

function NavItem({ name, onClick, Icon }: NavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 text-green-400 hover:bg-green-900 rounded-2xl"
    >
      <Icon className="text-xl" />

      <span>{name}</span>
    </button>
  )
}

export default NavItem