import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useEditCabin } from "./useEditCabin";
import { useCreateCabin } from "./useCreateCabin";

// We'll use this component to CREATE new cabin and to EDIT existing cabin as well. so we need to flag to determind whether add new cabin or editing

function CreateCabinForm({ cabinToEdit = {}, closeModal }) {
  const { editCabin, isEditing } = useEditCabin();
  const { createCabin, isCreating } = useCreateCabin();

  const { id: editId, ...editValues } = cabinToEdit;
  // flag to identify for editing the cabin
  let isEditingSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    // to pre-fill the form, we can use this hook's features.
    defaultValues: isEditingSession ? editValues : {},
  });
  const { errors } = formState;
  const isWorking = isEditing || isCreating;

  const onSubmit = (formData) => {
    const image =
      typeof formData.image === "string" ? formData.image : formData.image[0];

    if (isEditingSession)
      editCabin({
        newCabinData: {
          ...formData,
          image,
        },
        id: editId,
      },{
        onSuccess: () => {
          reset()
          closeModal?.()
        }
      });
    else createCabin({ ...formData, image: image }, {
      onSuccess: () => {
        reset()
        closeModal?.()
      }
    });
  };

  const onError = (error) => {
    // console.log(error);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={closeModal ? 'modal': 'regular'}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              parseFloat(value) <= parseFloat(getValues().regularPrice) ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditingSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={() => closeModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditingSession ? "Edit cabin" : "Add new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
