import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
    const { id: editId, ...editValues } = cabinToEdit;
    const isEditSession = Boolean(editId);

    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });
    const { errors } = formState;

    const { isCreating, createCabin } = useCreateCabin();
    const { isEditing, editCabin } = useEditCabin();

    const isWorking = isCreating || isEditing;

    // Called by React-Hook-Form when Form's onSubmit calls React-Hook-Form's handleSubmit.
    function onSubmit(data) {
        const image =
            typeof data.image === "object" && data.image.length > 0
                ? data.image[0]
                : cabinToEdit.image;

        if (isEditSession) {
            editCabin(
                { newCabinData: { ...data, image }, id: editId },
                {
                    onSuccess: (data) => {
                        reset();
                        onCloseModal?.();
                    },
                }
            );
        } else {
            createCabin(
                { ...data, image },
                {
                    onSuccess: (data) => reset(),
                }
            );
        }
    }

    // Called by React-Hook-Form when Form's onSubmit calls React-Hook-Form's handleSubmit if an error is returned.
    function onError(errors) {
        //console.log(errors);
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmit, onError)}
            type={onCloseModal ? "modal" : "regular"}
        >
            <FormRow label="Cabin Name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    {...register("name", {
                        required: "This field is required.",
                    })}
                    disabled={isWorking}
                />
            </FormRow>

            <FormRow label="Max Capacity" error={errors?.maxCapacity?.message}>
                <Input
                    type="number"
                    id="maxCapacity"
                    {...register("maxCapacity", {
                        required: "This field is required.",
                        min: {
                            value: 1,
                            message: "Value must be at least 1.",
                        },
                    })}
                    disabled={isWorking}
                />
            </FormRow>

            <FormRow label="Price" error={errors?.regularPrice?.message}>
                <Input
                    type="number"
                    id="regularPrice"
                    {...register("regularPrice", {
                        required: "This field is required.",
                        min: {
                            value: 1,
                            message: "Value must be at least 1.",
                        },
                    })}
                    disabled={isWorking}
                />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    defaultValue={0}
                    {...register("discount", {
                        required: "This field is required.",
                        validate: (discount) =>
                            Number(discount) <=
                                Number(getValues().regularPrice) ||
                            "Discount should be less than the regular price.",
                    })}
                    disabled={isWorking}
                />
            </FormRow>

            <FormRow label="Description" error={errors?.description?.message}>
                <Textarea
                    id="description"
                    defaultValue=""
                    {...register("description", {
                        required: "This field is required.",
                    })}
                    disabled={isWorking}
                />
            </FormRow>

            <FormRow label="Cabin Photo">
                <FileInput
                    id="image"
                    accept="image/*"
                    {...register("image", {
                        required: isEditSession
                            ? false
                            : "This field is required.",
                    })}
                    disabled={isWorking}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    variation="secondary"
                    type="reset"
                    onClick={() => onCloseModal?.()}
                >
                    Cancel
                </Button>
                <Button disabled={isWorking}>
                    {isEditSession ? "Edit Cabin" : "Add Cabin"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
