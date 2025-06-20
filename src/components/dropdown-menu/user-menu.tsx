import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

type PrivilegeDropdownProps = {
  selected: number | undefined;
  onSelectPrivilege: (privilege: number) => void;
};

export default function UserMenu({
  selected,
  onSelectPrivilege,
}: PrivilegeDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{selected}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => onSelectPrivilege(0)}>
          0
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => onSelectPrivilege(1)}>
          1
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => onSelectPrivilege(2)}>
          2
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
