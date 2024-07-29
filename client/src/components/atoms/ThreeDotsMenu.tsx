import * as React from "react";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export interface ActionMenuItem {
  label: string | JSX.Element;
  onClick: () => void;
}

interface ThreeDotActionProps {
  menu: ActionMenuItem[];
  iconProps?: IconButtonProps;
  icon?: JSX.Element;
}

export default function ThreeDotsMenu({
  menu,
  iconProps,
  icon,
}: ThreeDotActionProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick} {...iconProps}>
        {icon ? icon : <MoreVertIcon />}
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            minWidth: "20ch",
          },
        }}
      >
        {menu.map((item, i) => (
          <MenuItem
            key={i}
            onClick={() => {
              setAnchorEl(null);
              item.onClick();
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
