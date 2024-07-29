import { IconButton, TextField, TextFieldProps } from "@mui/material";
import { useRef } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";

type InputPasswordProps = TextFieldProps;

const InputPassword = (props: InputPasswordProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const show = useRef<HTMLButtonElement>(null);
  return (
    <TextField
      id="password"
      type="password"
      autoComplete=""
      InputProps={{
        inputRef: ref,
        endAdornment: (
          <IconButton
            size="small"
            ref={show}
            onClick={(e) => {
              e.preventDefault();
              if (ref.current !== null && ref.current.type === "password") {
                ref.current.type = "text";
              } else if (ref.current !== null && ref.current.type === "text") {
                ref.current.type = "password";
              }
            }}
          >
            <VisibilityIcon />
          </IconButton>
        ),
      }}
      {...props}
    />
  );
};

export default InputPassword;
