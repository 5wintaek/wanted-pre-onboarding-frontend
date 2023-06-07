import { useState } from "react";

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  const onchange = (e) => {
    const {
      target: { value },
    } = e;
    setValue(value);
  };

  return { value, onchange };
}
