import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function CreateCabinForm({cabinToEdit}) {
    const { register, handleSubmit, reset, getValues, formState } = useForm();
    const { errors } = formState;

    const queryClient = useQueryClient();

    const { mutate, isLoading: isCreating } = useMutation({
        mutationFn: createCabin,
        onSuccess: () => {
            toast.success("New cabin successfully created.");
            queryClient.invalidateQueries({ queryKey: "cabins" });
            reset();
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    // Called by React-Hook-Form when Form's onSubmit calls React-Hook-Form's handleSubmit.
    function onSubmit(data) {
        mutate({...data, image: data.image[0]});
    }

    // Called by React-Hook-Form when Form's onSubmit calls React-Hook-Form's handleSubmit if an error is returned.
    function onError(errors) {
        //console.log(errors);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow label="Cabin Name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    {...register("name", {
                        required: "This field is required.",
                    })}
                    disabled={isCreating}
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
                    disabled={isCreating}
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
                    disabled={isCreating}
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
                    disabled={isCreating}
                />
            </FormRow>

            <FormRow label="Description" error={errors?.description?.message}>
                <Textarea
                    type="number"
                    id="description"
                    defaultValue=""
                    {...register("description", {
                        required: "This field is required.",
                    })}
                    disabled={isCreating}
                />
            </FormRow>

            <FormRow label="Cabin Photo">
                <FileInput
                    id="image"
                    accept="image/*"
                    {...register("image", {
                        required: "This field is required.",
                    })}
                    disabled={isCreating}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isCreating}>Add cabin</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
