import { useEffect, useReducer } from "react";

import { validate, type Validator } from "../util/validators";
import "./Input.css";

interface InputProps {
  element?: "input" | "textarea";
  id: string;
  type: string;
  placeholder: string;
  rows?: number;
  label: string;
  errorText: string;
  validators: Validator[];
  onInput: (id: string, value: string, isValid: boolean) => void;
}

type InputState = { value: string; isValid: boolean; isTouched: boolean };

type InputAction =
  | { type: "CHANGE"; val: string; validators: Validator[] }
  | { type: "TOUCH" }
  | { type: "RESET" };

function inputReducer(state: InputState, action: InputAction) {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH": {
      return { ...state, isTouched: true };
    }
    default:
      return state;
  }
}

export default function Input(props: InputProps) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isTouched: false,
    isValid: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  function changeHandler(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  }

  function touchHandler() {
    dispatch({
      type: "TOUCH",
    });
  }

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
}
