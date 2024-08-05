import supabase, { supabaseUrl } from "./supabase";

async function getCabins() {
    const { data, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded.");
    }

    return data;
}

async function createEditCabin(newCabin, id) {
    // Image might be either an actual image object (if create mode) or an image URL (if edit mode).
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        "/",
        ""
    );
    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // 1. Create cabin, if there is no ID.
    let query = supabase.from("cabins");

    // If no ID, we are in Create Mode.
    if (!id) {
        query = query.insert([{ ...newCabin, image: imagePath }]);
    }

    if (id) {
        query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
    }

    const { data, error } = await query.select().single();

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be created.");
    }

    // 2. Upload image, if image path does not already exist.
    if (hasImagePath) {
        return data;
    }

    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image, {
            cacheControl: "3600",
            upsert: false,
        });

    // 3. Delete cabin if error uploading image.
    if (storageError) {
        await supabase.from("cabins").delete().eq("id", data.id);
        console.error(storageError);
        throw new Error(
            "Cabin image could not be uploaded and Cabin was not created."
        );
    }

    return data;
}

async function deleteCabin(id) {
    const { error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be deleted.");
    }
}

export { getCabins, createEditCabin, deleteCabin };
