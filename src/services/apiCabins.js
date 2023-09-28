import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log("Cabins could not be loaded");

    throw new Error(error);
  }
  return data;
}

export async function createEditCabins(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // upload image , we need to make it unique.
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin?.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1) CREATE/EDIT cabin
  let query = supabase.from("cabins");
  // A) CREATE CABIN
  if (!id) query =  query.insert([{ ...newCabin, image: imagePath }]);

  // A) EDIT CABIN
  if (id) query =  query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select()

  if(hasImagePath) return data;

  if (error) {
    throw new Error(error.message);
  }
  // if no error , then upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // if there is an error uploading the image, delete the cabin
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
  }
  return data;
}

export async function deleteCabins(id) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    // console.log("Cabins could not be deleted 🙃");
    throw new Error(error.message);
  }

  return data;
}
