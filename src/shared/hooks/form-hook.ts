import { useCallback, useReducer } from "react";

type FormState = {
  inputs: Record<string, { value: string; isValid: boolean }>;
  isValid: boolean;
};

type FormAction =
  | {
      type: "INPUT_CHANGE";
      value: string;
      isValid: boolean;
      inputId: string;
    }
  | { type: "RESET" }
  | {
      type: "SET_DATA";
      inputs: Record<string, { value: string; isValid: boolean }>;
      formIsValid: boolean;
    };

type InputRecord = Record<string, { value: string; isValid: boolean }>;

function formReducer(state: FormState, action: FormAction) {
  switch (action.type) {
    case "INPUT_CHANGE": {
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    }
    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
}

export function useForm(
  initialInputs: InputRecord,
  initialFormValidity: boolean
) {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  const inputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {
      dispatch({ type: "INPUT_CHANGE", value, isValid, inputId: id });
    },
    [] // dependencies that the function uses (state, props, etc.)
  );

  const setFormData = useCallback(
    (
      inputs: Record<string, { value: string; isValid: boolean }>,
      formValidity: boolean
    ) => {
      dispatch({
        type: "SET_DATA",
        inputs,
        formIsValid: formValidity,
      });
    },
    []
  );

  return [formState, inputHandler, setFormData] as const;
}
