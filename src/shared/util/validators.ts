const VALIDATOR_TYPE_REQUIRE = "REQUIRE";
const VALIDATOR_TYPE_MINLENGTH = "MINLENGTH";
const VALIDATOR_TYPE_MAXLENGTH = "MAXLENGTH";
const VALIDATOR_TYPE_MIN = "MIN";
const VALIDATOR_TYPE_MAX = "MAX";
const VALIDATOR_TYPE_EMAIL = "EMAIL";
const VALIDATOR_TYPE_FILE = "FILE";

export interface ValidatorRequire {
  type: typeof VALIDATOR_TYPE_REQUIRE;
}

export interface ValidatorFile {
  type: typeof VALIDATOR_TYPE_FILE;
}

export interface ValidatorMinLength {
  type: typeof VALIDATOR_TYPE_MINLENGTH;
  val: number;
}

export interface ValidatorMaxLength {
  type: typeof VALIDATOR_TYPE_MAXLENGTH;
  val: number;
}

export interface ValidatorMin {
  type: typeof VALIDATOR_TYPE_MIN;
  val: number;
}

export interface ValidatorMax {
  type: typeof VALIDATOR_TYPE_MAX;
  val: number;
}

export interface ValidatorEmail {
  type: typeof VALIDATOR_TYPE_EMAIL;
}

export type Validator =
  | ValidatorRequire
  | ValidatorFile
  | ValidatorMinLength
  | ValidatorMaxLength
  | ValidatorMin
  | ValidatorMax
  | ValidatorEmail;

export const VALIDATOR_REQUIRE = (): ValidatorRequire => ({
  type: VALIDATOR_TYPE_REQUIRE,
});

export const VALIDATOR_FILE = (): ValidatorFile => ({
  type: VALIDATOR_TYPE_FILE,
});

export const VALIDATOR_MINLENGTH = (val: number): ValidatorMinLength => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val,
});

export const VALIDATOR_MAXLENGTH = (val: number): ValidatorMaxLength => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val,
});

export const VALIDATOR_MIN = (val: number): ValidatorMin => ({
  type: VALIDATOR_TYPE_MIN,
  val: val,
});

export const VALIDATOR_MAX = (val: number): ValidatorMax => ({
  type: VALIDATOR_TYPE_MAX,
  val: val,
});

export const VALIDATOR_EMAIL = (): ValidatorEmail => ({
  type: VALIDATOR_TYPE_EMAIL,
});

export const validate = (value: string, validators: Validator[]): boolean => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid = isValid && value.trim().length <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
  }
  return isValid;
};
