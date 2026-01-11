import { useParams } from "react-router";
import "./Place.css";

import { type Place } from "../components/type";
import Input from "../../shared/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import { useEffect, useState } from "react";

const DUMMY_PLACES: Place[] = [
  {
    id: "p1",
    title: "BIJAY",
    description: "YOHAHA",
    image:
      "https://i.pinimg.com/736x/96/d0/e0/96d0e0011a772fde0b37a98ba2f82a3a.jpg",
    address: "CAUSA",
    coordinates: { lat: 40.7484405, lng: -73.9878584 },
    creatorId: "u1",
  },
  {
    id: "p2",
    title: "BIJAY S",
    description: "YOHAHA",
    image:
      "https://i.pinimg.com/736x/96/d0/e0/96d0e0011a772fde0b37a98ba2f82a3a.jpg",
    address: "CAUSA",
    coordinates: { lat: 40.7484405, lng: -73.9878584 },
    creatorId: "u2",
  },
];

export default function UpdatePlace() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
    },
    false
  );

  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  // useEffect(() => {
  //   setFormData(
  //     {
  //       title: { value: identifiedPlace?.title ?? "", isValid: true },
  //       description: {
  //         value: identifiedPlace?.description ?? "",
  //         isValid: true,
  //       },
  //     },
  //     true
  //   );
  //   setIsLoading(false);
  // }, [setFormData, identifiedPlace]);

  useEffect(() => {
    if (!identifiedPlace) return;

    queueMicrotask(() => {
      setFormData(
        {
          title: { value: identifiedPlace.title, isValid: true },
          description: { value: identifiedPlace.description, isValid: true },
        },
        true
      );
      setIsLoading(false);
    });
  }, [setFormData, identifiedPlace]);

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find place</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  function placeUpdateSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(formState.inputs);
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        placeholder="Enter Title"
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        type="text"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description. (Atleast 5 Characters)"
        placeholder="Enter Description"
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
}
